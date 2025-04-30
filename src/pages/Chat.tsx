
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { mockChatConversations } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessagesSquare, 
  Settings, 
  Search, 
  Zap, 
  BarChart3,
  RefreshCcw,
  Pin,
  ArrowUpDown,
  PanelLeftOpen,
  PanelRightOpen
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
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Chat = () => {
  const [activeConversations, setActiveConversations] = useState(
    mockChatConversations.filter(conversation => conversation.status === 'active')
  );
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [integrationDialogOpen, setIntegrationDialogOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const filteredConversations = activeConversations.filter(conversation => {
    const matchesPlatform = selectedPlatform === 'all' || conversation.platform === selectedPlatform;
    const matchesSearch = conversation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.messages[conversation.messages.length - 1]?.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-r from-primary-container/50 to-secondary-container/30 rounded-lg p-6 mb-6 shadow-md3-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Chatbot AI</h1>
            <p className="text-muted-foreground">Quản lý trò chuyện trên nhiều nền tảng</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Thống kê
            </Button>
            
            <Dialog open={integrationDialogOpen} onOpenChange={setIntegrationDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="shadow-md3-1" onClick={() => setIntegrationDialogOpen(true)}>
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
      </div>
      
      <Card className="rounded-xl border shadow-md3-1 overflow-hidden h-[calc(100vh-220px)]">
        <div className="grid grid-cols-1 h-full">
          <div className="flex h-full overflow-hidden">
            {/* Fixed sidebar with its own scrollable content */}
            {showSidebar && (
              <div className="w-full md:w-80 flex-shrink-0 border-r bg-gray-50/70 dark:bg-gray-900/70 backdrop-blur-sm h-full">
                <div className="h-full flex flex-col">
                  <ChatSidebar />
                </div>
              </div>
            )}
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-white dark:bg-gray-950 p-4 border-b flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  {/* Toggle sidebar button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden mr-1"
                    onClick={() => setShowSidebar(!showSidebar)}
                  >
                    {showSidebar ? <PanelLeftOpen className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                  </Button>
                
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Nguyễn Văn A</h3>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        {platformIcons['messenger']}
                        <span className="ml-1">Messenger</span>
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Đang hoạt động
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Online 2 phút trước</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pin className="h-4 w-4" />
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
              
              <div className="flex-1 overflow-y-auto">
                <ChatWindow />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Chat;
