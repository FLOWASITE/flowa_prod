
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8009';
export const SUPABASE_URL = 'https://scvsehtlvntbgpfwdisv.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdnNlaHRsdm50YmdwZndkaXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MDIwNTUsImV4cCI6MjA2MjE3ODA1NX0.U-9mlQnhL0AjoMO1sL-n811LYAQzHOz4WDYYLj4ex3k';

export const config = {
  apiUrl: API_URL,
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY,
  environment: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default config;
