
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Check if Supabase environment variables exist
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client if connection info is available
export const supabase = supabaseUrl && supabaseKey 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

// Helper function to check if Supabase is connected
export const isSupabaseConnected = async () => {
  if (!supabase) return false;
  
  try {
    console.log('Checking Supabase connection...');
    
    // Try a simple query to check if Supabase is connected
    const { data, error } = await supabase.from('brands').select('id').limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error.message, error.details);
      return false;
    }
    
    console.log('Supabase connected:', true);
    return true;
  } catch (error) {
    console.error('Supabase connection exception:', error);
    return false;
  }
};
