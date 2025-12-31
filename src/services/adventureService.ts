import { getAdventures, createAdventure, updateAdventureBounty, SecureAdventure, Adventure } from '../lib/supabase';

// Sample adventure data for testing the Mission Control system
export const sampleAdventures: Omit<Adventure, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: "Birkbeck Tunnel Complex",
    codename: "Operation Shadow Vault",
    status: "scouting",
    description: "Classified reconnaissance mission into the abandoned Birkbeck Tunnel system. Intelligence gathering on underground infrastructure and potential access points.",
    lat: 51.5202,
    lng: -0.1298,
    bounty_target: 500.00,
    bounty_current: 125.50
  },
  {
    title: "Aldgate East Station",
    codename: "Platform Prime",
    status: "greenlit", 
    description: "Urban exploration mission at the disused Aldgate East platforms. Full access granted for documentation and photography.",
    lat: 51.5154,
    lng: -0.0758,
    bounty_target: 300.00,
    bounty_current: 180.00
  },
  {
    title: "Royal Observatory Greenwich",
    codename: "Prime Meridian Protocol",
    status: "active",
    description: "Active mission to capture the perfect prime meridian alignment shots during the winter solstice. Limited time window for optimal conditions.",
    lat: 51.4769,
    lng: 0.0005,
    bounty_target: 750.00,
    bounty_current: 520.75
  },
  {
    title: "Leadenhall Market",
    codename: "Victorian Echo",
    status: "complete",
    description: "Completed mission to document the architectural beauty of Leadenhall Market's Victorian glass ceiling and trading floor history.",
    lat: 51.5158,
    lng: -0.0836,
    bounty_target: 400.00,
    bounty_current: 400.00
  },
  {
    title: "Crossness Pumping Station",
    codename: "Industrial Heartbeat",
    status: "scouting",
    description: "Scouting mission to assess access to the historic Crossness Pumping Station. Investigating the massive beam engines and Victorian engineering.",
    lat: 51.4982,
    lng: 0.1234,
    bounty_target: 600.00,
    bounty_current: 89.25
  },
  {
    title: "Hampstead Heath Underground Tunnels",
    codename: "Subterranean Network",
    status: "greenlit",
    description: "Greenlit mission to explore the network of WWII air raid shelters and Underground Railway extensions beneath Hampstead Heath.",
    lat: 51.5590,
    lng: -0.1750,
    bounty_target: 800.00,
    bounty_current: 345.80
  }
];

// Adventure management service
export class AdventureService {
  
  // Initialize sample data if no adventures exist
  static async initializeSampleData(): Promise<void> {
    try {
      const existingAdventures = await getAdventures();
      
      // Only create sample data if no adventures exist
      if (existingAdventures.length === 0) {
        console.log('Creating sample adventure data...');
        
        for (const adventureData of sampleAdventures) {
          await createAdventure(adventureData);
        }
        
        console.log('Sample adventure data created successfully');
      }
    } catch (error) {
      console.error('Failed to initialize sample data:', error);
      throw error;
    }
  }

  // Get adventures with security filtering applied
  static async getSecureAdventures(): Promise<SecureAdventure[]> {
    try {
      // This would use the secure view in production
      // For now, we'll apply client-side filtering as a demonstration
      const adventures = await getAdventures();
      
      return adventures.map(adventure => {
        // Apply jitter to scouting missions
        if (adventure.status === 'scouting') {
          const jitterLat = adventure.lat + (Math.random() - 0.5) * 0.02;
          const jitterLng = adventure.lng + (Math.random() - 0.5) * 0.02;
          
          return {
            ...adventure,
            display_lat: jitterLat,
            display_lng: jitterLng,
            display_title: adventure.codename,
            display_description: 'CLASSIFIED MISSION - INTEL LOCKED'
          };
        }
        
        return {
          ...adventure,
          display_lat: adventure.lat,
          display_lng: adventure.lng,
          display_title: adventure.codename, // Use codename for all non-scouting for consistency
          display_description: adventure.description
        };
      });
    } catch (error) {
      console.error('Failed to fetch secure adventures:', error);
      throw error;
    }
  }

  // Update adventure bounty with contribution
  static async contributeToMission(adventureId: string, amount: number): Promise<Adventure> {
    try {
      // In a real implementation, this would include user authentication
      // and transaction processing
      
      const updatedAdventure = await updateAdventureBounty(adventureId, amount);
      console.log(`Contributed $${amount} to mission ${adventureId}`);
      
      return updatedAdventure;
    } catch (error) {
      console.error('Failed to contribute to mission:', error);
      throw error;
    }
  }

  // Security validation for redaction
  static validateRedaction(adventure: SecureAdventure): {
    isSecure: boolean;
    warnings: string[];
  } {
    const warnings: string[] = [];
    
    // Check if sensitive data is exposed for scouting missions
    if (adventure.status === 'scouting') {
      // For scouting missions, we expect to see only codename and classified description
      if (adventure.display_description && adventure.display_description !== 'CLASSIFIED MISSION - INTEL LOCKED') {
        warnings.push('Full description exposed in scouting mission');
      }
      
      // Check if coordinates appear to be exact (this is a simplified check)
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

  // Generate mission statistics
  static generateMissionStats(adventures: SecureAdventure[]) {
    const stats = {
      total: adventures.length,
      scouting: adventures.filter(a => a.status === 'scouting').length,
      greenlit: adventures.filter(a => a.status === 'greenlit').length,
      active: adventures.filter(a => a.status === 'active').length,
      complete: adventures.filter(a => a.status === 'complete').length,
      totalBountyTarget: adventures.reduce((sum, a) => sum + a.bounty_target, 0),
      totalBountyCurrent: adventures.reduce((sum, a) => sum + a.bounty_current, 0),
      completionRate: adventures.filter(a => a.status === 'complete').length / adventures.length * 100
    };
    
    return stats;
  }
}