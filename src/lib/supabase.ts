import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations
export const saveContactMessage = async (name: string, email: string, message: string) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      { name, email, message }
    ]);
  
  if (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
  
  return data;
};

export const saveNewsletterEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('newsletter_signups')
    .insert([
      { email }
    ]);
  
  if (error) {
    console.error('Error saving newsletter email:', error);
    throw error;
  }
  
  return data;
};

// Adventure types
export interface Adventure {
  id: string;
  title: string;
  codename: string;
  status: 'scouting' | 'greenlit' | 'active' | 'complete';
  description?: string;
  lat: number;
  lng: number;
  bounty_target: number;
  bounty_current: number;
  created_at: string;
  updated_at: string;
}

// Secure adventure view interface
export interface SecureAdventure {
  id: string;
  display_title: string;
  codename: string;
  status: 'scouting' | 'greenlit' | 'active' | 'complete';
  display_description?: string;
  display_lat: number;
  display_lng: number;
  lat: number;
  lng: number;
  bounty_target: number;
  bounty_current: number;
  created_at: string;
  updated_at: string;
}

// Adventure operations
export const getAdventures = async (): Promise<SecureAdventure[]> => {
  const { data, error } = await supabase
    .from('adventures')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching adventures:', error);
    throw error;
  }
  
  return data || [];
};

export const getAdventureById = async (id: string): Promise<Adventure | null> => {
  const { data, error } = await supabase
    .from('adventures')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching adventure:', error);
    throw error;
  }
  
  return data;
};

export const createAdventure = async (adventure: Omit<Adventure, 'id' | 'created_at' | 'updated_at'>): Promise<Adventure> => {
  const { data, error } = await supabase
    .from('adventures')
    .insert([{
      ...adventure,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating adventure:', error);
    throw error;
  }
  
  return data;
};

export const updateAdventureBounty = async (id: string, amount: number): Promise<Adventure> => {
  const { data, error } = await supabase
    .from('adventures')
    .update({ 
      bounty_current: amount,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating adventure bounty:', error);
    throw error;
  }
  
  return data;
};

// Apply jitter to coordinates for scouting missions
export const applyCoordinateJitter = (lat: number, lng: number, jitterAmount: number = 0.02): { lat: number; lng: number } => {
  const displayLat = lat + (Math.random() - 0.5) * jitterAmount;
  const displayLng = lng + (Math.random() - 0.5) * jitterAmount;
  
  return { lat: displayLat, lng: displayLng };
};

// Check if mission data should be redacted
export const isMissionRedacted = (status: string): boolean => {
  return status === 'scouting';
};