
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product, productTranslations } from './translations';

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

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="flex justify-between items-center mb-2 pb-2 border-b">
        <h4 className="font-medium">
          {product.name ? product.name : `${t('addProduct')} #${index + 1}`}
        </h4>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onRemove(index)}
          className="h-8 px-2 text-muted-foreground hover:text-destructive"
        >
          &times;
        </Button>
      </div>
      
      <div>
        <Label htmlFor={`product-name-${index}`}>{t('productName')}</Label>
        <Input
          id={`product-name-${index}`}
          value={product.name}
          onChange={(e) => onUpdate(index, 'name', e.target.value)}
          placeholder="e.g. Web Design Service"
          className="mt-1.5"
        />
      </div>
      
      <div>
        <Label htmlFor={`product-desc-${index}`}>{t('productDescription')}</Label>
        <Textarea
          id={`product-desc-${index}`}
          value={product.description}
          onChange={(e) => onUpdate(index, 'description', e.target.value)}
          placeholder="Describe your product or service..."
          className="mt-1.5"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`product-pricing-${index}`}>{t('pricing')}</Label>
          <Input
            id={`product-pricing-${index}`}
            value={product.pricing}
            onChange={(e) => onUpdate(index, 'pricing', e.target.value)}
            placeholder="e.g. 200.000đ/month"
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor={`product-benefits-${index}`}>{t('benefits')}</Label>
          <Input
            id={`product-benefits-${index}`}
            value={product.benefits}
            onChange={(e) => onUpdate(index, 'benefits', e.target.value)}
            placeholder="e.g. Increases productivity by 30%"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor={`product-features-${index}`}>{t('features')}</Label>
        <Textarea
          id={`product-features-${index}`}
          value={product.features.join('\n')}
          onChange={(e) => onUpdate(index, 'features', e.target.value)}
          placeholder="Responsive design\nSEO optimization\n24/7 support"
          className="mt-1.5"
          rows={3}
        />
      </div>
    </div>
  );
}
