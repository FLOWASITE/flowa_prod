
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { BrandCard } from '@/components/brand/BrandCard';
import { NewBrandDialog } from '@/components/brand/NewBrandDialog';
import { mockBrands } from '@/data/mockData';

const Brands = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Brands</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your brand identities and settings</p>
        </div>
        
        <NewBrandDialog />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBrands.map(brand => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </Layout>
  );
};

export default Brands;
