
import React from 'react';
import { BookText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  brandKnowledge: {
    vi: 'Kiến thức Brand',
    en: 'Brand Knowledge',
    fr: 'Connaissances de la marque',
    es: 'Conocimiento de marca',
    th: 'ความรู้แบรนด์',
  },
  brandKnowledgeDescription: {
    vi: 'Thêm kiến thức về thương hiệu để AI học và tạo nội dung tốt hơn',
    en: 'Add brand knowledge for AI to learn and generate better content',
    fr: 'Ajouter des connaissances sur la marque pour que l\'IA apprenne et génère un meilleur contenu',
    es: 'Agregue conocimiento de marca para que la IA aprenda y genere mejor contenido',
    th: 'เพิ่มความรู้เกี่ยวกับแบรนด์เพื่อให้ AI เรียนรู้และสร้างเนื้อหาที่ดีขึ้น',
  },
};

export function KnowledgeSectionHeader() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <BookText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('brandKnowledge')}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {t('brandKnowledgeDescription')}
      </p>
    </>
  );
}
