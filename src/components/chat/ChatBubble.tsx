
import React from 'react';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { User, Bot } from 'lucide-react';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        <div 
          className={cn(
            "rounded-lg px-4 py-2 text-sm",
            isUser 
              ? "bg-brand-blue text-white rounded-tr-none" 
              : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
          )}
        >
          {message.content}
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
