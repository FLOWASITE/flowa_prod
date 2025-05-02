
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '../translations';
import { translations } from '../translations';
import { ProductHeader } from './ProductHeader';
import { ProductField } from './ProductField';

interface ProductItemProps {
  product: Product;
  index: number;
  onUpdate: (index: number, field: keyof Product, value: string) => void;
  onRemove: (index: number) => void;
}

export function ProductItem({ product, index, onUpdate, onRemove }: ProductItemProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleUpdate = (field: keyof Product, value: string) => {
    onUpdate(index, field, value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <ProductHeader 
        title={product.name}
        index={index}
        defaultTitle={t('addProduct')}
        onRemove={() => onRemove(index)}
      />
      
      <ProductField
        id={`product-name-${index}`}
        label={t('productName')}
        value={product.name}
        onChange={(value) => handleUpdate('name', value)}
        placeholder="e.g. Web Design Service"
      />
      
      <ProductField
        id={`product-desc-${index}`}
        label={t('productDescription')}
        value={product.description}
        onChange={(value) => handleUpdate('description', value)}
        placeholder="Describe your product or service..."
        multiline
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductField
          id={`product-pricing-${index}`}
          label={t('pricing')}
          value={product.pricing}
          onChange={(value) => handleUpdate('pricing', value)}
          placeholder="e.g. 200.000đ/month"
        />
        
        <ProductField
          id={`product-benefits-${index}`}
          label={t('benefits')}
          value={product.benefits}
          onChange={(value) => handleUpdate('benefits', value)}
          placeholder="e.g. Increases productivity by 30%"
        />
      </div>

      <ProductField
        id={`product-features-${index}`}
        label={t('features')}
        value={product.features.join('\n')}
        onChange={(value) => handleUpdate('features', value)}
        placeholder="Responsive design\nSEO optimization\n24/7 support"
        multiline
        rows={3}
      />
    </div>
  );
}
