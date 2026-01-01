import React from 'react';
import { MapPin, Camera, BookOpen, Users, ArrowRight, Star, Zap, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  const featuredAdventures = [
    {
      title: "Coming Soon: Urban Adventures",
      excerpt: "Stay tuned for authentic adventure stories from the streets and hidden corners of the world.",
      image: "/images/travel/mysterious_urban_alley_night_graffiti_cobblestone.jpg",
      type: "Urban Exploration",
      date: "December 2024"
    },
    {
      title: "Coming Soon: Mountain Chronicles",
      excerpt: "High-altitude adventures and wilderness exploration stories are in the works.",
      image: "/images/travel/mysterious_mountain_forest_fog_landscape_adventure.jpg",
      type: "Nature Adventure",
      date: "December 2024"
    },
    {
      title: "Coming Soon: Cultural Immersion",
      excerpt: "Stories of cultural discovery and authentic local experiences from around the world.",
      image: "/images/travel/dynamic_city_night_light_trails_urban_skyline_travel_photography.jpg",
      type: "Cultural Discovery",
      date: "December 2024"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/prole_adventures_home_hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <img 
            src="/images/hero-logo.webp" 
            alt="Prole Adventures Logo" 
            className="w-full max-w-md mx-auto h-auto"
          />
        </div>
      </section>

      {/* Adventures Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-5xl lg:text-6xl font-bold text-neutral-50 mb-6">
              AdVeNTureS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAdventures.map((adventure, index) => (
              <Link
                key={index}
                to="/stories"
                className="group glass-base rounded-2xl overflow-hidden hover:glass-elevated transition-all duration-300 transform hover:scale-105 shadow-glass shadow-investigation"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={adventure.image}
                    alt={adventure.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-green-400 font-medium uppercase tracking-wide">
                      {adventure.type}
                    </span>
                    <span className="text-xs text-neutral-300">{adventure.date}</span>
                  </div>
                  <h3 className="font-semibold text-xl text-neutral-50 mb-3 group-hover:text-green-400 transition-colors">
                    {adventure.title}
                  </h3>
                  <p className="text-neutral-100 text-sm leading-relaxed">
                    {adventure.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/stories"
              className="inline-flex items-center px-8 py-4 glass-subtle hover:glass-base text-neutral-100 hover:text-neutral-50 rounded-xl font-medium transition-all duration-300 shadow-glass shadow-investigation"
            >
              Read More Things
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-50 mb-6">
                WheRe I WeNt
              </h2>
              <p className="text-xl text-neutral-100">
                What I saw when I went there.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* YouTube Video Placeholders */}
              <div className="glass-base rounded-2xl p-6 text-center">
                <div className="aspect-video bg-neutral-800 rounded-lg mb-4 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-50 mb-2">Video Placeholder 1</h3>
                <p className="text-neutral-300 text-sm">Coming soon to the channel</p>
              </div>
              
              <div className="glass-base rounded-2xl p-6 text-center">
                <div className="aspect-video bg-neutral-800 rounded-lg mb-4 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-50 mb-2">Video Placeholder 2</h3>
                <p className="text-neutral-300 text-sm">Coming soon to the channel</p>
              </div>
              
              <div className="glass-base rounded-2xl p-6 text-center">
                <div className="aspect-video bg-neutral-800 rounded-lg mb-4 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="font-semibold text-lg text-neutral-50 mb-2">Video Placeholder 3</h3>
                <p className="text-neutral-300 text-sm">Coming soon to the channel</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a
                href="https://www.youtube.com/@ProleAdventures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 glass-subtle hover:glass-base text-neutral-100 hover:text-neutral-50 rounded-xl font-medium transition-all duration-300 shadow-glass shadow-investigation"
              >
                <Camera className="w-5 h-5 mr-2" />
                Youchube Innit
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 px-4 bg-black">
        <Newsletter />
      </section>
    </div>
  );
};