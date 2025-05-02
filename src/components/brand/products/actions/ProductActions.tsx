
import React from 'react';
import { Plus, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '../translations';

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
      <Button 
        type="button" 
        variant="outline" 
        onClick={onOpenImportDialog}
        className="flex-1 bg-red-50/30 border-red-200 hover:bg-red-100/50 text-red-800 hover:text-red-900"
      >
        <File className="h-4 w-4 mr-2" />
        {t('importProducts')}
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={onAddProduct}
        className="flex-1 bg-red-50/30 border-red-200 hover:bg-red-100/50 text-red-800 hover:text-red-900"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('addProduct')}
      </Button>
    </div>
  );
}
