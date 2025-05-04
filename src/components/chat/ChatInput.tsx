
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, PaperclipIcon, Smile, Sparkles } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Image } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  showAIOptions: boolean;
  setShowAIOptions: (show: boolean) => void;
}

export function ChatInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyDown,
  showAIOptions,
  setShowAIOptions
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-1">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="flex-shrink-0 text-primary hover:text-primary/80 hover:bg-primary/5"
          onClick={() => setShowAIOptions(!showAIOptions)}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            ref={inputRef}
            placeholder="Nhập tin nhắn của bạn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] max-h-[180px] bg-transparent border-none focus-visible:ring-0 resize-none flex-1 py-2 placeholder:text-muted-foreground/60"
            rows={1}
          />
        </div>
        
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              >
                <PaperclipIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Image className="h-4 w-4 mr-2" />
                Gửi hình ảnh
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PaperclipIcon className="h-4 w-4 mr-2" />
                Đính kèm tệp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0 text-muted-foreground hover:text-foreground"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button 
            type="submit" 
            size="sm"
            className="flex-shrink-0 rounded-full"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Gửi</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
