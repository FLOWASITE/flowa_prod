
import React from 'react';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { User, Bot, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "flex gap-3 mb-4 group",
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
      
      <div className={cn("flex flex-col max-w-[75%] relative", isUser ? "items-end" : "items-start")}>
        <div 
          className={cn(
            "rounded-lg px-4 py-2 text-sm",
            isUser 
              ? "bg-primary text-white rounded-tr-none" 
              : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
          )}
        >
          {message.content}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">
            {format(message.timestamp, 'HH:mm')}
          </span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isUser ? "end" : "start"}>
              <DropdownMenuItem>Copy</DropdownMenuItem>
              <DropdownMenuItem>Forwarded</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
