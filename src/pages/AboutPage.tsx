import React from 'react';
import { MapPin, Camera, Heart, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation backdrop-blur-xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-neutral-50 mb-6">
              About Prole Adventures
            </h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              Exploring what's left of freedom.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mb-6">
                  The Story Behind the Adventures
                </h2>
                <div className="space-y-6 text-neutral-100 leading-relaxed">
                  <p>
                    Prole Adventures is simple: It's what happens when you stop filtering your 
                    perspective on life. The world is saturated with polished content and staged 
                    experiences, this is raw, unfiltered, low level living.
                  </p>
                  <p>
                    Prole Adventures is just here to document my experiences of 
                    ordinary people and overlooked places.
                  </p>
                  <p>
                    Every adventure is about discovering what's left of freedom in a world 
                    that increasingly demands compliance.  
                  </p>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/travel/mysterious_urban_alley_night_graffiti_cobblestone.jpg"
                  alt="Urban exploration"
                  className="w-full h-96 object-cover rounded-2xl shadow-glass"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-50 mb-6">
              Prole Values
            </h2>
            <p className="text-xl text-neutral-100 max-w-3xl mx-auto">
              Prole principles for every adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-base rounded-2xl p-6 text-center shadow-glass shadow-investigation">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-neutral-50 mb-3">Authenticity</h3>
              <p className="text-neutral-100 text-sm leading-relaxed">
                No filter - Just real experiences documented with honesty.
              </p>
            </div>
            
            <div className="glass-base rounded-2xl p-6 text-center shadow-glass shadow-investigation">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-neutral-50 mb-3">Exploration</h3>
              <p className="text-neutral-100 text-sm leading-relaxed">
                Finding extraordinary stories behind everyday systems, places and things.
              </p>
            </div>
            
            <div className="glass-base rounded-2xl p-6 text-center shadow-glass shadow-investigation">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-neutral-50 mb-3">Freedom</h3>
              <p className="text-neutral-100 text-sm leading-relaxed">
                Documenting what's left of freedom through independent exploration.
              </p>
            </div>
            
            <div className="glass-base rounded-2xl p-6 text-center shadow-glass shadow-investigation">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-xl text-neutral-50 mb-3">Respect</h3>
              <p className="text-neutral-100 text-sm leading-relaxed">
                Treating every place, person and experience with dignity and genuine curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mb-6">
                The Philosophy
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 text-neutral-100 leading-relaxed">
                <div className="border-l-2 border-green-400 pl-6">
                  <h3 className="font-semibold text-xl text-green-400 mb-2">Unfiltered Perspective</h3>
                  <p>
                    The most interesting stories come from seeing the world without it's 
                    commercial polish. Everything I capture tells 
                    a story as it actually exists, not as we are told it does.
                  </p>
                </div>
                
                <div className="border-l-2 border-green-400 pl-6">
                  <h3 className="font-semibold text-xl text-green-400 mb-2">Ordinary Extraordinary</h3>
                  <p>
                    Real adventures aren't always found in exotic destinations, they're hidden in the 
                    cracks of society and the places you aren't supposed to look.
                  </p>
                </div>
                
                <div className="border-l-2 border-green-400 pl-6">
                  <h3 className="font-semibold text-xl text-green-400 mb-2">Gear That Works</h3>
                  <p>
                    I don't have a lot of gear, because I'm just a prole. 
                    If it's no good, I'll tell you. 
                    If it's good, I'll recommend it. 
                    If you know of better, I want to hear about it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mb-6">
              Youchoob & Telegram
            </h2>
            <p className="text-xl text-neutral-100 mb-8">
              If you could subscribe that would mean everything to me because, I'm just a prole.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/@ProleAdventures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 glass-base shadow-glass shadow-investigation hover:glass-elevated text-neutral-50 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-xl"
              >
                <Camera className="w-5 h-5 mr-2" />
                Subscribe
              </a>
              <a
                href="https://t.me/ProleAdventures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 glass-subtle shadow-glass shadow-investigation hover:glass-elevated text-neutral-100 hover:text-neutral-50 rounded-xl font-medium transition-all duration-300 backdrop-blur-xl"
              >
                <Heart className="w-5 h-5 mr-2" />
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};