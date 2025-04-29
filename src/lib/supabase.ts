
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Check if Supabase environment variables exist
const supabaseUrl = "https://cbcxaikcqaznmztilqca.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiY3hhaWtjcWF6bm16dGlscWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTYxOTUsImV4cCI6MjA2MTQzMjE5NX0.YdGESCNbkkMY2Y40BdSVZtNzXE6gWrrJoB2uuI_KKwM";

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper function to check if Supabase is connected
export const isSupabaseConnected = () => {
  return !!supabase;
};
