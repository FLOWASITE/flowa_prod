
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product, productTranslations } from '../translations';
import { ProductHeader } from './ProductHeader';
import { ProductField } from './ProductField';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProductItemProps {
  product: Product;
  index: number;
  onUpdate: (index: number, field: keyof Product, value: string) => void;
  onRemove: (index: number) => void;
  onEdit: () => void;
}

export function ProductItem({ product, index, onUpdate, onRemove, onEdit }: ProductItemProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };

  const handleUpdate = (field: keyof Product, value: string) => {
    onUpdate(index, field, value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="flex justify-between items-center">
        <ProductHeader 
          title={product.name}
          index={index}
          defaultTitle={t('addProduct')}
          onRemove={() => onRemove(index)}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 text-[#ea384c]"
        >
          <Edit className="h-4 w-4" />
          <span className="ml-1">{t('edit')}</span>
        </Button>
      </div>
      
      {/* Product preview information */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{t('productName')}</p>
          <p className="mt-1">{product.name || "-"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{t('pricing')}</p>
          <p className="mt-1">{product.pricing || "-"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{t('description')}</p>
          <p className="mt-1 break-words">{product.description || "-"}</p>
        </div>
      </div>
    </div>
  );
}
