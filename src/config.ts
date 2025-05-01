
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
export const SUPABASE_URL = 'https://cbcxaikcqaznmztilqca.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiY3hhaWtjcWF6bm16dGlscWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTYxOTUsImV4cCI6MjA2MTQzMjE5NX0.YdGESCNbkkMY2Y40BdSVZtNzXE6gWrrJoB2uuI_KKwM';

export const config = {
  apiUrl: API_URL,
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY,
  environment: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default config;
