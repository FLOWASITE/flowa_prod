
import { useState } from 'react';
import { Brand } from '@/types';
import { mockBrands } from '@/data/mock/brands';
import { supabase, isSupabaseConnected } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { brandsTranslations } from '@/pages/brands/translations';

export const useBrandFetching = (t: (key: keyof typeof brandsTranslations) => string) => {
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkSupabaseConnection = async () => {
    console.log("Checking Supabase connection...");
    const connected = await isSupabaseConnected();
    console.log("Supabase connected:", connected);
    setIsConnected(connected);
    
    if (connected) {
      fetchBrands();
    } else {
      setLoading(false);
      setBrands([...mockBrands]);
      toast({
        title: t('supabaseNotConnected'),
        description: 'Using mock data instead.',
        variant: 'destructive',
      });
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      console.log("Fetching brands from Supabase...");
      
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }
      
      if (!data) {
        throw new Error('No data returned');
      }
      
      console.log('Fetched brands data:', data);
      
      const mappedBrands: Brand[] = data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        logo: item.logo || undefined,
        website: item.website || undefined,
        colors: {
          primary: item.primary_color,
          secondary: item.secondary_color,
        },
        tone: item.tone || 'Professional',
        themes: item.themes || [],
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));
      
      setBrands(mappedBrands);
      sonnerToast.success('Brands loaded successfully');
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast({
        title: t('loadingError'),
        variant: 'destructive',
      });
      
      setBrands([...mockBrands]);
      toast({
        title: t('supabaseNotConnected'),
        description: 'Using mock data instead.',
        variant: 'default',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    brands,
    setBrands,
    loading,
    isConnected,
    checkSupabaseConnection
  };
};
