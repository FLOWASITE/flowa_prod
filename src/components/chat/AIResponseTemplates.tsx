
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface AIResponseTemplate {
  id: number;
  title: string;
  content: string;
}

interface AIResponseTemplatesProps {
  templates: AIResponseTemplate[];
  onSelectTemplate: (content: string) => void;
  onClose: () => void;
}

export function AIResponseTemplates({ 
  templates, 
  onSelectTemplate, 
  onClose 
}: AIResponseTemplatesProps) {
  return (
    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border shadow-inner animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-medium">Mẫu câu trả lời AI</h4>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0" 
          onClick={onClose}
        >
          ✕
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {templates.map(template => (
          <Button
            key={template.id}
            variant="outline"
            size="sm"
            className="justify-start h-auto py-2 px-3 hover:bg-primary/5"
            onClick={() => onSelectTemplate(template.content)}
          >
            <div className="text-left">
              <div className="font-medium text-xs">{template.title}</div>
              <div className="text-xs text-gray-500 truncate">{template.content.substring(0, 40)}...</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
