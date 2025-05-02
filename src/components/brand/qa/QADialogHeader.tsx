
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface QADialogHeaderProps {
  onImportClick: () => void;
  t: (key: string) => string;
}

export function QADialogHeader({ onImportClick, t }: QADialogHeaderProps) {
  return (
    <div className="flex justify-between items-center sticky top-0 bg-background pt-2 pb-2 z-10">
      <h3 className="font-medium">{t('qaList')}</h3>
      <Button 
        variant="outline"
        size="sm" 
        className="flex items-center gap-2"
        onClick={onImportClick}
      >
        <Upload className="h-4 w-4" />
        {t('importExcel')}
      </Button>
    </div>
  );
}
