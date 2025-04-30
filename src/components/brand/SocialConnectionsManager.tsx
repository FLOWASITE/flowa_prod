
import React, { useState, useEffect } from 'react';
import { Share2, Bot } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialAccountsList } from '@/components/social/SocialAccountsList';
import { SocialPlatformSelector } from '@/components/social/SocialPlatformSelector';
import { ChatbotIntegrations } from '@/components/social/ChatbotIntegrations';
import { Badge } from '@/components/ui/badge';

type SocialAccount = {
  id: number;
  name: string;
  type: string;
  platform: string;
  running: boolean;
  posts: number;
  brandId: string;
};

type Brand = {
  id: string;
  name: string;
};

export function SocialConnectionsManager() {
  const { currentLanguage } = useLanguage();
  
  // Mock brands
  const [brands, setBrands] = useState<Brand[]>([
    { id: '1', name: 'Kiểm toán TAF' },
    { id: '2', name: 'Sa Giang Riverside' },
    { id: '3', name: 'Thế giới di động' }
  ]);
  
  const [selectedBrandId, setSelectedBrandId] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<string>('social');
  
  // Mock connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([
    {
      id: 1,
      name: 'Kiểm toán TAF',
      type: 'Facebook Page',
      platform: 'facebook',
      running: true,
      posts: 12,
      brandId: '1'
    },
    {
      id: 2,
      name: 'Sa Giang Riverside',
      type: 'Facebook Profile',
      platform: 'facebook',
      running: true,
      posts: 5,
      brandId: '2'
    },
    {
      id: 3,
      name: 'Kiểm toán TAF',
      type: 'Instagram Business',
      platform: 'instagram',
      running: false,
      posts: 8,
      brandId: '1'
    },
    {
      id: 4,
      name: 'TGDĐ Official',
      type: 'Facebook Page',
      platform: 'facebook',
      running: true,
      posts: 24,
      brandId: '3'
    }
  ]);

  const translations = {
    socialAccounts: {
      vi: 'Tài khoản mạng xã hội',
      en: 'Social Accounts'
    },
    chatbotIntegrations: {
      vi: 'Tích hợp Chatbot AI',
      en: 'AI Chatbot Integrations'
    },
    connectionCount: {
      vi: (count: number) => `Có ${count} kết nối`,
      en: (count: number) => `${count} connections`
    }
  };

  const t = (key: keyof typeof translations, ...args: any[]) => {
    const translation = translations[key][currentLanguage.code] || translations[key].en;
    if (typeof translation === 'function') {
      return translation(...args);
    }
    return translation;
  };

  // Filter accounts by selected brand
  const filteredAccounts = connectedAccounts.filter(account => account.brandId === selectedBrandId);
  const selectedBrandName = brands.find(brand => brand.id === selectedBrandId)?.name || '';

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-4">
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>{t('socialAccounts')}</span>
            <Badge variant="secondary" className="ml-1 bg-gray-100 dark:bg-gray-700 text-xs">
              {filteredAccounts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>{t('chatbotIntegrations')}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Tab content */}
      <div>
        {activeTab === 'social' ? (
          <>
            {/* Connected social accounts section */}
            <SocialAccountsList 
              accounts={filteredAccounts} 
              brandName={selectedBrandName}
            />
            
            {/* Connect new social account section */}
            <SocialPlatformSelector />
          </>
        ) : (
          /* AI Chatbot integration section */
          <ChatbotIntegrations brandName={selectedBrandName} />
        )}
      </div>
    </div>
  );
}
