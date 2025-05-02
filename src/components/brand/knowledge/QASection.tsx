
import React from 'react';
import { Label } from '@/components/ui/label';
import { QADialog } from '@/components/brand/QADialog';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
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
    <div className="space-y-2 border-t pt-4">
      <Label className="text-md font-medium">{t('manageQA')}</Label>
      <QADialog 
        qaPairs={qaPairs}
        onChange={onChange}
      />
    </div>
  );
}
