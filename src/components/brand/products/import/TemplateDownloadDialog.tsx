
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from '@/components/ui/alert-dialog';
import { importTranslations } from './importTranslations';
import { generateTemplateFile } from './csvUtils';

interface TemplateDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateDownloadDialog({ open, onOpenChange }: TemplateDownloadDialogProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
  };

  const handleDownloadTemplate = () => {
    generateTemplateFile(
      t('productName'),
      t('price'),
      t('description'),
      t('features'),
      t('benefits')
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('downloadConfirm')}</AlertDialogTitle>
        </AlertDialogHeader>
        <p>{t('downloadDescription')}</p>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDownloadTemplate}
            className="bg-primary text-primary-foreground"
          >
            {t('downloadTemplate')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
