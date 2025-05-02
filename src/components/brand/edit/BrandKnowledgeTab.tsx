
import React from 'react';
import { BrandKnowledgeSection } from '../BrandKnowledgeSection';

interface QAPair {
  question: string;
  answer: string;
}

interface BrandKnowledgeTabProps {
  brandKnowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
  };
  setBrandKnowledge: (knowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
  }) => void;
}

export function BrandKnowledgeTab({ brandKnowledge, setBrandKnowledge }: BrandKnowledgeTabProps) {
  return (
    <div className="space-y-6">
      <BrandKnowledgeSection
        data={brandKnowledge}
        onUpdate={setBrandKnowledge}
      />
    </div>
  );
}
