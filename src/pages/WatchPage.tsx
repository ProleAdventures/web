import React from 'react';
import { Play, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WatchPage: React.FC = () => {
  const featuredVideos = [
    {
      id: 'b-tJOvF5w-k',
      title: 'Urban Exploration Stories',
      description: 'Discovering hidden streets and underground cultures',
      category: 'Urban Exploration',
      duration: '12:34',
      thumbnail: '/images/hero/mysterious_urban_alley_night_graffiti_cobblestone.jpg'
    },
    {
      id: 'W0LT4RAQlCM',
      title: 'Nature & Wilderness',
      description: 'Finding peace and clarity in remote mountain landscapes',
      category: 'Nature & Reflection',
      duration: '15:47',
      thumbnail: '/images/hero/mysterious_mountain_forest_fog_landscape_adventure.jpg'
    },
    {
      id: 'L4dGNj-HUBc',
      title: 'Cultural Immersion',
      description: 'Authentic experiences and local traditions around the world',
      category: 'Cultural Immersion',
      duration: '18:22',
      thumbnail: '/images/hero/neon-lit-city-night-long-exposure-travel-hong-kong.jpg'
    },
    {
      id: 'CevxZvSJLk8',
      title: 'Coastal Adventures',
      description: 'Exploring dramatic coastlines and hidden beaches',
      category: 'Nature & Reflection',
      duration: '14:22',
      thumbnail: '/images/hero/backpacker-golden-hour-wilderness-adventure-gear.jpg'
    },
    {
      id: 'M7lc1UVf-VE',
      title: 'Mountain Summit Experience',
      description: 'The journey to the top and what it teaches us',
      category: 'Nature & Reflection',
      duration: '16:45',
      thumbnail: '/images/hero/atmospheric_dark_mountain_adventure_landscape.jpg'
    },
    {
      id: 'fLexgOxsZu0',
      title: 'Urban Photography Masterclass',
      description: 'Professional techniques for capturing city life',
      category: 'Urban Exploration',
      duration: '19:12',
      thumbnail: '/images/hero/dynamic_city_night_light_trails_urban_skyline_travel_photography.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Videos', count: featuredVideos.length },
    { id: 'urban', name: 'Urban Exploration', count: featuredVideos.filter(v => v.category === 'Urban Exploration').length },
    { id: 'nature', name: 'Nature & Reflection', count: featuredVideos.filter(v => v.category === 'Nature & Reflection').length },
    { id: 'culture', name: 'Cultural Immersion', count: featuredVideos.filter(v => v.category === 'Cultural Immersion').length },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredVideos = selectedCategory === 'all' 
    ? featuredVideos 
    : featuredVideos.filter(video => {
        const categoryMap: { [key: string]: string } = {
          'urban': 'Urban Exploration',
          'nature': 'Nature & Reflection',
          'culture': 'Cultural Immersion'
        };
        return video.category === categoryMap[selectedCategory];
      });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link 
                to="/"
                className="inline-flex items-center text-neutral-100 hover:text-primary-300 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-50 mb-4">
                Watch
              </h1>
              <p className="text-xl text-neutral-100">
                Completed adventures and exploration stories.
              </p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'glass-elevated text-neutral-50 shadow-glass shadow-investigation'
                    : 'glass-subtle text-neutral-100 hover:glass-base shadow-glass shadow-investigation'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="glass-base rounded-2xl p-6 hover:glass-elevated transition-all duration-300 shadow-glass shadow-investigation group">
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&fs=1`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-primary-700/30 text-primary-300 rounded-md">
                      {video.category}
                    </span>
                    <div className="flex items-center text-xs text-neutral-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-neutral-50 group-hover:text-primary-300 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-neutral-100 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 px-4 border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mb-6">
            Latest Adventures
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Dive into the most recent explorations and discoveries. Each video tells a unique story of adventure, mystery, and human connection.
          </p>
          
          {/* Featured video */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-elevated rounded-2xl p-8 shadow-glass shadow-investigation backdrop-blur-xl">
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
                <iframe
                  src="https://www.youtube.com/embed/b-tJOvF5w-k?rel=0&modestbranding=1&fs=1"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Featured Adventure"
                />
              </div>
              <h3 className="text-2xl font-bold text-neutral-50 mb-2">Featured Adventure</h3>
              <p className="text-neutral-300">Join me on an incredible journey through hidden urban landscapes and forgotten places.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};