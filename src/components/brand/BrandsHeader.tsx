
import React from 'react';
import { Button } from '@/components/ui/button';
import { DatabaseZap } from 'lucide-react';
import { NewBrandDialog } from './NewBrandDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brand } from '@/types';

interface BrandsHeaderProps {
  isConnected: boolean | null;
  onReconnect: () => void;
  t: (key: string) => string;
  onBrandCreated?: (newBrand: Brand) => void;
}

export function BrandsHeader({ 
  isConnected, 
  onReconnect, 
  t,
  onBrandCreated 
}: BrandsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t('brands')}
        </h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      
      {isConnected === false && (
        <Button 
          variant="outline" 
          onClick={onReconnect} 
          className="flex items-center gap-2"
        >
          <DatabaseZap size={16} />
          {t('tryReconnect')}
        </Button>
      )}
      
      <NewBrandDialog onBrandCreated={onBrandCreated || (() => {})} />
    </div>
  );
}
