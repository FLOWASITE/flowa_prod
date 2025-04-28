export interface Brand {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;  // Add optional website property
  colors: {
    primary: string;
    secondary: string;
  };
  tone: string;
  themes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeType {
  id: string;
  brandId: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductType {
  id: string;
  brandId: string;
  name: string;
  description: string;
  features: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentTone {
  id: string;
  brandId: string;
  name: string;
  style: string;
  language: string;
  formalityLevel: 'casual' | 'neutral' | 'formal';
  targetAudience: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Topic {
  id: string;
  brandId: string;
  themeTypeId: string;
  productTypeId?: string;
  title: string;
  description: string;
  status: 'draft' | 'approved' | 'rejected' | 'generating' | 'completed';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  id: string;
  topicId: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin';
  text: string;
  imageUrl?: string;
  status: 'draft' | 'approved' | 'rejected' | 'scheduled' | 'published';
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
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
