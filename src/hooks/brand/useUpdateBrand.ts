
import { useState } from 'react';
import { Brand } from '@/types';

export const useUpdateBrand = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const handleUpdateBrand = (updatedBrand: Brand) => {
    // Check if this is a deletion signal (we used a hack with id starting with "deleted-")
    if (updatedBrand.id.startsWith('deleted-')) {
      const originalId = updatedBrand.id.replace('deleted-', '');
      console.log("Removing brand with ID from state:", originalId);
      setBrands(prev => prev.filter(b => b.id !== originalId));
      return;
    }
    
    // Normal update
    setBrands(prev => 
      prev.map(b => b.id === updatedBrand.id ? updatedBrand : b)
    );
  };

  return { brands, setBrands, handleUpdateBrand };
};
