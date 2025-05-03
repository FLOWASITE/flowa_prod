
import React from 'react';
import { Package2, DollarSign } from 'lucide-react';
import { ProductType } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  products: {
    en: 'Products & Services',
    vi: 'Sản phẩm & Dịch vụ',
  },
  pricing: {
    en: 'Pricing',
    vi: 'Giá sản phẩm',
  },
  noProducts: {
    en: 'No products or services added',
    vi: 'Chưa có sản phẩm hoặc dịch vụ',
  }
};

interface BrandProductsSectionProps {
  products: ProductType[];
}

export function BrandProductsSection({ products }: BrandProductsSectionProps) {
  const { currentLanguage } = useLanguage();

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <Package2 className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{t('products')}</h2>
      </div>
      
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              {product.pricing && (
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">{t('pricing')}</h4>
                    <p className="text-sm text-muted-foreground">{product.pricing}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">{t('noProducts')}</p>
      )}
    </div>
  );
}
