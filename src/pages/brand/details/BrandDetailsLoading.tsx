
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { brandDetailsTranslations } from './translations';

export function BrandDetailsLoading() {
  const { currentLanguage } = useLanguage();

  const t = (key: keyof typeof brandDetailsTranslations) => {
    return brandDetailsTranslations[key][currentLanguage.code] || brandDetailsTranslations[key].en;
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-xl text-muted-foreground">{t('loading')}</div>
        </div>
      </div>
    </Layout>
  );
}
