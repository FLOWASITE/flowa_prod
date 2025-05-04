
import { useState, useEffect } from 'react';
import { Brand } from '@/types';
import { useBrandFetching } from './useBrandFetching';
import { useAddBrand } from './useAddBrand';
import { useUpdateBrand } from './useUpdateBrand';
import { useLanguage } from '@/contexts/LanguageContext';
import { brandsTranslations } from '@/pages/brands/translations';

export const useBrandsManager = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof brandsTranslations) => {
    return brandsTranslations[key][currentLanguage.code] || brandsTranslations[key].en;
  };

  const {
    brands: fetchedBrands, 
    setBrands,
    loading, 
    isConnected, 
    checkSupabaseConnection
  } = useBrandFetching(t);

  const { handleUpdateBrand } = useUpdateBrand();
  const { handleAddBrand } = useAddBrand(checkSupabaseConnection);

  // Set initial brands from fetching
  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  return {
    brands: fetchedBrands,
    loading,
    isConnected,
    t,
    checkSupabaseConnection,
    handleAddBrand,
    handleUpdateBrand: (updatedBrand: Brand) => {
      handleUpdateBrand(updatedBrand);
      // We also need to update the fetched brands directly 
      // since useUpdateBrand manages its own state
      if (updatedBrand.id.startsWith('deleted-')) {
        const originalId = updatedBrand.id.replace('deleted-', '');
        setBrands(prev => prev.filter(b => b.id !== originalId));
      } else {
        setBrands(prev => 
          prev.map(b => b.id === updatedBrand.id ? updatedBrand : b)
        );
      }
    }
  };
};
