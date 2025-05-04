
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

  // Optimized update handler to prevent UI lag
  const handleBrandUpdate = (updatedBrand: Brand) => {
    // Handle deletion signal with brand ID starting with "deleted-"
    if (updatedBrand.id.startsWith('deleted-')) {
      const originalId = updatedBrand.id.replace('deleted-', '');
      console.log("Removing brand with ID from state:", originalId);
      
      // Immediately update the UI to remove the deleted brand
      // Use synchronous operation to ensure UI updates immediately
      setBrands(prev => prev.filter(b => b.id !== originalId));
      return;
    }
    
    // For regular updates, update the brands in state
    handleUpdateBrand(updatedBrand);
    setBrands(prev => 
      prev.map(b => b.id === updatedBrand.id ? updatedBrand : b)
    );
  };

  return {
    brands: fetchedBrands,
    loading,
    isConnected,
    t,
    checkSupabaseConnection,
    handleAddBrand,
    handleUpdateBrand: handleBrandUpdate
  };
};
