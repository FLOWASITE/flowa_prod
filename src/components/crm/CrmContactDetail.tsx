
import React, { useState } from 'react';
import { CrmContact, CrmInteraction } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  Send,
  ArrowUpRight,
  Pencil,
  Loader2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { platformIcons } from '@/components/chat/PlatformIcons';
import { api } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { CrmEditContactDialog } from '@/components/crm/CrmEditContactDialog';

interface CrmContactDetailProps {
  contact: CrmContact;
  onUpdate: () => void;
}

export function CrmContactDetail({ contact, onUpdate }: CrmContactDetailProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Fetch interactions for this contact
  const { data: interactions, isLoading, refetch } = useQuery({
    queryKey: ['crmInteractions', contact.id],
    queryFn: async () => {
      try {
        const { data, error } = await api.supabase
          .from('crm_interactions')
          .select('*')
          .eq('contact_id', contact.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Convert to our CrmInteraction type
        return data.map((item) => ({
          id: item.id,
          contactId: item.contact_id,
          message: item.message,
          direction: item.direction as 'incoming' | 'outgoing',
          platform: item.platform,
          createdAt: new Date(item.created_at)
        })) as CrmInteraction[];
      } catch (error) {
        console.error('Error fetching interactions:', error);
        toast.error('Không thể tải lịch sử tương tác');
        return [];
      }
    }
  });
  
  // Handle status change
  const handleStatusChange = async (status: string) => {
    try {
      const { error } = await api.supabase
        .from('crm_contacts')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', contact.id);
        
      if (error) throw error;
      
      toast.success('Cập nhật trạng thái thành công');
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Không thể cập nhật trạng thái');
    }
  };
  
  // Handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Add message to interactions
      const { error } = await api.supabase
        .from('crm_interactions')
        .insert({
          contact_id: contact.id,
          message: newMessage,
          direction: 'outgoing',
          platform: contact.platform
        });
        
      if (error) throw error;
      
      // Update last contact time
      await api.supabase
        .from('crm_contacts')
        .update({ 
          last_contact: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', contact.id);
        
      setNewMessage('');
      toast.success('Đã gửi tin nhắn');
      refetch();
      onUpdate();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Không thể gửi tin nhắn');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header with contact info */}
      <div className="p-4 border-b flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">
              {contact.name || 'Khách hàng chưa xác định'}
            </h3>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              {platformIcons[contact.platform as keyof typeof platformIcons]}
              <span className="ml-1">{contact.platform}</span>
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">ID: {contact.customerId || 'N/A'}</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="flex flex-col flex-1">
        <TabsList className="px-4 pt-2">
          <TabsTrigger value="info">Thông tin</TabsTrigger>
          <TabsTrigger value="history">Lịch sử tương tác</TabsTrigger>
          <TabsTrigger value="notes">Ghi chú</TabsTrigger>
        </TabsList>
        
        {/* Info tab */}
        <TabsContent value="info" className="flex-1 p-4 overflow-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <User className="h-4 w-4" /> 
                Thông tin liên hệ
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Họ tên:</span>
                  <p>{contact.name || 'Chưa có thông tin'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p>{contact.email || 'Chưa có thông tin'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Số điện thoại:</span>
                  <p>{contact.phone || 'Chưa có thông tin'}</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Thời gian
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Liên hệ đầu tiên:</span>
                  <p>{format(contact.firstContact, 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Liên hệ gần nhất:</span>
                  <p>{format(contact.lastContact, 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 sm:col-span-2">
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                Trạng thái
              </h4>
              <Select defaultValue={contact.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Mới</SelectItem>
                  <SelectItem value="contacted">Đã liên hệ</SelectItem>
                  <SelectItem value="qualified">Tiềm năng</SelectItem>
                  <SelectItem value="converted">Đã chuyển đổi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        
        {/* History tab */}
        <TabsContent value="history" className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-muted-foreground">Đang tải lịch sử tương tác...</p>
              </div>
            ) : interactions && interactions.length > 0 ? (
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div 
                    key={interaction.id}
                    className={`flex ${
                      interaction.direction === 'incoming' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        interaction.direction === 'incoming' 
                          ? 'bg-gray-100 dark:bg-gray-800' 
                          : 'bg-primary text-white'
                      }`}
                    >
                      <div className="text-sm">{interaction.message}</div>
                      <div className="text-xs mt-1 opacity-70">
                        {format(interaction.createdAt, 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="h-16 w-16 opacity-30" />
                <p className="mt-2">Chưa có tương tác nào với khách hàng này</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                disabled={isSubmitting}
                className="flex-1"
              />
              <Button type="submit" disabled={!newMessage.trim() || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="ml-2">Gửi</span>
              </Button>
            </form>
          </div>
        </TabsContent>
        
        {/* Notes tab */}
        <TabsContent value="notes" className="flex-1 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium">Ghi chú</h3>
          </div>
          
          <Textarea
            placeholder="Nhập ghi chú về khách hàng này..."
            className="min-h-[200px]"
            defaultValue={contact.notes || ''}
            onChange={async (e) => {
              try {
                await api.supabase
                  .from('crm_contacts')
                  .update({ 
                    notes: e.target.value,
                    updated_at: new Date().toISOString() 
                  })
                  .eq('id', contact.id);
              } catch (error) {
                console.error('Error updating notes:', error);
              }
            }}
          />
        </TabsContent>
      </Tabs>
      
      {/* Edit contact dialog */}
      <CrmEditContactDialog
        contact={contact}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={() => {
          onUpdate();
          toast.success('Cập nhật thông tin thành công');
        }}
      />
    </div>
  );
}
