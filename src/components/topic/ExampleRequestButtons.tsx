
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExampleRequestButtonsProps {
  productExamples: Array<{ id: string; name: string }>;
  onSelectExample: (text: string) => void;
  translations: Record<string, Record<string, string>>;
}

export function ExampleRequestButtons({
  productExamples,
  onSelectExample,
  translations
}: ExampleRequestButtonsProps) {
  const { currentLanguage } = useLanguage();

  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en'];
  };
  
  // Generate example requests for each product type
  const getProductRequestText = (productName: string) => {
    return `Tạo 3 chủ đề về ${productName}`;
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {productExamples.map(product => (
          <Button
            key={product.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelectExample(getProductRequestText(product.name))}
            className="flex items-center gap-1"
          >
            <Tag className="h-3 w-3" />
            {product.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
