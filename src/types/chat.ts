
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  sender?: 'customer' | 'bot'; // Keep for backward compatibility
  content: string;
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  platform: 'messenger' | 'zalo' | 'linkedin';
  customerId: string;
  customerName: string;
  messages: ChatMessage[];
  status: 'active' | 'resolved' | 'transferred';
  createdAt: Date;
  updatedAt: Date;
}
