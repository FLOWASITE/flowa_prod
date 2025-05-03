
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useBrands } from '@/hooks/useBrands';
import { BrandsHeader } from '@/components/brand/BrandsHeader';
import { ConnectionAlert } from '@/components/brand/ConnectionAlert';
import { BrandsGrid } from '@/components/brand/BrandsGrid';

const Brands = () => {
  const { 
    brands, 
    loading, 
    isConnected, 
    t, 
    checkSupabaseConnection, 
    handleAddBrand, 
    handleUpdateBrand 
  } = useBrands();

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <BrandsHeader 
          isConnected={isConnected} 
          onReconnect={checkSupabaseConnection}
          t={t}
          onBrandCreated={handleAddBrand}
        />
        
        {isConnected === false && <ConnectionAlert t={t} />}
        
        <BrandsGrid 
          loading={loading} 
          brands={brands} 
          onBrandUpdated={handleUpdateBrand} 
        />
      </div>
    </Layout>
  );
};

export default Brands;
