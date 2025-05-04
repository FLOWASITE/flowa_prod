
import React, { useState } from 'react';
import { mockChatConversations } from '@/data/mock/chat';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SearchInput } from './sidebar/SearchInput';
import { ConversationTabs } from './sidebar/ConversationTabs';

export function ChatSidebar() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const conversations = activeTab === 'active'
    ? mockChatConversations.filter(c => c.status === 'active')
    : mockChatConversations;
  
  const filteredConversations = conversations.filter(conversation => {
    const matchesPlatform = selectedPlatform === 'all' || conversation.platform === selectedPlatform;
    const matchesSearch = conversation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.messages[conversation.messages.length - 1]?.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <SidebarHeader 
        selectedPlatform={selectedPlatform} 
        setSelectedPlatform={setSelectedPlatform}
      />
      
      <SearchInput 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <ConversationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredConversations={filteredConversations}
      />
    </div>
  );
}
