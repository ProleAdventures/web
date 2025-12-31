import { SecureAdventure, Adventure } from '../lib/supabase';

// Mock data for testing when Supabase is not available
export const mockAdventures: SecureAdventure[] = [
  {
    id: '1',
    display_title: 'Operation Shadow Vault',
    codename: 'Operation Shadow Vault',
    status: 'scouting',
    display_description: 'CLASSIFIED MISSION - INTEL LOCKED',
    display_lat: 51.5202 + (Math.random() - 0.5) * 0.02,
    display_lng: -0.1298 + (Math.random() - 0.5) * 0.02,
    lat: 51.5202,
    lng: -0.1298,
    bounty_target: 500.00,
    bounty_current: 125.50,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    display_title: 'Platform Prime',
    codename: 'Platform Prime',
    status: 'greenlit',
    display_description: 'Urban exploration mission at the disused Aldgate East platforms. Full access granted for documentation and photography.',
    display_lat: 51.5154,
    display_lng: -0.0758,
    lat: 51.5154,
    lng: -0.0758,
    bounty_target: 300.00,
    bounty_current: 180.00,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    display_title: 'Prime Meridian Protocol',
    codename: 'Prime Meridian Protocol',
    status: 'active',
    display_description: 'Active mission to capture the perfect prime meridian alignment shots during the winter solstice. Limited time window for optimal conditions.',
    display_lat: 51.4769,
    display_lng: 0.0005,
    lat: 51.4769,
    lng: 0.0005,
    bounty_target: 750.00,
    bounty_current: 520.75,
    created_at: '2024-01-08T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    display_title: 'Victorian Echo',
    codename: 'Victorian Echo',
    status: 'complete',
    display_description: 'Completed mission to document the architectural beauty of Leadenhall Market\'s Victorian glass ceiling and trading floor history.',
    display_lat: 51.5158,
    display_lng: -0.0836,
    lat: 51.5158,
    lng: -0.0836,
    bounty_target: 400.00,
    bounty_current: 400.00,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    display_title: 'Industrial Heartbeat',
    codename: 'Industrial Heartbeat',
    status: 'scouting',
    display_description: 'CLASSIFIED MISSION - INTEL LOCKED',
    display_lat: 51.4982 + (Math.random() - 0.5) * 0.02,
    display_lng: 0.1234 + (Math.random() - 0.5) * 0.02,
    lat: 51.4982,
    lng: 0.1234,
    bounty_target: 600.00,
    bounty_current: 89.25,
    created_at: '2024-01-12T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    display_title: 'Subterranean Network',
    codename: 'Subterranean Network',
    status: 'greenlit',
    display_description: 'Greenlit mission to explore the network of WWII air raid shelters and Underground Railway extensions beneath Hampstead Heath.',
    display_lat: 51.5590,
    display_lng: -0.1750,
    lat: 51.5590,
    lng: -0.1750,
    bounty_target: 800.00,
    bounty_current: 345.80,
    created_at: '2024-01-07T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
];

export class MockAdventureService {
  private static adventures = [...mockAdventures];

  // Mock implementation of getAdventures
  static async getAdventures(): Promise<SecureAdventure[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a deep copy to simulate real data fetching
    return this.adventures.map(adventure => ({ ...adventure }));
  }

  // Mock implementation of createAdventure
  static async createAdventure(adventure: Omit<Adventure, 'id' | 'created_at' | 'updated_at'>): Promise<Adventure> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newAdventure: Adventure = {
      id: Math.random().toString(36).substr(2, 9),
      ...adventure,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.adventures.push({
      ...newAdventure,
      display_title: newAdventure.status === 'scouting' ? newAdventure.codename : newAdventure.title,
      display_description: newAdventure.status === 'scouting' ? 'CLASSIFIED MISSION - INTEL LOCKED' : newAdventure.description,
      display_lat: newAdventure.status === 'scouting' 
        ? newAdventure.lat + (Math.random() - 0.5) * 0.02 
        : newAdventure.lat,
      display_lng: newAdventure.status === 'scouting' 
        ? newAdventure.lng + (Math.random() - 0.5) * 0.02 
        : newAdventure.lng
    });

    return newAdventure;
  }

  // Mock implementation of updateAdventureBounty
  static async updateAdventureBounty(id: string, amount: number): Promise<Adventure> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const adventureIndex = this.adventures.findIndex(adv => adv.id === id);
    if (adventureIndex === -1) {
      throw new Error('Adventure not found');
    }

    const secureAdventure = this.adventures[adventureIndex];
    
    // Convert SecureAdventure back to Adventure
    const adventure: Adventure = {
      id: secureAdventure.id,
      title: secureAdventure.codename, // Use codename as title for mock
      codename: secureAdventure.codename,
      status: secureAdventure.status,
      description: secureAdventure.display_description,
      lat: secureAdventure.lat,
      lng: secureAdventure.lng,
      bounty_target: secureAdventure.bounty_target,
      bounty_current: amount,
      created_at: secureAdventure.created_at,
      updated_at: new Date().toISOString()
    };

    // Update the stored adventure
    this.adventures[adventureIndex] = {
      ...secureAdventure,
      bounty_current: amount,
      updated_at: adventure.updated_at
    };

    return adventure;
  }

  // Check if running in mock mode
  static isMockMode(): boolean {
    return true; // Always true for this mock service
  }

  // Initialize sample data (mock implementation)
  static async initializeSampleData(): Promise<void> {
    // For mock mode, we already have data, so just return
    return Promise.resolve();
  }

  // Get secure adventures (mock implementation)
  static async getSecureAdventures(): Promise<SecureAdventure[]> {
    return this.getAdventures();
  }

  // Validate redaction (mock implementation)
  static validateRedaction(adventure: SecureAdventure): {
    isSecure: boolean;
    warnings: string[];
  } {
    const warnings: string[] = [];
    
    if (adventure.status === 'scouting') {
      if (adventure.display_description !== 'CLASSIFIED MISSION - INTEL LOCKED') {
        warnings.push('Full description exposed in scouting mission');
      }
      
      const latDiff = Math.abs(adventure.lat - adventure.display_lat);
      const lngDiff = Math.abs(adventure.lng - adventure.display_lng);
      
      if (latDiff < 0.001 && lngDiff < 0.001) {
        warnings.push('Coordinates may not be sufficiently obfuscated for scouting mission');
      }
    }
    
    return {
      isSecure: warnings.length === 0,
      warnings
    };
  }
}