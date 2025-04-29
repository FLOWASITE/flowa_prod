
import React, { useState } from 'react';
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
  MessageCircle,
  BarChart3,
  Zap,
  RefreshCcw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlatformIntegration } from '@/components/chat/PlatformIntegration';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { platformIcons } from '@/components/chat/PlatformIcons';

const Chat = () => {
  const [activeConversations, setActiveConversations] = useState(
    mockChatConversations.filter(conversation => conversation.status === 'active')
  );
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = activeConversations.filter(conversation => {
    const matchesPlatform = selectedPlatform === 'all' || conversation.platform === selectedPlatform;
    const matchesSearch = conversation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.messages[conversation.messages.length - 1]?.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Chatbot AI</h1>
          <p className="text-muted-foreground">Quản lý trò chuyện trên nhiều nền tảng</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Thống kê
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Kết nối mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Kết nối nền tảng trò chuyện</DialogTitle>
              </DialogHeader>
              <PlatformIntegration />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
        <div className="lg:col-span-1">
          <ChatSidebar />
        </div>
        
        <div className="lg:col-span-3 border rounded-lg overflow-hidden flex flex-col">
          <div className="bg-white dark:bg-gray-950 p-4 border-b flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Hỗ trợ khách hàng</h3>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {platformIcons['messenger']}
                  <span className="ml-1">Messenger</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Nguyễn Văn A - Online 2 phút trước</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Chỉnh sửa hội thoại</DropdownMenuItem>
                  <DropdownMenuItem>Gán cho nhân viên</DropdownMenuItem>
                  <DropdownMenuItem>Đánh dấu đã đọc</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Kết thúc hội thoại</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <ChatWindow />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
