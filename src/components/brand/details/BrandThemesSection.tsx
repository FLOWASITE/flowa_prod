
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  themes: {
    en: 'Theme Types',
    vi: 'Loại chủ đề',
  },
  noThemes: {
    en: 'No theme types added',
    vi: 'Chưa có loại chủ đề',
  }
};

interface BrandThemesSectionProps {
  themes: string[];
}

export function BrandThemesSection({ themes }: BrandThemesSectionProps) {
  const { currentLanguage } = useLanguage();

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{t('themes')}</h2>
      </div>
      
      {themes && themes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme, index) => (
            <div key={index} className="p-3 border rounded-lg bg-muted/50">
              <p>{theme}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">{t('noThemes')}</p>
      )}
    </div>
  );
}
