import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// YouTube IFrame API will be loaded dynamically
import { MapPin, Clock, Tag, ArrowLeft, Building, Trees, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix for default markers in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom glass marker icon
const createGlassIcon = (color: string) => {
  return L.divIcon({
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: rgba(13, 17, 100, 0.95);
        backdrop-filter: blur(20px);
        border: 3px solid ${color};
        border-radius: 50%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        animation: pulse 2s infinite;
        z-index: 1000;
      ">
        <div style="
          width: 16px;
          height: 16px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 15px ${color}, 0 0 25px ${color};
        "></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      </style>
    `,
    className: 'custom-glass-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -36],
  });
};

interface Location {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  visit_date: string;
  category: string;
  description: string;
  story: string;
  tags: string[];
  image: string;
  youtube_videos: {
    primary: string;
    secondary: string;
  };
}

interface TimelineItem {
  year: number;
  season: string;
  month: string;
  adventures: {
    date: string;
    location: string;
    type: string;
    description: string;
    duration: string;
    category: string;
  }[];
}

export const MapPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/locations.json')
        .then(res => {
          if (!res.ok) throw new Error(`Locations HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('Locations loaded:', data.length, 'items');
          return data;
        }),
      fetch('/data/timeline.json')
        .then(res => {
          if (!res.ok) throw new Error(`Timeline HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('Timeline loaded:', data.length, 'items');
          return data;
        })
    ])
    .then(([locationsData, timelineData]) => {
      console.log('Setting locations:', locationsData);
      console.log('Setting timeline:', timelineData);
      setLocations(locationsData);
      setTimeline(timelineData);
    })
    .catch(err => console.error('Failed to load map data:', err));
  }, []);

  const categories = [
    { id: 'all', name: 'All Stories', color: 'rgba(179, 207, 227, 0.8)', icon: '🌍', count: locations.length },
    { id: 'urban', name: 'Urban Exploration', color: 'rgba(255, 255, 255, 0.6)', icon: '🏙️', count: locations.filter(l => l.category === 'Urban Exploration').length },
    { id: 'nature', name: 'Nature', color: 'rgba(16, 185, 129, 0.6)', icon: '🏔️', count: locations.filter(l => l.category === 'Nature & Reflection').length },
    { id: 'culture', name: 'Culture', color: 'rgba(168, 85, 247, 0.6)', icon: '🎭', count: locations.filter(l => l.category === 'Cultural Immersion').length },
    { id: 'reflection', name: 'Reflection', color: 'rgba(59, 130, 246, 0.6)', icon: '🧘', count: locations.filter(l => l.category === 'Nature & Reflection').length },
  ];

  // Category mapping from filter IDs to actual location categories
  const getCategoryFilter = (categoryId: string) => {
    switch (categoryId) {
      case 'urban': return 'Urban Exploration';
      case 'nature': return 'Nature & Reflection';
      case 'culture': return 'Cultural Immersion';
      case 'reflection': return 'Nature & Reflection'; // Reflection is a subset of Nature
      default: return categoryId;
    }
  };

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(loc => {
        const filterCategory = getCategoryFilter(selectedCategory);
        return loc.category === filterCategory || 
               (selectedCategory === 'reflection' && loc.category === 'Nature & Reflection');
      });

  // Calculate bounds for all locations
  const allLatLngs = filteredLocations.map(loc => [loc.coordinates.lat, loc.coordinates.lng] as [number, number]);
  
  // Create routes (simple connection between locations chronologically)
  const routes: [number, number][][] = [];
  if (timeline.length > 0) {
    const sortedAdventures = timeline
      .flatMap(year => year.adventures)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    for (let i = 0; i < sortedAdventures.length - 1; i++) {
      const current = locations.find(loc => loc.name === sortedAdventures[i].location);
      const next = locations.find(loc => loc.name === sortedAdventures[i + 1].location);
      
      if (current && next) {
        routes.push([
          [current.coordinates.lat, current.coordinates.lng],
          [next.coordinates.lat, next.coordinates.lng]
        ]);
      }
    }
  }

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
                ProLe TracKer
              </h1>
              <p className="text-xl text-neutral-100">
                Places I've been, things I've seen.
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
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                {category.count && <span className="text-sm opacity-75">({category.count})</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <div className="glass-base rounded-2xl overflow-hidden shadow-glass shadow-investigation h-full">
                <MapContainer
                  center={[-25.2744, 133.7751]} // Centered on Australia
                  zoom={5}
                  style={{ height: '700px', width: '100%' }}
                  className="z-10"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Adventure Routes */}
                  {routes.map((route, index) => (
                    <Polyline
                      key={index}
                      positions={route}
                      pathOptions={{
                        color: 'rgba(179, 207, 227, 0.6)',
                        weight: 3,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                  
                  {/* Location Markers */}
                  {filteredLocations.map(location => {
                    const categoryColor = categories.find(cat => cat.id === location.category)?.color || categories[0].color;
                    return (
                      <Marker
                        key={location.id}
                        position={[location.coordinates.lat, location.coordinates.lng]}
                        icon={createGlassIcon(categoryColor)}
                        eventHandlers={{
                          click: () => setSelectedLocation(location),
                        }}
                      >
                        <Popup className="custom-popup">
                          <div className="p-2">
                            <h3 className="font-semibold text-neutral-50 mb-1">
                              {location.name}
                            </h3>
                            <p className="text-sm text-neutral-100 mb-2">
                              {location.description}
                            </p>
                            <div className="flex items-center text-xs text-neutral-200">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(location.visit_date).toLocaleDateString()}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>

            {/* Location Details Panel */}
            <div className="lg:col-span-2">
              <div className="glass-elevated rounded-2xl p-6 h-full shadow-glass shadow-investigation backdrop-blur-xl">
                <h3 className="font-semibold text-xl text-neutral-50 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary-300" />
                  Selected Location
                </h3>
                {selectedLocation ? (
                  <div>
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h4 className="font-semibold text-lg text-neutral-50 mb-2">
                      {selectedLocation.name}
                    </h4>
                    <p className="text-neutral-100 text-sm mb-3">
                      {selectedLocation.description}
                    </p>
                    <p className="text-neutral-300 text-xs mb-4 italic">
                      "{selectedLocation.story}"
                    </p>
                    <div className="flex items-center text-xs text-neutral-300 mb-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(selectedLocation.visit_date).toLocaleDateString()}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-6">
                      {selectedLocation.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-primary-700/30 text-primary-300 rounded-md text-xs"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-300 text-sm">
                    Click on a map marker to explore the adventure
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Adventure Videos */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-50 mb-8 text-center">
            MoRe StuFf
          </h2>
          
          {selectedLocation ? (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-secondary mb-4 text-center">
                Latest from {selectedLocation.name}
              </h3>
            </div>
          ) : (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-text-secondary mb-4 text-center">
                Featured Stories
              </h3>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real YouTube Videos - Based on Selected Location */}
            {selectedLocation ? (
              // Location-specific videos
              <div className="glass-base rounded-2xl p-6 hover:glass-elevated transition-all duration-300 shadow-glass shadow-investigation">
                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedLocation.youtube_videos.primary}?rel=0&modestbranding=1&fs=1`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${selectedLocation.name} Adventure Video`}
                  />
                </div>
                <h4 className="font-semibold text-neutral-50 mb-2">{selectedLocation.name}</h4>
                <p className="text-neutral-100 text-sm">{selectedLocation.description}</p>
              </div>
            ) : (
              // Featured videos when no location selected
              <>
                {/* Empty container ready for video */}
                <div className="glass-elevated rounded-2xl p-6 hover:glass-elevated transition-all duration-300 shadow-glass shadow-investigation backdrop-blur-xl">
                  <div className="aspect-video bg-black/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    <div className="text-neutral-400 text-sm">Video coming soon</div>
                  </div>
                  <h4 className="font-semibold text-neutral-50 mb-2">Urban Exploration Stories</h4>
                  <p className="text-neutral-100 text-sm">Discovering hidden streets and underground cultures</p>
                </div>
                
                {/* Empty container ready for video */}
                <div className="glass-elevated rounded-2xl p-6 hover:glass-elevated transition-all duration-300 shadow-glass shadow-investigation backdrop-blur-xl">
                  <div className="aspect-video bg-black/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    <div className="text-neutral-400 text-sm">Video coming soon</div>
                  </div>
                  <h4 className="font-semibold text-neutral-50 mb-2">Nature & Wilderness</h4>
                  <p className="text-neutral-100 text-sm">Finding peace and clarity in remote mountain landscapes</p>
                </div>
                
                {/* Empty container ready for video */}
                <div className="glass-elevated rounded-2xl p-6 hover:glass-elevated transition-all duration-300 shadow-glass shadow-investigation backdrop-blur-xl">
                  <div className="aspect-video bg-black/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                    <div className="text-neutral-400 text-sm">Video coming soon</div>
                  </div>
                  <h4 className="font-semibold text-neutral-50 mb-2">Cultural Immersion</h4>
                  <p className="text-neutral-100 text-sm">Authentic experiences and local traditions around the world</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};