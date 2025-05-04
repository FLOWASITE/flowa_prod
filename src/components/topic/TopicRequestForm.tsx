
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockProductTypes } from '@/data/mock/products';
import { topicTranslations } from './topicTranslations';
import { TopicRequestFormContent } from './TopicRequestFormContent';

export function TopicRequestForm() {
  const [promptText, setPromptText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { currentLanguage } = useLanguage();
  
  // Get first 3 product names from mockProductTypes for example buttons
  const productExamples = mockProductTypes.slice(0, 3);
  
  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return topicTranslations[key][lang] || topicTranslations[key]['en'];
  };
  
  const handlePromptChange = (text: string) => {
    setPromptText(text);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      console.log('Sending request:', {
        prompt: promptText
      });
      setIsSending(false);
      setPromptText("");
    }, 2000);
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
          translations={topicTranslations}
        />
      </CardContent>
    </Card>
  );
}
