
import React from 'react';
import { Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from './translations';

export function EmptyProductState() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="text-center p-6 border border-dashed border-red-200 rounded-lg bg-red-50/10">
      <Package className="h-12 w-12 mx-auto text-red-300 mb-2" />
      <p className="text-red-800">{t('noProducts')}</p>
    </div>
  );
}
