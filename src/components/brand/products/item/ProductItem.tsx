
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product, productTranslations } from '../translations';
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
  
  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
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
      
      {/* Main product fields: Name, Price, Description */}
      <ProductField
        id={`product-name-${index}`}
        label={t('productName')}
        value={product.name}
        onChange={(value) => handleUpdate('name', value)}
        placeholder="e.g. Web Design Service"
      />
      
      <ProductField
        id={`product-pricing-${index}`}
        label={t('pricing')}
        value={product.pricing}
        onChange={(value) => handleUpdate('pricing', value)}
        placeholder="e.g. 200.000đ/month"
      />
      
      <ProductField
        id={`product-desc-${index}`}
        label={t('productDescription')}
        value={product.description}
        onChange={(value) => handleUpdate('description', value)}
        placeholder="Describe your product or service..."
        multiline
        rows={3}
      />
    </div>
  );
}
