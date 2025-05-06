
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

export function TopicRequestForm() {
  const [promptText, setPromptText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { currentLanguage } = useLanguage();
  
  // Get first 3 product names from mockProductTypes for example buttons
  const productExamples = mockProductTypes;
  
  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return topicTranslations[key]?.[lang] || topicTranslations[key]?.['en'];
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
    <Card className="border-2 border-primary/10 shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-4">
        <CardTitle className="text-primary">{getTranslation('cardTitle')}</CardTitle>
        <CardDescription>
          {getTranslation('cardDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
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
