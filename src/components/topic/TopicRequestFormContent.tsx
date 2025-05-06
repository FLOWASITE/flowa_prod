
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Chatbot Area - 2/3 width on desktop */}
        <div className="md:col-span-2 grid gap-2">
          <Textarea
            id="prompt"
            value={promptText}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder={getTranslation('placeholder')}
            className="min-h-[150px] md:min-h-[200px] resize-none bg-white focus-visible:ring-primary/40 focus-visible:ring-offset-primary/10 transition-all"
            required
          />
          
          <div className="flex items-center justify-end pt-2">
            <Button 
              type="submit" 
              className="w-full md:w-auto hover:shadow-lg transition-all" 
              disabled={!promptText || isSending}
            >
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
        </div>
        
        {/* Suggestions Area - 1/3 width on desktop */}
        <div className="md:col-span-1 grid gap-4 bg-surface-container-default p-4 rounded-md shadow-sm border border-gray-100">
          <div>
            <h3 className="text-sm font-medium mb-2 text-secondary">{getTranslation('examplesLabel')}</h3>
            <div className="grid gap-2">
              <ExampleRequestButtons
                productExamples={productExamples}
                onSelectExample={onPromptChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
