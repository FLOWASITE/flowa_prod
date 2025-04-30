
export interface CrmContact {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  platform: 'messenger' | 'zalo' | 'linkedin';
  customerId: string | null;
  firstContact: Date;
  lastContact: Date;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CrmInteraction {
  id: string;
  contactId: string;
  message: string;
  direction: 'incoming' | 'outgoing';
  platform: 'messenger' | 'zalo' | 'linkedin';
  createdAt: Date;
}
