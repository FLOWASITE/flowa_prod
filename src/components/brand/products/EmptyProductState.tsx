
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
    <div className="text-center p-6 bg-gray-200 rounded-md">
      <Package className="h-12 w-12 mx-auto text-gray-600 mb-2" />
      <p className="text-gray-600">{t('noProducts')}</p>
    </div>
  );
}
