
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { mockChatConversations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Users, 
  MessagesSquare, 
  Settings, 
  Search, 
  MessageCircle 
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Chat = () => {
  const activeConversations = mockChatConversations.filter(
    conversation => conversation.status === 'active'
  );
  
  const platformIcon = (platform: string) => {
    switch (platform) {
      case 'messenger':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Messenger</Badge>;
      case 'zalo':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Zalo</Badge>;
      case 'linkedin':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">LinkedIn</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Customer Chat</h1>
        <p className="text-muted-foreground">Manage conversations across all platforms</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <div className="border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-white dark:bg-gray-950 flex items-center justify-between">
            <h3 className="font-semibold">Conversations</h3>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 border-b bg-white dark:bg-gray-950">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="w-full pl-8"
              />
            </div>
          </div>
          
          <Tabs defaultValue="active" className="h-[calc(100%-117px)]">
            <TabsList className="w-full">
              <TabsTrigger value="active" className="flex-1">
                <MessagesSquare className="mr-2 h-4 w-4" />
                Active
              </TabsTrigger>
              <TabsTrigger value="all" className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                All
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="h-[calc(100%-41px)] overflow-y-auto">
              <div className="divide-y">
                {activeConversations.map(conversation => (
                  <div 
                    key={conversation.id} 
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{conversation.customerName}</div>
                      <div className="text-xs text-muted-foreground">2m ago</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {conversation.messages[conversation.messages.length - 1]?.content || "No messages"}
                    </div>
                    <div className="flex items-center justify-between">
                      {platformIcon(conversation.platform)}
                      {conversation.status === 'active' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
                
                {activeConversations.length === 0 && (
                  <div className="p-8 text-center">
                    <MessageCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No active conversations</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="h-[calc(100%-41px)] overflow-y-auto">
              <div className="divide-y">
                {mockChatConversations.map(conversation => (
                  <div 
                    key={conversation.id} 
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{conversation.customerName}</div>
                      <div className="text-xs text-muted-foreground">2m ago</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 line-clamp-1">
                      {conversation.messages[conversation.messages.length - 1]?.content || "No messages"}
                    </div>
                    <div className="flex items-center justify-between">
                      {platformIcon(conversation.platform)}
                      {conversation.status === 'active' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-2">
          <ChatWindow />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
