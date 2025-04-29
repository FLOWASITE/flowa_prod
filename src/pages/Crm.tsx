
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CrmContactsList } from '@/components/crm/CrmContactsList';
import { CrmContactDetail } from '@/components/crm/CrmContactDetail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Search,
  Filter,
  RefreshCcw,
  PlusCircle
} from 'lucide-react';
import { CrmNewContactDialog } from '@/components/crm/CrmNewContactDialog';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/integrations/supabase/client';
import { CrmContact } from '@/types';
import { toast } from 'sonner';

const Crm = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isNewContactDialogOpen, setIsNewContactDialogOpen] = useState(false);

  // Fetch contacts from Supabase
  const { data: contacts, isLoading, error, refetch } = useQuery({
    queryKey: ['crmContacts'],
    queryFn: async () => {
      try {
        const { data, error } = await api.supabase
          .from('crm_contacts')
          .select('*')
          .order('last_contact', { ascending: false });
        
        if (error) throw error;
        
        // Convert dates to Date objects
        return data.map((contact) => ({
          ...contact,
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          platform: contact.platform,
          customerId: contact.customer_id,
          firstContact: new Date(contact.first_contact),
          lastContact: new Date(contact.last_contact),
          status: contact.status,
          notes: contact.notes,
          createdAt: new Date(contact.created_at),
          updatedAt: new Date(contact.updated_at),
        })) as CrmContact[];
      } catch (error) {
        console.error('Error fetching CRM contacts:', error);
        toast.error('Không thể tải dữ liệu khách hàng');
        return [];
      }
    }
  });

  // Apply filters to contacts
  const filteredContacts = contacts?.filter(contact => {
    // Apply search query filter
    const matchesSearch = 
      !searchQuery || 
      (contact.name && contact.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.phone && contact.phone.includes(searchQuery));
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get selected contact detail
  const selectedContact = contacts?.find(c => c.id === selectedContactId) || null;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý khách hàng (CRM)</h1>
          <p className="text-muted-foreground">Quản lý thông tin khách hàng từ các kênh trò chuyện</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
          
          <Button 
            size="sm" 
            onClick={() => setIsNewContactDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm khách hàng
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Left panel - Contacts List */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-950">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Tìm kiếm khách hàng..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select 
                value={statusFilter} 
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="h-8 flex-1">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="new">Mới</SelectItem>
                  <SelectItem value="contacted">Đã liên hệ</SelectItem>
                  <SelectItem value="qualified">Tiềm năng</SelectItem>
                  <SelectItem value="converted">Đã chuyển đổi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <CrmContactsList 
            contacts={filteredContacts || []} 
            isLoading={isLoading} 
            selectedId={selectedContactId}
            onSelectContact={(id) => setSelectedContactId(id)}
          />
        </div>
        
        {/* Right panel - Contact Detail */}
        <div className="lg:col-span-2 border rounded-lg overflow-hidden flex flex-col bg-white dark:bg-gray-950">
          {selectedContact ? (
            <CrmContactDetail 
              contact={selectedContact}
              onUpdate={() => refetch()}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6">
              <Users className="h-16 w-16 mb-4 opacity-30" />
              <h3 className="text-lg font-medium mb-2">Chọn một khách hàng</h3>
              <p className="text-center">Vui lòng chọn một khách hàng từ danh sách để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog to add new contact */}
      <CrmNewContactDialog 
        open={isNewContactDialogOpen}
        onOpenChange={setIsNewContactDialogOpen}
        onSuccess={() => {
          refetch();
          toast.success('Thêm khách hàng mới thành công');
        }}
      />
    </Layout>
  );
};

export default Crm;
