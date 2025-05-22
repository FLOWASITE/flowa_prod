import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockProductTypes } from '@/data/mock/products';
import { topicTranslations } from './topicTranslations';
import { TopicRequestFormContent } from './TopicRequestFormContent';
import { generateTopics } from '@/service/topicService';
import { ProductBrandSelector } from './ProductBrandSelector';
import { Brand } from '@/services/brandService';
import { Product } from '@/services/productService';
import { useTopicsPage } from '@/hooks/useTopicsPage';
import { toast } from 'sonner';
import { Topic } from '@/types/content';

// Sử dụng kiểu dữ liệu Topic từ @/types/content

interface TopicRequestFormProps {
  setTopics: (topics: Topic[]) => void;
  fetchTopics?: () => Promise<void>;
}

export function TopicRequestForm({ setTopics, fetchTopics }: TopicRequestFormProps) {
  const [promptText, setPromptText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const { currentLanguage } = useLanguage();
  const { createTopic } = useTopicsPage();

  // Get first 3 product names from mockProductTypes for example buttons
  const productExamples = mockProductTypes.slice(0, 3);

  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return topicTranslations[key]?.[lang] || topicTranslations[key]?.['en'];
  };

  const handlePromptChange = (text: string) => {
    setPromptText(text);
  };

  function transformTopicsData(response) {
    return response.topics.map((topic) => {
      // Đảm bảo trường status có giá trị phù hợp với kiểu dữ liệu Topic
      let status: 'draft' | 'approved' | 'rejected' = 'draft';
      
      // Nếu topic.status có giá trị và là một trong các giá trị hợp lệ, sử dụng nó
      if (topic.status && ['draft', 'approved', 'rejected'].includes(topic.status)) {
        status = topic.status as 'draft' | 'approved' | 'rejected';
      }
      
      // Use the ID from the backend response instead of generating a new one
      // This ensures we're working with the same IDs that are stored in the database
      return {
        id: topic.id, // Use the ID from the backend
        brandId: topic.brand_id || '1',
        themeTypeId: topic.category || 'product_highlight',
        productTypeId: topic.product_id ? topic.product_id : undefined,
        title: topic.title,
        description: topic.description || topic.target_audience,
        status: topic.status || status, // Use backend status if available
        createdBy: 'ai',
        createdAt: topic.created_at ? new Date(topic.created_at) : new Date(),
        updatedAt: topic.updated_at ? new Date(topic.updated_at) : new Date()
      };
    });
  }
  
  // Helper function to generate a valid UUID v4
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  const handleBrandChange = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBrand) {
      toast.error(getTranslation('selectBrandRequired'));
      return;
    }
    
    if (!promptText.trim()) {
      toast.error(getTranslation('promptRequired'));
      return;
    }
    
    setIsSending(true);

    const requestData = {
      brand_id: selectedBrand,
      prompt: promptText,
      count: 5,
      use_previous_topics: true,
      max_previous_topics: 5,
    };
    
    // Chỉ thêm product_id nếu đã chọn product
    if (selectedProduct) {
      requestData['product_id'] = selectedProduct;
    }
    
    try {
      // 1. Tạo chủ đề thông qua RAG service
      const response = await generateTopics(requestData);
      
      // Lưu ý: response.topics đã được lưu vào database bởi backend
      // Nên chúng ta chỉ cần chuyển đổi định dạng để hiển thị
      const generatedTopics = transformTopicsData(response).map(t => ({ ...t, status: 'draft' }));
      
      // 2. Hiển thị chủ đề đã tạo trong giao diện
      setTopics(generatedTopics);
      
      // 3. Xóa nội dung prompt
      setPromptText('');
      
      toast.success(getTranslation('topicsCreated'));
      
      // 4. Refresh topics from database to ensure we have the latest data
      if (fetchTopics) {
        await fetchTopics();
      }
    } catch (error) {
      console.error('Lỗi khi gửi API:', error);
      toast.error(getTranslation('apiError'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTranslation('cardTitle')}</CardTitle>
        <CardDescription>
          {getTranslation('cardDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Thêm ProductBrandSelector */}
          <div className="mb-4">
            <ProductBrandSelector
              onBrandChange={handleBrandChange}
              onProductChange={handleProductChange}
              selectedBrandId={selectedBrand}
              selectedProductId={selectedProduct}
            />
          </div>
          
          <TopicRequestFormContent
            promptText={promptText}
            isSending={isSending}
            onPromptChange={handlePromptChange}
            onSubmit={handleSubmit}
            productExamples={productExamples}
          />
        </div>
      </CardContent>
    </Card>
  );
}
