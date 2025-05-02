
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { importTranslations } from './importTranslations';

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
  
  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
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
