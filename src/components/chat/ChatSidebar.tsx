
import React, { useState } from 'react';
import { mockChatConversations } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MessagesSquare, Users, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { platformIcons } from './PlatformIcons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const platforms = [
    { id: 'all', name: 'Tất cả' },
    { id: 'messenger', name: 'Messenger' },
    { id: 'zalo', name: 'Zalo' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'website', name: 'Website' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b bg-white dark:bg-gray-950 flex items-center justify-between sticky top-0 z-10">
        <h3 className="font-semibold">Hội thoại</h3>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {platforms.map(platform => (
                <DropdownMenuCheckboxItem
                  key={platform.id}
                  checked={selectedPlatform === platform.id}
                  onCheckedChange={() => setSelectedPlatform(platform.id)}
                >
                  {platform.id !== 'all' && platformIcons[platform.id]}
                  <span className="ml-2">{platform.name}</span>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b bg-white dark:bg-gray-950 sticky top-16 z-10">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Tìm kiếm hội thoại..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
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
            <div className="divide-y">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => (
                  <div 
                    key={conversation.id} 
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{conversation.customerName}</div>
                      <div className="text-xs text-muted-foreground">2m trước</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {conversation.messages[conversation.messages.length - 1]?.content || "Không có tin nhắn"}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-gray-100 border-gray-200 flex items-center gap-1 text-xs">
                        {platformIcons[conversation.platform]}
                        <span>{conversation.platform === 'messenger' ? 'Messenger' : 
                               conversation.platform === 'zalo' ? 'Zalo' : 'LinkedIn'}</span>
                      </Badge>
                      {conversation.status === 'active' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <MessagesSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Không có hội thoại nào</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="m-0 h-full">
            <div className="divide-y">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => (
                  <div 
                    key={conversation.id} 
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{conversation.customerName}</div>
                      <div className="text-xs text-muted-foreground">2m trước</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {conversation.messages[conversation.messages.length - 1]?.content || "Không có tin nhắn"}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-gray-100 border-gray-200 flex items-center gap-1 text-xs">
                        {platformIcons[conversation.platform]}
                        <span>{conversation.platform === 'messenger' ? 'Messenger' : 
                               conversation.platform === 'zalo' ? 'Zalo' : 'LinkedIn'}</span>
                      </Badge>
                      {conversation.status === 'active' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <MessagesSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Không có hội thoại nào</p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
