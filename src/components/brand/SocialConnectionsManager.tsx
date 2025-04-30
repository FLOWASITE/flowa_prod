
import React, { useState, useEffect } from 'react';
import { Share2, Bot } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialAccountsList } from '@/components/social/SocialAccountsList';
import { SocialPlatformSelector } from '@/components/social/SocialPlatformSelector';
import { ChatbotIntegrations } from '@/components/social/ChatbotIntegrations';

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
    { id: '1', name: 'Flowa' },
    { id: '2', name: 'Sa Giang Riverside' },
    { id: '3', name: 'Thế giới di động' }
  ]);
  
  const [selectedBrandId, setSelectedBrandId] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<string>('social');
  
  // Mock connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([
    {
      id: 1,
      name: 'Flowa - Auto AI Content for Socials',
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
      name: 'Flowa Official',
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
    selectBrand: {
      vi: 'Chọn thương hiệu',
      en: 'Select brand'
    },
    socialAccounts: {
      vi: 'Tài khoản mạng xã hội',
      en: 'Social Accounts'
    },
    chatbotIntegrations: {
      vi: 'Tích hợp Chatbot AI',
      en: 'AI Chatbot Integrations'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  // Filter accounts by selected brand
  const filteredAccounts = connectedAccounts.filter(account => account.brandId === selectedBrandId);
  const selectedBrandName = brands.find(brand => brand.id === selectedBrandId)?.name || '';

  return (
    <div className="space-y-8">
      {/* Brand selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="w-full sm:w-64">
          <Select value={selectedBrandId} onValueChange={setSelectedBrandId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('selectBrand')} />
            </SelectTrigger>
            <SelectContent>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-2 w-full sm:w-[400px]">
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              {t('socialAccounts')}
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              {t('chatbotIntegrations')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
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
