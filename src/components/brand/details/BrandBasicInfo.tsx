
import React from 'react';
import { Brand } from '@/types';

interface BrandBasicInfoProps {
  brand: Brand;
}

export function BrandBasicInfo({ brand }: BrandBasicInfoProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-4">
        {brand.logo ? (
          <img src={brand.logo} alt={brand.name} className="w-16 h-16 object-contain rounded-lg" />
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-400">{brand.name[0]}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{brand.name}</h2>
          <p className="text-muted-foreground">{brand.description}</p>
        </div>
      </div>

      {brand.website && (
        <div>
          <h3 className="font-medium mb-2">Website</h3>
          <a href={brand.website} target="_blank" rel="noopener noreferrer" 
             className="text-primary hover:underline">
            {brand.website}
          </a>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Primary Color</h3>
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: brand.colors.primary }}
            />
            <span>{brand.colors.primary}</span>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Secondary Color</h3>
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: brand.colors.secondary }}
            />
            <span>{brand.colors.secondary}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
