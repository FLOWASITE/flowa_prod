
import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, Store } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockBrands } from '@/data/mockData';
import { supabase, isSupabaseConnected } from '@/integrations/supabase/client';
import { Brand } from '@/types';
import { toast } from 'sonner';

const translations = {
  switchBrand: {
    vi: 'Chuyển đổi thương hiệu',
    en: 'Switch Brand',
    fr: 'Changer de marque',
    es: 'Cambiar marca',
    th: 'เปลี่ยนแบรนด์',
    id: 'Ganti Merek'
  },
  noBrands: {
    vi: 'Không có thương hiệu',
    en: 'No Brands',
    fr: 'Pas de marques',
    es: 'Sin marcas',
    th: 'ไม่มีแบรนด์',
    id: 'Tidak Ada Merek'
  }
};

export function BrandSwitcher() {
  const { currentLanguage } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    const connected = await isSupabaseConnected();
    setIsConnected(connected);
    
    if (connected) {
      fetchBrands();
    } else {
      setLoading(false);
      setBrands(mockBrands);
      if (mockBrands.length > 0) {
        setSelectedBrand(mockBrands[0]);
      }
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
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
        setSelectedBrand(mappedBrands[0]);
      } else {
        setBrands(mockBrands);
        if (mockBrands.length > 0) {
          setSelectedBrand(mockBrands[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Error fetching brands');
      
      setBrands(mockBrands);
      if (mockBrands.length > 0) {
        setSelectedBrand(mockBrands[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key]['en'];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[280px] justify-between font-medium text-sm bg-white dark:bg-gray-900"
        >
          <Store className="mr-2 h-4 w-4" />
          {loading ? 'Loading...' : selectedBrand?.name || getTranslation('noBrands')}
          <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px] bg-white dark:bg-gray-900">
        {brands.map((brand) => (
          <DropdownMenuItem
            key={brand.id}
            onClick={() => setSelectedBrand(brand)}
            className="justify-between"
          >
            <div className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              {brand.name}
            </div>
            {selectedBrand?.id === brand.id && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
