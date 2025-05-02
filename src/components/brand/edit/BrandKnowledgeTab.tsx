import React from 'react';
import { BrandKnowledgeSection } from '../BrandKnowledgeSection';
import { Product } from '../products/translations';

interface QAPair {
  question: string;
  answer: string;
}

interface BrandKnowledgeTabProps {
  brandKnowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
    products?: Product[];
  };
  setBrandKnowledge: (knowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
    products?: Product[];
  }) => void;
  products?: Product[];
  setProducts?: (products: Product[]) => void;
}

export function BrandKnowledgeTab({ brandKnowledge, setBrandKnowledge, products, setProducts }: BrandKnowledgeTabProps) {
  const handleKnowledgeUpdate = (data: {
    brandInfo: string;
    qaPairs: QAPair[];
    products?: Product[];
  }) => {
    // If we have separate product management, update only brandInfo and qaPairs
    if (setProducts && data.products) {
      setProducts(data.products);
      setBrandKnowledge({
        brandInfo: data.brandInfo,
        qaPairs: data.qaPairs,
      });
    } else {
      // Otherwise update everything
      setBrandKnowledge(data);
    }
  };

  const knowledgeData = {
    brandInfo: brandKnowledge.brandInfo,
    qaPairs: brandKnowledge.qaPairs,
    products: products || brandKnowledge.products || [],
  };

  return (
    <div className="space-y-6">
      <BrandKnowledgeSection
        data={knowledgeData}
        onUpdate={handleKnowledgeUpdate}
      />
    </div>
  );
}
