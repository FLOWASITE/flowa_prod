
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KnowledgeSectionHeader } from './knowledge/KnowledgeSectionHeader';
import { BrandInfoInput } from './knowledge/BrandInfoInput';
import { QASection } from './knowledge/QASection';
import { ProductSection } from './knowledge/ProductSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from './products/translations';

interface QAPair {
  question: string;
  answer: string;
}

interface BrandKnowledgeSectionProps {
  onUpdate: (knowledge: {
    brandInfo: string;
    qaPairs: QAPair[];
    products?: Product[];
  }) => void;
  data: {
    brandInfo: string;
    qaPairs?: QAPair[];
    products?: Product[];
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
  products: {
    en: 'Product Information',
    vi: 'Thông tin sản phẩm',
    fr: 'Informations sur les produits',
    es: 'Información del producto',
    th: 'ข้อมูลสินค้า',
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
    products: data.products || [],
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

  const handleProductsChange = (newProducts: Product[]) => {
    onUpdate({
      ...normalizedData,
      products: newProducts,
    });
  };

  return (
    <div className="space-y-4">
      <KnowledgeSectionHeader />

      <Tabs defaultValue="brand-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="brand-info">{t('brandInfo')}</TabsTrigger>
          <TabsTrigger value="products-info">{t('products')}</TabsTrigger>
          <TabsTrigger value="qa-management">{t('qaManagement')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brand-info" className="pt-2">
          <BrandInfoInput 
            value={normalizedData.brandInfo}
            onChange={handleBrandInfoChange}
          />
        </TabsContent>

        <TabsContent value="products-info" className="pt-2">
          <ProductSection 
            products={normalizedData.products}
            onProductsChange={handleProductsChange}
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
