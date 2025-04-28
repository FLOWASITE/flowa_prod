
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { mockBrands } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brand } from '@/types';

const translations = {
  brandDetails: {
    en: 'Brand Details',
    vi: 'Chi tiết thương hiệu',
  }
};

const BrandDetails = () => {
  const { id } = useParams();
  const { currentLanguage } = useLanguage();
  const [brand] = useState<Brand | null>(() => {
    return mockBrands.find(b => b.id === id) || null;
  });

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  if (!brand) {
    return (
      <Layout>
        <div className="max-w-[1400px] mx-auto">
          <p>Brand not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">{t('brandDetails')}</h1>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Info */}
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

            {/* Brand Knowledge */}
            <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold">Brand Knowledge</h2>
              
              {brand.knowledge && (
                <>
                  {brand.knowledge.history && (
                    <div>
                      <h3 className="font-medium mb-2">History</h3>
                      <p className="text-muted-foreground">{brand.knowledge.history}</p>
                    </div>
                  )}
                  {brand.knowledge.values && (
                    <div>
                      <h3 className="font-medium mb-2">Values</h3>
                      <p className="text-muted-foreground">{brand.knowledge.values}</p>
                    </div>
                  )}
                  {brand.knowledge.targetAudience && (
                    <div>
                      <h3 className="font-medium mb-2">Target Audience</h3>
                      <p className="text-muted-foreground">{brand.knowledge.targetAudience}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Products Section */}
          {brand.products && brand.products.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brand.products.map((product) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    {product.features && product.features.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Features</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrandDetails;
