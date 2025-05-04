
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ChatConversation } from '@/types';
import { platformIcons } from '../PlatformIcons';

interface ConversationItemProps {
  conversation: ChatConversation;
}

export function ConversationItem({ conversation }: ConversationItemProps) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  
  return (
    <div 
      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium">{conversation.customerName}</div>
        <div className="text-xs text-muted-foreground">2m trước</div>
      </div>
      <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
        {lastMessage?.content || "Không có tin nhắn"}
      </div>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-gray-100 border-gray-200 flex items-center gap-1 text-xs">
          {platformIcons[conversation.platform]}
          <span>
            {conversation.platform === 'messenger' ? 'Messenger' : 
            conversation.platform === 'zalo' ? 'Zalo' : 'LinkedIn'}
          </span>
        </Badge>
        {conversation.status === 'active' && (
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
}
