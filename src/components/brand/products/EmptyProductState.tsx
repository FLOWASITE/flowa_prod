
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productTranslations } from './translations';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface EmptyProductStateProps {
  onAddProduct: (e: React.MouseEvent) => void;
}

export function EmptyProductState({ onAddProduct }: EmptyProductStateProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };

  return (
    <div className="text-center py-10 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <ShoppingBag className="h-8 w-8 text-[#ea384c]" />
      </div>
      <h3 className="text-lg font-medium mb-2">{t('noProductsYet')}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {t('addProductDescription')}
      </p>
      <Button
        onClick={onAddProduct}
        variant="outline"
        className="border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
      >
        {t('addFirstProduct')}
      </Button>
    </div>
  );
}
