
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExampleRequestButtons } from './ExampleRequestButtons';
import { useIsMobile } from '@/hooks/use-mobile';
import { topicTranslations } from './topicTranslations';

interface TopicRequestFormContentProps {
  promptText: string;
  isSending: boolean;
  onPromptChange: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  productExamples: Array<{ id: string; name: string }>;
}

export function TopicRequestFormContent({
  promptText,
  isSending,
  onPromptChange,
  onSubmit,
  productExamples
}: TopicRequestFormContentProps) {
  const { currentLanguage } = useLanguage();
  const isMobile = useIsMobile();

  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return topicTranslations[key]?.[lang] || topicTranslations[key]?.['en'];
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="grid gap-4 md:gap-6">
        <div className="grid gap-2">
          <Textarea
            id="prompt"
            value={promptText}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder={getTranslation('placeholder')}
            className="min-h-[100px] md:min-h-[120px]"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label>{getTranslation('examplesLabel')}</Label>
          <ExampleRequestButtons
            productExamples={productExamples}
            onSelectExample={onPromptChange}
          />
        </div>
      </div>
      
      <div className="flex items-center pt-4 md:pt-6">
        <Button type="submit" className="w-full" disabled={!promptText || isSending}>
          {isSending ? (
            <span className="animate-pulse">{getTranslation('sending')}</span>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {getTranslation('submitButton')}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
