import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Shield, Eye, Target, Lock, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAdventures, SecureAdventure, isMissionRedacted, applyCoordinateJitter } from '../lib/supabase';
import { AdventureService } from '../services/adventureService';
import { MockAdventureService } from '../services/mockAdventureService';
import TargetCard from '../components/TargetCard';

// Fix for default markers in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different mission statuses
const createStatusIcon = (status: string) => {
  const isRedacted = isMissionRedacted(status);
  
  if (isRedacted) {
    // Scouting missions - pulsing orange question mark
    return L.divIcon({
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: rgba(255, 165, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 3px solid rgba(255, 165, 0, 0.6);
          border-radius: 50%;
          box-shadow: 0 8px 32px rgba(255, 165, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: pulse 2s infinite;
          z-index: 1000;
        ">
          <div style="
            width: 20px;
            height: 20px;
            background: rgba(255, 165, 0, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
            font-weight: bold;
          ">?</div>
        </div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 8px 32px rgba(255, 165, 0, 0.4); }
            50% { transform: scale(1.15); box-shadow: 0 8px 32px rgba(255, 165, 0, 0.8); }
            100% { transform: scale(1); box-shadow: 0 8px 32px rgba(255, 165, 0, 0.4); }
          }
        </style>
      `,
      className: 'custom-scouting-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -40],
    });
  }

  // Regular missions with status-based colors
  const colors = {
    greenlit: 'rgba(59, 130, 246, 0.9)',    // Blue
    active: 'rgba(239, 68, 68, 0.9)',      // Red
    complete: 'rgba(16, 185, 129, 0.9)',   // Green
  };

  const color = colors[status as keyof typeof colors] || 'rgba(156, 163, 175, 0.9)';
  const iconSymbol = {
    greenlit: 'T',
    active: 'A', 
    complete: '✓',
  }[status] || '?';

  return L.divIcon({
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${color};
        backdrop-filter: blur(20px);
        border: 3px solid ${color.replace('0.9', '0.6')};
        border-radius: 50%;
        box-shadow: 0 8px 32px ${color.replace('0.9', '0.4')}, inset 0 2px 0 rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1000;
      ">
        <div style="
          width: 16px;
          height: 16px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        ">${iconSymbol}</div>
      </div>
    `,
    className: `custom-${status}-marker`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -36],
  });
};

export const MissionControlPage: React.FC = () => {
  const [adventures, setAdventures] = useState<SecureAdventure[]>([]);
  const [selectedAdventure, setSelectedAdventure] = useState<SecureAdventure | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMissionControl = async () => {
      try {
        setLoading(true);
        
        let data: SecureAdventure[] = [];
        
        try {
          // Try to use real Supabase service first
          await AdventureService.initializeSampleData();
          data = await AdventureService.getSecureAdventures();
        } catch (supabaseError) {
          console.warn('Supabase not available, falling back to mock data:', supabaseError);
          
          // Fallback to mock data service
          await MockAdventureService.initializeSampleData();
          data = await MockAdventureService.getSecureAdventures();
          
          setError('Running in demo mode - Supabase connection unavailable');
        }
        
        setAdventures(data);
        
        if (data.length > 0) {
          setSelectedAdventure(data[0]);
        }
      } catch (err) {
        console.error('Failed to initialize Prole Control:', err);
        setError('Failed to load mission data. Using demo mode.');
        
        // Final fallback to mock data
        try {
          const mockData = await MockAdventureService.getSecureAdventures();
          setAdventures(mockData);
          if (mockData.length > 0) {
            setSelectedAdventure(mockData[0]);
          }
        } catch (mockError) {
          console.error('Even mock data failed:', mockError);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeMissionControl();
  }, []);

  const statusFilters = [
    { id: 'all', name: 'All Missions', icon: Shield, color: 'rgba(156, 163, 175, 0.8)' },
    { id: 'scouting', name: 'Scouting', icon: Eye, color: 'rgba(255, 165, 0, 0.8)' },
    { id: 'greenlit', name: 'Greenlit', icon: Target, color: 'rgba(59, 130, 246, 0.8)' },
    { id: 'active', name: 'Active', icon: AlertTriangle, color: 'rgba(239, 68, 68, 0.8)' },
    { id: 'complete', name: 'Complete', icon: Shield, color: 'rgba(16, 185, 129, 0.8)' },
  ];

  const filteredAdventures = selectedStatus === 'all' 
    ? adventures 
    : adventures.filter(adv => adv.status === selectedStatus);

  const handleBountyUpdate = (adventureId: string, newAmount: number) => {
    setAdventures(prev => prev.map(adv => 
      adv.id === adventureId 
        ? { ...adv, bounty_current: newAmount }
        : adv
    ));
    
    if (selectedAdventure?.id === adventureId) {
      setSelectedAdventure(prev => prev ? { ...prev, bounty_current: newAmount } : null);
    }
  };

  // Calculate map center and bounds
  const mapCenter = adventures.length > 0 
    ? [adventures[0].display_lat, adventures[0].display_lng] as [number, number]
    : [-25.2744, 133.7751] as [number, number]; // Australia center

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-neutral-100 text-lg">Loading Prole Control...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-50 mb-2">Prole Control Offline</h2>
          <p className="text-neutral-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
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
                Mission Control
              </h1>
              <p className="text-xl text-neutral-100">
                Track active missions and contribute to the cause.
              </p>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {statusFilters.map(filter => {
              const IconComponent = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedStatus(filter.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    selectedStatus === filter.id
                      ? 'glass-elevated text-neutral-50 shadow-glass shadow-investigation'
                      : 'glass-subtle text-neutral-100 hover:glass-base shadow-glass shadow-investigation'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{filter.name}</span>
                  <span className="text-sm opacity-75">
                    ({adventures.filter(a => filter.id === 'all' || a.status === filter.id).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Control Map */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <div className="glass-base rounded-2xl overflow-hidden shadow-glass shadow-investigation h-full">
                <MapContainer
                  center={mapCenter}
                  zoom={6}
                  style={{ height: '700px', width: '100%' }}
                  className="z-10"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Adventure Markers */}
                  {filteredAdventures.map(adventure => {
                    const isRedacted = isMissionRedacted(adventure.status);
                    const jitteredCoords = isRedacted 
                      ? applyCoordinateJitter(adventure.lat, adventure.lng, 0.02)
                      : { lat: adventure.display_lat, lng: adventure.display_lng };
                    
                    return (
                      <Marker
                        key={adventure.id}
                        position={[jitteredCoords.lat, jitteredCoords.lng]}
                        icon={createStatusIcon(adventure.status)}
                        eventHandlers={{
                          click: () => setSelectedAdventure(adventure),
                        }}
                      >
                        <Popup className="custom-popup">
                          <div className="p-2">
                            <h3 className="font-semibold text-neutral-50 mb-1 flex items-center">
                              {isRedacted && <Lock className="w-4 h-4 mr-1 text-orange-400" />}
                              {adventure.display_title}
                            </h3>
                            <p className="text-sm text-neutral-100 mb-2">
                              Status: <span className="uppercase font-medium">{adventure.status}</span>
                            </p>
                            <p className="text-sm text-neutral-100 mb-2">
                              {adventure.display_description}
                            </p>
                            <div className="text-xs text-neutral-200">
                              Bounty: ${adventure.bounty_current.toFixed(2)} / ${adventure.bounty_target.toFixed(2)}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>

            {/* Mission Details Panel */}
            <div className="lg:col-span-2">
              <div className="glass-elevated rounded-2xl p-6 h-full shadow-glass shadow-investigation backdrop-blur-xl">
                <h3 className="font-semibold text-xl text-neutral-50 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary-300" />
                  Mission Intel
                </h3>
                {selectedAdventure ? (
                  <TargetCard 
                    adventure={selectedAdventure} 
                    onBountyUpdate={handleBountyUpdate}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-neutral-300 text-sm">
                      Select a mission marker to view classified details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-subtle rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-start space-x-4">
              <Lock className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Security Protocol Active</h3>
                <p className="text-neutral-300 text-sm mb-2">
                  Scouting missions have been obfuscated to protect operational security. 
                  Exact coordinates are hidden until missions are greenlit.
                </p>
                <p className="text-neutral-400 text-xs">
                  Coordinate jitter: ±0.02° applied to all classified locations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};