
import React from 'react';
import { BookText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { QADialog } from './QADialog';
import { ImportDialog } from './ImportDialog';
import { useToast } from '@/hooks/use-toast';

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
  brandInfo: {
    vi: 'Thông tin thương hiệu',
    en: 'Brand Information',
    fr: 'Informations sur la marque',
    es: 'Información de la marca',
    th: 'ข้อมูลแบรนด์',
  },
  brandInfoPlaceholder: {
    vi: 'Nhập thông tin về lịch sử thương hiệu, giá trị cốt lõi, đối tượng mục tiêu và hướng dẫn thương hiệu...',
    en: 'Enter information about brand history, core values, target audience and brand guidelines...',
    fr: 'Entrez des informations sur l\'histoire de la marque, les valeurs fondamentales, le public cible et les directives de la marque...',
    es: 'Ingrese información sobre la historia de la marca, valores fundamentales, público objetivo y directrices de la marca...',
    th: 'ป้อนข้อมูลเกี่ยวกับประวัติแบรนด์ ค่านิยมหลัก กลุ่มเป้าหมาย และแนวทางแบรนด์...',
  },
  manageQA: {
    vi: 'Quản lý câu hỏi & trả lời',
    en: 'Manage Q&A',
    fr: 'Gérer Q&R',
    es: 'Gestionar preguntas y respuestas',
    th: 'จัดการคำถามและคำตอบ',
  }
};

interface QAPair {
  question: string;
  answer: string;
}

interface BrandKnowledgeSectionProps {
  onUpdate: (knowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
  }) => void;
  data: {
    brandInfo: string;
    qaPairs?: QAPair[];
  };
}

export function BrandKnowledgeSection({ onUpdate, data }: BrandKnowledgeSectionProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const normalizedData = {
    ...data,
    qaPairs: data.qaPairs || [],
  };
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleChange = (field: keyof typeof normalizedData) => (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onUpdate({
      ...normalizedData,
      [field]: event.target.value,
    });
  };

  const handleQAChange = (newQAPairs: QAPair[]) => {
    onUpdate({
      ...normalizedData,
      qaPairs: newQAPairs,
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
          <Label htmlFor="brandInfo">{t('brandInfo')}</Label>
          <Textarea
            id="brandInfo"
            value={normalizedData.brandInfo}
            onChange={handleChange('brandInfo')}
            placeholder={t('brandInfoPlaceholder')}
            className="min-h-[160px]"
          />
        </div>

        <div className="space-y-2 border-t pt-4">
          <Label className="text-md font-medium">{t('manageQA')}</Label>
          <QADialog 
            qaPairs={normalizedData.qaPairs}
            onChange={handleQAChange}
          />
        </div>
      </div>
    </div>
  );
}
