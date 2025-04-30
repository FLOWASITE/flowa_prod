
import React from 'react';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { User, Bot, MoreVertical, Copy, Forward, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Sao chép thành công');
  };
  
  return (
    <div
      className={cn(
        "flex gap-3 group animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 pt-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      )}
      
      <div className={cn("flex flex-col max-w-[85%] md:max-w-[75%] relative", isUser ? "items-end" : "items-start")}>
        <div 
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none shadow-md3-1" 
              : "bg-white dark:bg-gray-800 rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-md"
          )}
        >
          {message.content}
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px] text-gray-500">
            {format(message.timestamp, 'HH:mm')}
          </span>
          
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5"
              onClick={handleCopyMessage}
            >
              <Copy className="h-3 w-3" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-5 w-5"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isUser ? "end" : "start"} className="w-40">
                <DropdownMenuItem onClick={handleCopyMessage}>
                  <Copy className="h-3.5 w-3.5 mr-2" />
                  Sao chép
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="h-3.5 w-3.5 mr-2" />
                  Chuyển tiếp
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-3.5 w-3.5 mr-2" />
                  Chia sẻ
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 pt-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shadow-sm">
            <User className="h-4 w-4 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
}
