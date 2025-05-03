
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { productTranslations } from '../translations';
import { generateTemplateFile } from './csvUtils';

interface TemplateDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateDownloadDialog({ open, onOpenChange }: TemplateDownloadDialogProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: string) => {
    return productTranslations[key]?.[currentLanguage.code] || productTranslations[key]?.en || key;
  };

  const handleDownload = () => {
    generateTemplateFile(
      t('productName'), 
      t('price'), 
      t('description'), 
      t('features'), 
      t('benefits')
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('downloadTemplate')}</DialogTitle>
          <DialogDescription>{t('downloadDescription')}</DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex flex-col items-center">
          <FileText className="h-16 w-16 text-primary/80" />
          <p className="text-sm text-muted-foreground mt-4 text-center">
            products_template.csv
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleDownload}>
            {t('downloadButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
