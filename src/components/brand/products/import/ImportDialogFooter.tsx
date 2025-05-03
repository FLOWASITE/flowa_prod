
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { productTranslations } from '../translations';

interface ImportDialogFooterProps {
  onCancel: () => void;
  onImport: () => void;
  isImportDisabled: boolean;
}

export function ImportDialogFooter({ 
  onCancel, 
  onImport, 
  isImportDisabled 
}: ImportDialogFooterProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string) => {
    return productTranslations[key]?.[currentLanguage.code] || productTranslations[key]?.en || key;
  };

  return (
    <DialogFooter className="mt-6">
      <Button variant="outline" onClick={onCancel}>
        {t('cancel')}
      </Button>
      <Button 
        onClick={onImport} 
        disabled={isImportDisabled}
      >
        {t('import')}
      </Button>
    </DialogFooter>
  );
}
