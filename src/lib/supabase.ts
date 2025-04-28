
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Kiểm tra xem biến môi trường Supabase có tồn tại không
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Tạo client Supabase nếu có đủ thông tin kết nối
export const supabase = supabaseUrl && supabaseKey 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

// Hàm trợ giúp để kiểm tra xem Supabase đã được kết nối chưa
export const isSupabaseConnected = () => {
  return !!supabase;
};
