
import React from 'react';
import { Speaker } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  tone: {
    en: 'Voice Tone',
    vi: 'Giọng điệu',
  }
};

interface BrandVoiceToneSectionProps {
  tone: string;
}

export function BrandVoiceToneSection({ tone }: BrandVoiceToneSectionProps) {
  const { currentLanguage } = useLanguage();

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <Speaker className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{t('tone')}</h2>
      </div>
      <p className="text-muted-foreground">{tone}</p>
    </div>
  );
}
