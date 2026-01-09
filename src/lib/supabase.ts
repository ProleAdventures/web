import { createClient } from '@supabase/supabase-js';

// Only create Supabase client if environment variables are properly set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Strict validation - must be a non-empty, valid Supabase URL
const isValidSupabaseUrl = 
  supabaseUrl && 
  typeof supabaseUrl === 'string' &&
  supabaseUrl.trim().length > 0 &&
  supabaseUrl.startsWith('http') &&
  (supabaseUrl.includes('supabase.co') || supabaseUrl.includes('supabase.com')) &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('placeholder');

const isValidSupabaseKey = 
  supabaseAnonKey && 
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.trim().length > 0 &&
  !supabaseAnonKey.includes('your-anon-key');

// Create client only if config is strictly valid, otherwise set to null
export const supabase = (isValidSupabaseUrl && isValidSupabaseKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Debug log in development
if (!supabase && import.meta.env.DEV) {
  console.log('Supabase client not initialized - missing or invalid environment variables');
  console.log('VITE_SUPABASE_URL:', supabaseUrl || 'not set');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '***set***' : 'not set');
}

// Helper functions for database operations
export const saveContactMessage = async (name: string, email: string, message: string) => {
  if (!supabase) throw new Error('Supabase not configured');
  
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
  if (!supabase) throw new Error('Supabase not configured');
  
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
  if (!supabase) throw new Error('Supabase not configured');
  
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
  if (!supabase) throw new Error('Supabase not configured');
  
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
  if (!supabase) throw new Error('Supabase not configured');
  
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
  if (!supabase) throw new Error('Supabase not configured');
  
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
