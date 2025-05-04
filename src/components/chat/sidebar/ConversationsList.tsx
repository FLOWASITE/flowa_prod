
import React from 'react';
import { MessagesSquare } from 'lucide-react';
import { ChatConversation } from '@/types';
import { ConversationItem } from './ConversationItem';

interface ConversationsListProps {
  conversations: ChatConversation[];
}

export function ConversationsList({ conversations }: ConversationsListProps) {
  return (
    <div className="divide-y">
      {conversations.length > 0 ? (
        conversations.map(conversation => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))
      ) : (
        <div className="p-8 text-center">
          <MessagesSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Không có hội thoại nào</p>
        </div>
      )}
    </div>
  );
}
