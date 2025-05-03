import React from 'react';
import { Plus, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { productTranslations } from '../translations';

interface ProductActionsProps {
  onAddProduct: () => void;
  onOpenImportDialog: () => void;
}

export function ProductActions({ onAddProduct, onOpenImportDialog }: ProductActionsProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onOpenImportDialog}
        className="flex-1 border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
      >
        <File className="h-4 w-4 mr-2" />
        {t('importProducts')}
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={onAddProduct}
        className="flex-1 border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('addProduct')}
      </Button>
    </div>
  );
}
