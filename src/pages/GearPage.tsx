import React, { useEffect, useState } from 'react';
import { Star, ExternalLink, Tag, CheckCircle, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GearItem {
  id: string;
  name: string;
  category: string;
  price: string;
  affiliate_link: string;
  rating: number;
  description: string;
  specs: Record<string, string>;
  missions: string[];
  why_essential: string;
  tested_conditions: string[];
  image: string;
}

interface GearCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: {
    name: string;
    price_range: string;
    best_for: string;
    rating: number;
  }[];
}

interface Testimonial {
  item: string;
  quote: string;
  mission: string;
}

interface GearData {
  current_kit: GearItem[];
  testimonials: Testimonial[];
}

export const GearPage: React.FC = () => {
  const [gearData, setGearData] = useState<GearData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/data/current_gear.json')
      .then(res => res.json())
      .then(gear => setGearData(gear))
      .catch(err => console.error('Failed to load gear data:', err));
  }, []);

  if (!gearData) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="glass-base shadow-glass shadow-investigation rounded-2xl p-8">
          <div className="animate-spin w-8 h-8 border-2 border-primary-300 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-100">Loading prol arsenal...</p>
        </div>
      </div>
    );
  }

  const filteredGear = gearData.current_kit.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-50 mb-6">
              Prole Gear
            </h1>
            <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
              Minimaleast gear because that's what I've got.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search gear..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-100 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-primary-300 backdrop-blur-xl"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="text-neutral-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-100 border-none focus:outline-none focus:ring-2 focus:ring-primary-300 backdrop-blur-xl"
              >
                <option className="text-primary-300" value="all">All Categories</option>
                <option className="text-primary-300" value="camera">Camera</option>
                <option className="text-primary-300" value="microphone">Microphone</option>
                <option className="text-primary-300" value="bag">Bags & Packs</option>
                <option className="text-primary-300" value="laptop">Laptop</option>
                <option className="text-primary-300" value="power">Power</option>
                <option className="text-primary-300" value="protection">Protection</option>
                <option className="text-primary-300" value="documentation">Documentation</option>
              </select>
            </div>
          </div>
        </div>
      </section>



      {/* Current Kit */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-50 mb-8 text-center">
            Current Prole Kit
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredGear.map(item => (
              <div key={item.id} className="glass-base shadow-glass shadow-investigation rounded-2xl overflow-hidden hover:glass-elevated transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-md text-sm font-medium uppercase tracking-wide">
                      {item.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-green-400">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-xl text-neutral-50 mb-3">{item.name}</h3>
                  <p className="text-neutral-100 text-sm mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-400">{item.price}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-neutral-50 font-medium mb-2">Why Essential:</h4>
                      <p className="text-neutral-100 text-sm">{item.why_essential}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-neutral-50 font-medium mb-2">Specifications:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-neutral-300 text-sm capitalize">{key}:</span>
                            <span className="text-neutral-100 text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-neutral-50 font-medium mb-2">Tested Conditions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tested_conditions.map(condition => (
                          <span
                            key={condition}
                            className="inline-flex items-center px-2 py-1 bg-neutral-700/50 text-neutral-200 rounded-md text-xs"
                          >
                            <CheckCircle className="w-3 h-3 mr-1 text-success" />
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};