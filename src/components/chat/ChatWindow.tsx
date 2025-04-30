import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChatBubble } from './ChatBubble';
import { ChatMessage } from '@/types';
import { Send, PaperclipIcon, Smile, Bot, Sparkles, Mic, Image, ThumbsUp, MessageCircle } from 'lucide-react';
import { mockChatMessages } from '@/data/mockData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { api } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Focus back on the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    try {
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate assistant reply with delay
      setTimeout(async () => {
        setIsTyping(false);
        
        const replyContent = "Cảm ơn bạn đã liên hệ. Tôi là trợ lý AI hỗ trợ bạn về thông tin sản phẩm và dịch vụ. Tôi có thể giúp gì cho bạn hôm nay?";
        
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }, 1500);
      
      // Lưu thông tin khách hàng và tin nhắn vào CRM (keeping existing functionality)
      const customerId = 'user-123'; 
      const platform = 'messenger';
      
      const { data: existingContacts } = await api.supabase
        .from('crm_contacts')
        .select('id')
        .eq('customer_id', customerId)
        .limit(1);
        
      let contactId;
      
      if (existingContacts && existingContacts.length > 0) {
        contactId = existingContacts[0].id;
        await api.supabase
          .from('crm_contacts')
          .update({ 
            last_contact: new Date().toISOString(),
            updated_at: new Date().toISOString() 
          })
          .eq('id', contactId);
      } else {
        const { data: newContact, error } = await api.supabase
          .from('crm_contacts')
          .insert({
            customer_id: customerId,
            platform: platform,
            first_contact: new Date().toISOString(),
            last_contact: new Date().toISOString(),
            status: 'new'
          })
          .select();
          
        if (error) throw error;
        
        contactId = newContact[0].id;
      }
      
      await api.supabase
        .from('crm_interactions')
        .insert({
          contact_id: contactId,
          message: newMessage,
          direction: 'incoming',
          platform: platform
        });
        
      // Simulate storing assistant response
      setTimeout(async () => {
        const replyContent = "Cảm ơn bạn đã liên hệ. Tôi là trợ lý AI hỗ trợ bạn về thông tin sản phẩm và dịch vụ. Tôi có thể giúp gì cho bạn hôm nay?";
        
        await api.supabase
          .from('crm_interactions')
          .insert({
            contact_id: contactId,
            message: replyContent,
            direction: 'outgoing',
            platform: platform
          });
      }, 1500);
      
    } catch (error) {
      console.error('Error saving to CRM:', error);
    }
  };

  // Allow sending with Enter key (unless Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const aiResponseTemplates = [
    { id: 1, title: "Chào hỏi", content: "Xin chào! Tôi là trợ lý AI của [Thương hiệu]. Tôi có thể giúp gì cho bạn?" },
    { id: 2, title: "Thông tin sản phẩm", content: "Sản phẩm của chúng tôi có các đặc điểm sau: [chi tiết sản phẩm]. Bạn có muốn biết thêm về sản phẩm nào cụ thể không?" },
    { id: 3, title: "Giá cả & khuyến mãi", content: "Hiện tại chúng tôi có chương trình khuyến mãi giảm 20% cho tất cả sản phẩm mới. Bạn có thể tham khảo thêm tại website chính thức của chúng tôi." },
    { id: 4, title: "Hỗ trợ kỹ thuật", content: "Để khắc phục vấn đề, trước tiên bạn hãy thử khởi động lại thiết bị. Nếu vấn đề vẫn tồn tại, vui lòng cung cấp thêm thông tin về lỗi bạn gặp phải." }
  ];

  const quickReplies = [
    "Cảm ơn bạn!",
    "Tôi cần thêm thông tin",
    "Làm thế nào để tôi đặt hàng?",
    "Gặp tư vấn viên"
  ];
  
  return (
    <div className="flex flex-col flex-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <div className="hidden md:block border-b bg-gray-50/50 dark:bg-gray-900/50">
          <TabsList className="h-12 w-full justify-start rounded-none bg-transparent border-b px-4">
            <TabsTrigger value="chat" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              <MessageCircle className="h-4 w-4 mr-2" />
              Trò chuyện
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-t-lg rounded-b-none border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
              <Bot className="h-4 w-4 mr-2" />
              Ghi chú AI
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="flex-1 overflow-y-auto p-4 bg-gray-50/30 dark:bg-gray-900/30 flex flex-col gap-3 m-0">
          {messages.map(message => (
            <ChatBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 pl-12 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </TabsContent>
        
        <TabsContent value="notes" className="flex-1 overflow-y-auto p-4 bg-gray-50/30 dark:bg-gray-900/30 m-0">
          <div className="flex flex-col gap-4">
            <Card className="p-4 shadow-md3-1">
              <h3 className="font-medium text-lg mb-2">Ghi chú về khách hàng</h3>
              <p className="text-muted-foreground">Khách hàng đã hỏi về các sản phẩm mới và giá cả. Đã cung cấp thông tin về chương trình khuyến mãi giảm 20%.</p>
            </Card>
            <Card className="p-4 shadow-md3-1">
              <h3 className="font-medium text-lg mb-2">Điểm chính của cuộc hội thoại</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Khách hàng quan tâm đến sản phẩm X</li>
                <li>Đã hỏi về chính sách bảo hành</li>
                <li>Muốn biết thêm về cách thanh toán</li>
              </ul>
            </Card>
          </div>
        </TabsContent>
      
        <div className="bg-white dark:bg-gray-950 p-4 border-t">
          {showAIOptions && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border shadow-inner animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-medium">Mẫu câu trả lời AI</h4>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => setShowAIOptions(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {aiResponseTemplates.map(template => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2 px-3 hover:bg-primary/5"
                    onClick={() => setNewMessage(template.content)}
                  >
                    <div className="text-left">
                      <div className="font-medium text-xs">{template.title}</div>
                      <div className="text-xs text-gray-500 truncate">{template.content.substring(0, 40)}...</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quick reply buttons */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 custom-scrollbar">
            {quickReplies.map((reply, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap text-xs bg-gray-50 hover:bg-gray-100"
                onClick={() => setNewMessage(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
          
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
        </div>
      </Tabs>
    </div>
  );
}
