
import React from 'react';
import { Brand, ProductType } from '@/types';
import { BrandBasicInfo } from '@/components/brand/details/BrandBasicInfo';
import { BrandVoiceToneSection } from '@/components/brand/details/BrandVoiceToneSection';
import { BrandThemesSection } from '@/components/brand/details/BrandThemesSection';
import { BrandKnowledgeSection } from '@/components/brand/BrandKnowledgeSection';
import { Product } from '@/components/brand/products/translations';
import { v4 as uuidv4 } from 'uuid';

interface BrandDetailsContentProps {
  brand: Brand;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  knowledgeData: {
    brandInfo: string;
    qaPairs: any[];
    products: Product[];
  };
  onKnowledgeUpdate: (knowledge: any) => void;
}

export function BrandDetailsContent({ 
  brand, 
  products, 
  setProducts, 
  knowledgeData, 
  onKnowledgeUpdate 
}: BrandDetailsContentProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BrandBasicInfo brand={brand} />
        
        {/* Voice tone section */}
        <div className="md:col-span-1">
          <BrandVoiceToneSection tone={brand?.tone} />
        </div>
        
        {/* Themes section */}
        <div className="md:col-span-1">
          <BrandThemesSection themes={brand?.themes || []} />
        </div>
        
        {/* Knowledge section */}
        <div className="md:col-span-2">
          <BrandKnowledgeSection 
            onUpdate={(knowledge) => {
              onKnowledgeUpdate(knowledge);
              if (knowledge.products) {
                const updatedProducts = knowledge.products.map((product: Product) => ({
                  id: product.id || uuidv4(),
                  brandId: product.brandId || brand.id,
                  name: product.name,
                  description: product.description,
                  features: product.features,
                  pricing: product.pricing || '',
                  benefits: product.benefits || '',
                  image: product.image,
                  createdAt: product.createdAt || new Date(),
                  updatedAt: product.updatedAt || new Date()
                }));
                setProducts(updatedProducts as ProductType[]);
              }
            }}
            data={knowledgeData}
          />
        </div>
      </div>
    </div>
  );
}
