
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { KnowledgeSectionHeader } from './knowledge/KnowledgeSectionHeader';
import { BrandInfoInput } from './knowledge/BrandInfoInput';
import { QASection } from './knowledge/QASection';

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
  const { toast } = useToast();
  
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

      <div className="grid grid-cols-1 gap-6">
        <BrandInfoInput 
          value={normalizedData.brandInfo}
          onChange={handleBrandInfoChange}
        />

        <QASection 
          qaPairs={normalizedData.qaPairs}
          onChange={handleQAChange}
        />
      </div>
    </div>
  );
}
