
export interface SocialAccount {
  id: string;
  brandId: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'tiktok' | 'pinterest' | 'google';
  accountType: 'profile' | 'page' | 'group' | 'business' | 'channel';
  name: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  status: 'active' | 'expired' | 'disconnected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatbotIntegration {
  id: string;
  brandId: string;
  platform: 'messenger' | 'zalo' | 'website' | 'telegram' | 'whatsapp';
  status: 'active' | 'inactive';
  settings: {
    welcomeMessage?: string;
    aiModel?: string;
    knowledgeBaseEnabled?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
