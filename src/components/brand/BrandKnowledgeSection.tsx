
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KnowledgeSectionHeader } from './knowledge/KnowledgeSectionHeader';
import { BrandInfoInput } from './knowledge/BrandInfoInput';
import { QASection } from './knowledge/QASection';
import { useLanguage } from '@/contexts/LanguageContext';

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

const translations = {
  brandInfo: {
    en: 'Brand Information',
    vi: 'Thông tin thương hiệu',
    fr: 'Informations sur la marque',
    es: 'Información de la marca',
    th: 'ข้อมูลแบรนด์',
  },
  qaManagement: {
    en: 'Q&A Management',
    vi: 'Quản lý câu hỏi & trả lời',
    fr: 'Gestion des Q&R',
    es: 'Gestión de preguntas y respuestas',
    th: 'จัดการคำถามและคำตอบ',
  }
};

export function BrandKnowledgeSection({ onUpdate, data }: BrandKnowledgeSectionProps) {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };
  
  const normalizedData = {
    ...data,
    qaPairs: data.qaPairs || [],
  };

  const handleBrandInfoChange = (brandInfo: string) => {
    onUpdate({
      ...normalizedData,
      brandInfo,
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
      <KnowledgeSectionHeader />

      <Tabs defaultValue="brand-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="brand-info">{t('brandInfo')}</TabsTrigger>
          <TabsTrigger value="qa-management">{t('qaManagement')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brand-info" className="pt-2">
          <BrandInfoInput 
            value={normalizedData.brandInfo}
            onChange={handleBrandInfoChange}
          />
        </TabsContent>
        
        <TabsContent value="qa-management" className="pt-2">
          <QASection 
            qaPairs={normalizedData.qaPairs}
            onChange={handleQAChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
