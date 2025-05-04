
import { useState } from 'react';
import { ChatMessage } from '@/types';
import { api } from '@/integrations/supabase/client';

export function useChatActions(initialMessages: ChatMessage[]) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("chat");
  
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
      
      // Lưu thông tin khách hàng và tin nhắn vào CRM
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
  
  return {
    messages,
    newMessage,
    showAIOptions,
    isTyping,
    activeTab,
    setNewMessage,
    setShowAIOptions,
    setActiveTab,
    handleSendMessage,
    handleKeyDown
  };
}
