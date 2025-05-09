
import React, { useCallback } from 'react';
import { Brand } from '@/types';
import { BrandCard } from './BrandCard';
import { BrandSkeleton } from './BrandSkeleton';
import { EmptyBrandState } from './EmptyBrandState';

interface BrandsGridProps {
  loading: boolean;
  brands: Brand[];
  onBrandUpdated: (updatedBrand: Brand) => void;
}

export function BrandsGrid({ loading, brands, onBrandUpdated }: BrandsGridProps) {
  console.log("BrandsGrid rendering with", brands.length, "brands");

  // Use memoized callback for better performance
  const handleBrandUpdate = useCallback((updatedBrand: Brand) => {
    onBrandUpdated(updatedBrand);
  }, [onBrandUpdated]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        Array(3).fill(0).map((_, idx) => (
          <BrandSkeleton key={idx} />
        ))
      ) : brands.length > 0 ? (
        brands.map(brand => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onBrandUpdated={handleBrandUpdate}
          />
        ))
      ) : (
        <EmptyBrandState />
      )}
    </div>
  );
}
