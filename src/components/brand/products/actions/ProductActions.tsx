
import React from 'react';
import { File, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '../translations';
import { ProductActionButton } from './ProductActionButton';

interface ProductActionsProps {
  onAddProduct: () => void;
  onOpenImportDialog: () => void;
}

export function ProductActions({ onAddProduct, onOpenImportDialog }: ProductActionsProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="flex gap-2 mb-4">
      <ProductActionButton
        icon={File}
        label={t('importProducts')}
        onClick={onOpenImportDialog}
      />
      
      <ProductActionButton
        icon={Plus}
        label={t('addProduct')}
        onClick={onAddProduct}
      />
    </div>
  );
}
