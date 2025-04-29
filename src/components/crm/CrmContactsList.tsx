
import React from 'react';
import { CrmContact } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  BadgeCheck,
  MessageCircle, 
  Phone, 
  Mail,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { platformIcons } from '@/components/chat/PlatformIcons';

interface CrmContactsListProps {
  contacts: CrmContact[];
  isLoading: boolean;
  selectedId: string | null;
  onSelectContact: (id: string) => void;
}

export function CrmContactsList({ 
  contacts, 
  isLoading, 
  selectedId,
  onSelectContact 
}: CrmContactsListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Đang tải danh sách khách hàng...</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <MessageCircle className="h-8 w-8 text-muted-foreground opacity-30" />
        <p className="mt-2 text-muted-foreground">Không có khách hàng nào</p>
      </div>
    );
  }

  // Render status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Mới</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Đã liên hệ</Badge>;
      case 'qualified':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Tiềm năng</Badge>;
      case 'converted':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Đã chuyển đổi</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="divide-y">
        {contacts.map((contact) => (
          <li 
            key={contact.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
              selectedId === contact.id && "bg-gray-50 dark:bg-gray-900"
            )}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  {contact.name || 'Khách hàng chưa xác định'}
                </h3>
                {contact.status === 'converted' && (
                  <BadgeCheck className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="flex gap-1 items-center">
                {platformIcons[contact.platform as keyof typeof platformIcons]}
                {getStatusBadge(contact.status)}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-2">
              {contact.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>{contact.email}</span>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>{contact.phone}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Liên hệ lần đầu: {format(contact.firstContact, 'dd/MM/yyyy', { locale: vi })}</span>
              <span>Liên hệ gần nhất: {format(contact.lastContact, 'dd/MM/yyyy', { locale: vi })}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
