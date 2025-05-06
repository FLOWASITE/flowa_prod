
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { isSupabaseConnected } from '@/lib/supabase';
import { toast } from 'sonner';

export const useSupabaseConnection = () => {
  const [useLocalData, setUseLocalData] = useState(false);

  // Check if Supabase is connected
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isSupabaseConnected();
      if (!connected) {
        setUseLocalData(true);
        toast.warning('Sử dụng dữ liệu mẫu', {
          description: 'Không thể kết nối với cơ sở dữ liệu, đang sử dụng dữ liệu mẫu.'
        });
      }
    };
    
    checkConnection();
  }, []);

  return { useLocalData, setUseLocalData };
};
