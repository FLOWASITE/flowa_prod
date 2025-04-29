
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatBubble } from './ChatBubble';
import { ChatMessage } from '@/types';
import { Send, PaperclipIcon, Smile, Bot, Sparkles } from 'lucide-react';
import { mockChatMessages } from '@/data/mockData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    try {
      // Lưu thông tin khách hàng và tin nhắn vào CRM
      const customerId = 'user-123'; // Thông thường sẽ lấy từ thông tin đăng nhập của khách
      const platform = 'messenger'; // Có thể lấy từ nguồn tin nhắn
      
      // Kiểm tra xem khách hàng đã tồn tại chưa
      const { data: existingContacts } = await api.supabase
        .from('crm_contacts')
        .select('id')
        .eq('customer_id', customerId)
        .limit(1);
        
      let contactId;
      
      if (existingContacts && existingContacts.length > 0) {
        // Cập nhật thời gian liên hệ nếu khách hàng đã tồn tại
        contactId = existingContacts[0].id;
        await api.supabase
          .from('crm_contacts')
          .update({ 
            last_contact: new Date().toISOString(),
            updated_at: new Date().toISOString() 
          })
          .eq('id', contactId);
      } else {
        // Tạo khách hàng mới nếu chưa tồn tại
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
      
      // Lưu tin nhắn vào lịch sử tương tác
      await api.supabase
        .from('crm_interactions')
        .insert({
          contact_id: contactId,
          message: newMessage,
          direction: 'incoming',
          platform: platform
        });
        
      // Simulate assistant reply
      setTimeout(async () => {
        const replyContent = "Cảm ơn bạn đã liên hệ. Tôi là trợ lý AI hỗ trợ bạn về thông tin sản phẩm và dịch vụ. Tôi có thể giúp gì cho bạn hôm nay?";
        
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Lưu tin nhắn phản hồi vào CRM
        await api.supabase
          .from('crm_interactions')
          .insert({
            contact_id: contactId,
            message: replyContent,
            direction: 'outgoing',
            platform: platform
          });
      }, 1000);
    } catch (error) {
      console.error('Error saving to CRM:', error);
      // Không hiển thị lỗi cho người dùng, chỉ lưu log để debug
    }
  };

  const aiResponseTemplates = [
    { id: 1, title: "Chào hỏi", content: "Xin chào! Tôi là trợ lý AI của [Thương hiệu]. Tôi có thể giúp gì cho bạn?" },
    { id: 2, title: "Thông tin sản phẩm", content: "Sản phẩm của chúng tôi có các đặc điểm sau: [chi tiết sản phẩm]. Bạn có muốn biết thêm về sản phẩm nào cụ thể không?" },
    { id: 3, title: "Giá cả & khuyến mãi", content: "Hiện tại chúng tôi có chương trình khuyến mãi giảm 20% cho tất cả sản phẩm mới. Bạn có thể tham khảo thêm tại website chính thức của chúng tôi." },
    { id: 4, title: "Hỗ trợ kỹ thuật", content: "Để khắc phục vấn đề, trước tiên bạn hãy thử khởi động lại thiết bị. Nếu vấn đề vẫn tồn tại, vui lòng cung cấp thêm thông tin về lỗi bạn gặp phải." }
  ];
  
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {messages.map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="bg-white dark:bg-gray-950 p-4 border-t">
        {showAIOptions && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Mẫu câu trả lời AI</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {aiResponseTemplates.map(template => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto py-2 px-3"
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
        
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
            onClick={() => setShowAIOptions(!showAIOptions)}
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </Button>
          
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          
          <Input
            placeholder="Nhập tin nhắn của bạn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button 
            type="submit" 
            size="icon"
            disabled={!newMessage.trim()}
            className="flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
