
import React from 'react';
import { QADialog } from '@/components/brand/QADialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const translations = {
  manageQA: {
    vi: 'Quản lý câu hỏi & trả lời',
    en: 'Manage Q&A',
    fr: 'Gérer Q&R',
    es: 'Gestionar preguntas y respuestas',
    th: 'จัดการคำถามและคำตอบ',
  },
  qaDescription: {
    vi: 'Tạo cơ sở kiến thức câu hỏi và trả lời để giúp định hình giọng điệu thương hiệu của bạn',
    en: 'Create a knowledge base of questions and answers to help shape your brand voice',
    fr: 'Créez une base de connaissances de questions et réponses pour aider à façonner la voix de votre marque',
    es: 'Cree una base de conocimientos de preguntas y respuestas para ayudar a dar forma a la voz de su marca',
    th: 'สร้างฐานความรู้คำถามและคำตอบเพื่อช่วยกำหนดโทนเสียงของแบรนด์ของคุณ',
  },
  totalQA: {
    vi: 'Tổng số Q&A: ',
    en: 'Total Q&A: ',
    fr: 'Total Q&R: ',
    es: 'Total de preguntas y respuestas: ',
    th: 'คำถามและคำตอบทั้งหมด: ',
  }
};

interface QAPair {
  question: string;
  answer: string;
}

interface QASectionProps {
  qaPairs: QAPair[];
  onChange: (qaPairs: QAPair[]) => void;
}

export function QASection({ qaPairs, onChange }: QASectionProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Card className="border border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <MessageSquare className="h-5 w-5 text-primary" />
          {t('manageQA')}
        </CardTitle>
        <CardDescription>
          {t('qaDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QADialog 
          qaPairs={qaPairs}
          onChange={onChange}
        />
        {qaPairs.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            {t('totalQA')} {qaPairs.length}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
