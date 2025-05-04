
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickRepliesProps {
  replies: string[];
  onSelectReply: (reply: string) => void;
}

export function QuickReplies({ replies, onSelectReply }: QuickRepliesProps) {
  return (
    <div className="flex gap-2 mb-3 overflow-x-auto pb-2 custom-scrollbar">
      {replies.map((reply, index) => (
        <Button 
          key={index}
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap text-xs bg-gray-50 hover:bg-gray-100"
          onClick={() => onSelectReply(reply)}
        >
          {reply}
        </Button>
      ))}
    </div>
  );
}
