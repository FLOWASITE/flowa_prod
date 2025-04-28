
import React from 'react';
import { BookText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  history: {
    vi: 'Lịch sử thương hiệu',
    en: 'Brand History',
    fr: 'Histoire de la marque',
    es: 'Historia de la marca',
    th: 'ประวัติแบรนด์',
  },
  values: {
    vi: 'Giá trị cốt lõi',
    en: 'Core Values',
    fr: 'Valeurs fondamentales',
    es: 'Valores fundamentales',
    th: 'ค่านิยมหลัก',
  },
  targetAudience: {
    vi: 'Đối tượng mục tiêu',
    en: 'Target Audience',
    fr: 'Public cible',
    es: 'Público objetivo',
    th: 'กลุ่มเป้าหมาย',
  },
  brandGuidelines: {
    vi: 'Hướng dẫn thương hiệu',
    en: 'Brand Guidelines',
    fr: 'Directives de la marque',
    es: 'Directrices de marca',
    th: 'แนวทางแบรนด์',
  }
};

interface BrandKnowledgeSectionProps {
  onUpdate: (knowledge: {
    history: string;
    values: string;
    targetAudience: string;
    guidelines: string;
  }) => void;
  data: {
    history: string;
    values: string;
    targetAudience: string;
    guidelines: string;
  };
}

export function BrandKnowledgeSection({ onUpdate, data }: BrandKnowledgeSectionProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleChange = (field: keyof typeof data) => (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onUpdate({
      ...data,
      [field]: event.target.value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BookText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('brandKnowledge')}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {t('brandKnowledgeDescription')}
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="history">{t('history')}</Label>
          <Textarea
            id="history"
            value={data.history}
            onChange={handleChange('history')}
            placeholder="Ví dụ: Thành lập năm 2020, chúng tôi bắt đầu với..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="values">{t('values')}</Label>
          <Textarea
            id="values"
            value={data.values}
            onChange={handleChange('values')}
            placeholder="Ví dụ: Chất lượng, Sáng tạo, Trách nhiệm..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">{t('targetAudience')}</Label>
          <Textarea
            id="targetAudience"
            value={data.targetAudience}
            onChange={handleChange('targetAudience')}
            placeholder="Ví dụ: Người trẻ tuổi từ 18-35, quan tâm đến..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guidelines">{t('brandGuidelines')}</Label>
          <Textarea
            id="guidelines"
            value={data.guidelines}
            onChange={handleChange('guidelines')}
            placeholder="Ví dụ: Ngôn ngữ thương hiệu, hình ảnh..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
