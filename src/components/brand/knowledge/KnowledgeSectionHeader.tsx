
import React from 'react';
import { Book } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  brandKnowledge: {
    en: 'Brand Knowledge',
    vi: 'Kiến thức thương hiệu',
    fr: 'Connaissance de la marque',
    es: 'Conocimiento de la marca',
    th: 'ความรู้แบรนด์',
  }
};

export function KnowledgeSectionHeader() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };
  
  return (
    <div className="flex items-center gap-2 mb-4">
      <Book className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-semibold">{t('brandKnowledge')}</h3>
    </div>
  );
}
