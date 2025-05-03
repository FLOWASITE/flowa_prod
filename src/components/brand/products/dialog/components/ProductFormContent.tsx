
import React from 'react';
import { ProductField } from '../../item/ProductField';
import { PricingFieldsGroup } from './PricingFieldsGroup';
import { Product } from '../../translations';

interface ProductFormContentProps {
  product: Product;
  onChange: (field: keyof Product, value: string | number) => void;
  t: (key: string) => string;
}

export function ProductFormContent({ product, onChange, t }: ProductFormContentProps) {
  return (
    <div className="space-y-4 py-4">
      <ProductField
        id="product-name-dialog"
        label={t('productName')}
        value={product.name}
        onChange={(value) => onChange('name', value)}
        placeholder="e.g. Web Design Service"
      />
      
      <PricingFieldsGroup 
        product={product}
        onChange={onChange}
        t={t}
      />
      
      <ProductField
        id="product-desc-dialog"
        label={t('productDescription')}
        value={product.description}
        onChange={(value) => onChange('description', value)}
        placeholder="Describe your product or service..."
        multiline
        rows={4}
      />
    </div>
  );
}
