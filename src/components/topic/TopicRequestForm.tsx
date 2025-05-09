
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

export function TopicRequestForm({ setTopics }: { setTopics: (topics: any[]) => void }) {
  const [promptText, setPromptText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { currentLanguage } = useLanguage();

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


    return response.topics.map((topic, index) => ({
      id: (index + 1).toString(),
      brandId: topic.brand_id || '1',
      themeTypeId: topic.category || 'product_highlight',
      productTypeId: topic.product_id ? '2' : undefined,
      title: topic.title,
      description: topic.target_audience,
      status: topic.status,
      createdBy: 'ai',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const requestData = {
      product_id: '66666666-6666-6666-6666-666666666666',
      brand_id: '44444444-4444-4444-4444-444444444444',
      prompt: promptText,
      count: 5,
      use_previous_topics: true,
      max_previous_topics: 5,
    };
    try {
      const response = await generateTopics(requestData);
      setTopics(transformTopicsData(response));
      setPromptText('');
    } catch (error) {
      console.error('Lỗi khi gửi API:', error);
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
        <TopicRequestFormContent
          promptText={promptText}
          isSending={isSending}
          onPromptChange={handlePromptChange}
          onSubmit={handleSubmit}
          productExamples={productExamples}
        />
      </CardContent>
    </Card>
  );
}
