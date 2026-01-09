import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Tag, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Newsletter } from '../components/Newsletter';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  location: string;
  category: string;
  tags: string[];
  featured_image: string;
  read_time: string;
  gear_used: string[];
  missions: string[];
  story_highlights: string[];
  safety_notes: string;
}

interface StoriesData {
  stories: Story[];
}

export const StoriesPage: React.FC = () => {
  const [storiesData, setStoriesData] = useState<StoriesData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    fetch('/data/stories.json')
      .then(res => res.json())
      .then(data => setStoriesData({ stories: data }))
      .catch(err => console.error('Failed to load stories:', err));
  }, []);

  if (!storiesData) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="glass-elevated shadow-glass shadow-investigation rounded-2xl p-8 backdrop-blur-xl">
          <div className="animate-spin w-8 h-8 border-2 border-primary-300 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-100">Loading chronicles...</p>
        </div>
      </div>
    );
  }

  // Category mapping from filter IDs to actual story categories
  const getStoryCategoryFilter = (categoryId: string) => {
    switch (categoryId) {
      case 'urban': return 'Urban Exploration';
      case 'nature': return 'Nature Reflection';
      case 'culture': return 'Cultural Immersion';
      case 'reflection': return 'Nature Reflection'; // Reflection is a subset of Nature
      default: return categoryId;
    }
  };

  const categories = [
    { id: 'all', name: 'All Stories', count: storiesData.stories.length, icon: '🌍' },
    { id: 'urban', name: 'Urban Exploration', count: storiesData.stories.filter(s => s.category === 'Urban Exploration').length, icon: '🏙️' },
    { id: 'nature', name: 'Nature', count: storiesData.stories.filter(s => s.category === 'Nature Reflection').length, icon: '🏔️' },
    { id: 'culture', name: 'Culture', count: storiesData.stories.filter(s => s.category === 'Cultural Immersion').length, icon: '🎭' },
    { id: 'reflection', name: 'Reflection', count: storiesData.stories.filter(s => s.category === 'Nature Reflection').length, icon: '🧘' },
  ];

  const filteredStories = selectedCategory === 'all' 
    ? storiesData.stories 
    : storiesData.stories.filter(story => {
        const filterCategory = getStoryCategoryFilter(selectedCategory);
        return story.category === filterCategory || 
               (selectedCategory === 'reflection' && story.category === 'Nature Reflection');
      });

  const featuredStory = filteredStories[0];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-5xl lg:text-6xl font-bold text-neutral-50 mb-6">
              ThinGs that HappeNed
            </h1>
            <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
              Where I went and what happened....
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'glass-elevated shadow-glass shadow-investigation text-neutral-50 shadow-glass'
                    : 'glass-subtle shadow-glass shadow-investigation text-neutral-100 hover:glass-base'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedStory && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-elevated shadow-glass shadow-investigation rounded-3xl overflow-hidden shadow-elevated">
              <div className="aspect-video overflow-hidden">
                <img
                  src={selectedStory.featured_image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="800"
                  height="450"
                />
              </div>
              
              <div className="p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-3 py-1 bg-primary-700/30 text-primary-300 rounded-md text-sm font-medium uppercase tracking-wide">
                    {selectedStory.category}
                  </span>
                  <span className="text-neutral-200 text-sm">{selectedStory.read_time}</span>
                </div>
                
                <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6 leading-tight">
                  {selectedStory.title}
                </h2>
                
                <div className="flex items-center space-x-6 mb-8 text-neutral-200">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(selectedStory.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedStory.location}
                  </div>
                </div>
                
                <p className="text-lg text-neutral-100 leading-relaxed mb-8">
                  {selectedStory.excerpt}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-xl text-neutral-50 mb-4">Mission Objectives</h3>
                    <ul className="space-y-2">
                      {selectedStory.missions.map((mission, index) => (
                        <li key={index} className="flex items-center text-neutral-100">
                          <div className="w-2 h-2 bg-primary-300 rounded-full mr-3 flex-shrink-0"></div>
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl text-neutral-50 mb-4">Story Highlights</h3>
                    <ul className="space-y-2">
                      {selectedStory.story_highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-neutral-100">
                          <div className="w-2 h-2 bg-success rounded-full mr-3 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-semibold text-xl text-neutral-50 mb-4">Gear Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStory.gear_used.map(gear => (
                      <span
                        key={gear}
                        className="inline-flex items-center px-3 py-1 bg-neutral-700/50 text-neutral-200 rounded-lg text-sm"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {gear}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-semibold text-xl text-neutral-50 mb-4">Safety Notes</h3>
                  <p className="text-neutral-100 bg-warning/10 border border-warning/20 rounded-lg p-4">
                    {selectedStory.safety_notes}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedStory.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-primary-700/20 text-primary-300 rounded-md text-sm"
                    >
                      <Tag className="w-3 h-3 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedStory(null)}
                  className="glass-subtle shadow-glass shadow-investigation hover:glass-base text-neutral-100 hover:text-neutral-50 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Back to Stories
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!selectedStory && (
        <>
          {/* Featured Story */}
          {featuredStory && (
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-neutral-50 mb-8">Featured</h2>
                
                <div className="glass-base shadow-glass shadow-investigation rounded-2xl overflow-hidden hover:glass-elevated transition-all duration-300 cursor-pointer group"
                     onClick={() => setSelectedStory(featuredStory)}>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-video lg:aspect-square overflow-hidden">
                      <img
                        src={featuredStory.featured_image}
                        alt={featuredStory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        width="600"
                        height="600"
                      />
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <span className="px-3 py-1 bg-primary-700/30 text-primary-300 rounded-md text-sm font-medium uppercase tracking-wide mb-4 inline-block w-fit">
                        {featuredStory.category}
                      </span>
                      
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-neutral-50 mb-4 group-hover:text-primary-300 transition-colors">
                        {featuredStory.title}
                      </h3>
                      
                      <p className="text-neutral-100 text-lg leading-relaxed mb-6">
                        {featuredStory.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-neutral-200 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(featuredStory.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {featuredStory.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {featuredStory.read_time}
                          </div>
                        </div>
                        
                        <div className="inline-flex items-center text-primary-300 font-medium">
                          Read
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All Stories Grid */}
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-neutral-50 mb-8">More</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.slice(1).map(story => (
                  <article
                    key={story.id}
                    className="glass-elevated shadow-glass shadow-investigation rounded-2xl overflow-hidden hover:glass-elevated transition-all duration-300 transform hover:scale-105 cursor-pointer group backdrop-blur-xl"
                    onClick={() => setSelectedStory(story)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={story.featured_image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        width="400"
                        height="225"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-primary-700/30 text-primary-300 rounded-md text-sm font-medium uppercase tracking-wide">
                          {story.category}
                        </span>
                        <span className="text-xs text-neutral-200">{story.read_time}</span>
                      </div>
                      
                      <h3 className="font-semibold text-xl text-neutral-50 mb-3 group-hover:text-primary-300 transition-colors">
                        {story.title}
                      </h3>
                      
                      <p className="text-neutral-100 text-sm leading-relaxed mb-4">
                        {story.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-neutral-200 text-sm">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {story.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(story.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Newsletter Signup */}
      <section className="py-12 px-4">
        <Newsletter title="Stay Connected" subtitle="Subscribe to receive the latest adventure stories and updates" />
      </section>
    </div>
  );
};