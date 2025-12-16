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