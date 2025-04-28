
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Các biến môi trường này sẽ được cung cấp sau khi bạn kết nối Supabase với Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
