import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Camera, MapPin, Users, Home } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/map', label: 'Watch', icon: Map },
    { path: '/stories', label: 'Read', icon: MapPin },
    { path: '/gear', label: 'Gear', icon: Camera },
  ];

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    location.pathname === path
                      ? 'glass-elevated text-neutral-50 shadow-glass shadow-investigation backdrop-blur-xl'
                      : 'glass-subtle text-neutral-100 hover:glass-base shadow-glass shadow-investigation hover:backdrop-blur-xl'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4">
            <button className="p-2 rounded-lg" aria-label="Toggle mobile menu">
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className="w-5 h-0.5 bg-neutral-50 mb-1"></div>
                <div className="w-5 h-0.5 bg-neutral-50 mb-1"></div>
                <div className="w-5 h-0.5 bg-neutral-50"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};