
import React from 'react';
import { BookText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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
  },
  addQA: {
    vi: 'Thêm câu hỏi và trả lời',
    en: 'Add Q&A',
    fr: 'Ajouter Q&R',
    es: 'Añadir preguntas y respuestas',
    th: 'เพิ่มคำถามและคำตอบ',
  },
  question: {
    vi: 'Câu hỏi',
    en: 'Question',
    fr: 'Question',
    es: 'Pregunta',
    th: 'คำถาม',
  },
  answer: {
    vi: 'Trả lời',
    en: 'Answer',
    fr: 'Réponse',
    es: 'Respuesta',
    th: 'คำตอบ',
  },
  productPricing: {
    vi: 'Giá sản phẩm',
    en: 'Product Pricing',
    fr: 'Prix des produits',
    es: 'Precios de productos',
    th: 'ราคาสินค้า',
  },
  productBenefits: {
    vi: 'Công dụng sản phẩm',
    en: 'Product Benefits',
    fr: 'Avantages du produit',
    es: 'Beneficios del producto',
    th: 'ประโยชน์ของสินค้า',
  },
  addItem: {
    vi: 'Thêm mục',
    en: 'Add item',
    fr: 'Ajouter un élément',
    es: 'Añadir elemento',
    th: 'เพิ่มรายการ',
  },
  delete: {
    vi: 'Xóa',
    en: 'Delete',
    fr: 'Supprimer',
    es: 'Eliminar',
    th: 'ลบ',
  }
};

interface QAPair {
  question: string;
  answer: string;
}

interface BrandKnowledgeSectionProps {
  onUpdate: (knowledge: {
    history: string;
    values: string;
    targetAudience: string;
    guidelines: string;
    qaPairs: QAPair[];
    productPricing: string;
    productBenefits: string;
  }) => void;
  data: {
    history: string;
    values: string;
    targetAudience: string;
    guidelines: string;
    qaPairs?: QAPair[];
    productPricing?: string;
    productBenefits?: string;
  };
}

export function BrandKnowledgeSection({ onUpdate, data }: BrandKnowledgeSectionProps) {
  const { currentLanguage } = useLanguage();
  
  // Ensure qaPairs, productPricing, and productBenefits have default values if not provided
  const normalizedData = {
    ...data,
    qaPairs: data.qaPairs || [],
    productPricing: data.productPricing || '',
    productBenefits: data.productBenefits || '',
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

  const handleQAChange = (index: number, field: keyof QAPair, value: string) => {
    const updatedQAPairs = [...normalizedData.qaPairs];
    updatedQAPairs[index] = { 
      ...updatedQAPairs[index], 
      [field]: value 
    };
    
    onUpdate({
      ...normalizedData,
      qaPairs: updatedQAPairs,
    });
  };

  const addQAPair = () => {
    onUpdate({
      ...normalizedData,
      qaPairs: [...normalizedData.qaPairs, { question: '', answer: '' }],
    });
  };

  const removeQAPair = (index: number) => {
    const updatedQAPairs = normalizedData.qaPairs.filter((_, i) => i !== index);
    
    onUpdate({
      ...normalizedData,
      qaPairs: updatedQAPairs,
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
            value={normalizedData.history}
            onChange={handleChange('history')}
            placeholder="Ví dụ: Thành lập năm 2020, chúng tôi bắt đầu với..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="values">{t('values')}</Label>
          <Textarea
            id="values"
            value={normalizedData.values}
            onChange={handleChange('values')}
            placeholder="Ví dụ: Chất lượng, Sáng tạo, Trách nhiệm..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience">{t('targetAudience')}</Label>
          <Textarea
            id="targetAudience"
            value={normalizedData.targetAudience}
            onChange={handleChange('targetAudience')}
            placeholder="Ví dụ: Người trẻ tuổi từ 18-35, quan tâm đến..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guidelines">{t('brandGuidelines')}</Label>
          <Textarea
            id="guidelines"
            value={normalizedData.guidelines}
            onChange={handleChange('guidelines')}
            placeholder="Ví dụ: Ngôn ngữ thương hiệu, hình ảnh..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-4 border-t pt-4">
          <Label className="text-md font-medium">{t('productPricing')}</Label>
          <Textarea
            id="productPricing"
            value={normalizedData.productPricing}
            onChange={handleChange('productPricing')}
            placeholder="Ví dụ: Sản phẩm A: 200.000đ, Sản phẩm B: 350.000đ..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-4 border-t pt-4">
          <Label className="text-md font-medium">{t('productBenefits')}</Label>
          <Textarea
            id="productBenefits"
            value={normalizedData.productBenefits}
            onChange={handleChange('productBenefits')}
            placeholder="Ví dụ: Sản phẩm A giúp làm sạch sâu, Sản phẩm B tăng cường sức đề kháng..."
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <Label className="text-md font-medium">{t('addQA')}</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addQAPair}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> {t('addItem')}
            </Button>
          </div>
          
          <div className="space-y-6">
            {normalizedData.qaPairs.map((qaPair, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-md bg-gray-50 dark:bg-gray-900/50 relative">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-destructive"
                  onClick={() => removeQAPair(index)}
                >
                  {t('delete')}
                </Button>
                
                <div className="space-y-2">
                  <Label htmlFor={`question-${index}`}>{t('question')}</Label>
                  <Textarea
                    id={`question-${index}`}
                    value={qaPair.question}
                    onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                    placeholder="Ví dụ: Sản phẩm có phù hợp cho da nhạy cảm không?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`answer-${index}`}>{t('answer')}</Label>
                  <Textarea
                    id={`answer-${index}`}
                    value={qaPair.answer}
                    onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                    placeholder="Ví dụ: Có, sản phẩm đã được kiểm nghiệm an toàn cho mọi loại da..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
