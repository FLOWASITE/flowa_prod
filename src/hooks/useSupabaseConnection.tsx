
import { useState, useEffect } from 'react';
import { isSupabaseConnected } from '@/lib/supabase';

export const useSupabaseConnection = () => {
  const [useLocalData, setUseLocalData] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsChecking(true);
        const connected = await isSupabaseConnected();
        console.log('Supabase connection status:', connected);
        setUseLocalData(!connected);
      } catch (error) {
        console.error('Error checking Supabase connection:', error);
        setUseLocalData(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
  }, []);

  return {
    useLocalData,
    setUseLocalData,
    isChecking
  };
};
