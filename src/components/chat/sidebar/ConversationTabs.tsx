
import React from 'react';
import { MessagesSquare, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatConversation } from '@/types';
import { ConversationsList } from './ConversationsList';

interface ConversationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredConversations: ChatConversation[];
}

export function ConversationTabs({ activeTab, setActiveTab, filteredConversations }: ConversationTabsProps) {
  return (
    <Tabs 
      defaultValue="active" 
      className="flex-1 flex flex-col min-h-0"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="w-full sticky top-[108px] z-10 rounded-none bg-white dark:bg-gray-950 border-b">
        <TabsTrigger value="active" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          <MessagesSquare className="mr-2 h-4 w-4" />
          Đang hoạt động
        </TabsTrigger>
        <TabsTrigger value="all" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
          <Users className="mr-2 h-4 w-4" />
          Tất cả
        </TabsTrigger>
      </TabsList>
      
      <div className="flex-1 overflow-y-auto">
        <TabsContent value="active" className="m-0 h-full">
          <ConversationsList conversations={filteredConversations} />
        </TabsContent>
        
        <TabsContent value="all" className="m-0 h-full">
          <ConversationsList conversations={filteredConversations} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
