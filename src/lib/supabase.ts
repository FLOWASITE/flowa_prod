
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
export const isSupabaseConnected = () => {
  return !!supabase;
};
