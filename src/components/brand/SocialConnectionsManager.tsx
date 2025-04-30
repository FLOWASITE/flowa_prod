
import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  MessageSquare, 
  Share2, 
  Plus,
  CircleCheck,
  CircleAlert,
  Bot
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { platformIcons } from '@/components/chat/PlatformIcons';

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
  const isVietnamese = currentLanguage.code === 'vi';
  
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

  // Social platforms available for connection
  const socialPlatforms = [
    { 
      name: 'Facebook',
      icon: Facebook,
      actions: [{name: '+ Profile'}, {name: '+ Page'}],
      color: '#1877F2',
      connected: true
    },
    {
      name: 'Instagram',
      icon: Instagram,
      actions: [{name: '+ Profile'}, {name: '+ Business'}],
      color: '#E4405F',
      connected: false
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      actions: [{name: '+ Profile'}, {name: '+ Company'}],
      color: '#0A66C2',
      connected: false
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      actions: [{name: '+ Profile'}],
      color: '#000000',
      connected: false
    },
    {
      name: 'YouTube',
      icon: Youtube,
      actions: [{name: '+ Channel'}],
      color: '#FF0000',
      connected: false
    },
    {
      name: 'Pinterest',
      icon: Share2,
      actions: [{name: '+ Profile'}],
      color: '#BD081C',
      connected: false
    },
    {
      name: 'TikTok',
      icon: MessageSquare,
      actions: [{name: '+ Profile'}],
      color: '#000000',
      connected: false
    },
    {
      name: 'Bluesky',
      icon: Twitter,
      actions: [{name: '+ Profile'}],
      color: '#0084FF',
      connected: false
    },
    {
      name: 'Google Business Profile',
      icon: Share2,
      actions: [{name: '+ Location'}],
      color: '#4285F4',
      connected: false
    },
    {
      name: 'Universal Posting',
      icon: Share2,
      actions: [{name: '+ Add'}],
      color: '#6366f1',
      connected: false,
      isNew: true
    }
  ];

  // AI chatbot platforms
  const chatbotPlatforms = [
    {
      id: 'messenger',
      name: 'Facebook Messenger',
      description: 'Kết nối với Fanpage Facebook để tích hợp chatbot',
      connected: true,
      icon: platformIcons.messenger
    },
    {
      id: 'zalo',
      name: 'Zalo OA',
      description: 'Tích hợp chatbot với Official Account trên Zalo',
      connected: true,
      icon: platformIcons.zalo
    },
    {
      id: 'website',
      name: 'Website Chat',
      description: 'Thêm chatbot vào website của bạn',
      connected: false,
      icon: platformIcons.website
    },
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Tích hợp với bot Telegram',
      connected: false,
      icon: platformIcons.telegram
    }
  ];

  const translations = {
    createPost: {
      vi: 'Tạo bài viết',
      en: 'Create post'
    },
    connectAccount: {
      vi: 'Kết nối tài khoản mới',
      en: 'Connect a new account',
    },
    addMore: {
      vi: 'Thêm nhiều tài khoản mạng xã hội để tăng hiệu suất trực tuyến của bạn.',
      en: 'Add more social accounts to increase your online performance.',
    },
    posts: {
      vi: 'bài viết',
      en: 'posts'
    },
    running: {
      vi: 'Đang chạy',
      en: 'Running'
    },
    new: {
      vi: 'Mới',
      en: 'New'
    },
    availableConnections: {
      vi: '4/25',
      en: '4/25'
    },
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
    },
    connect: {
      vi: 'Kết nối',
      en: 'Connect'
    },
    manage: {
      vi: 'Quản lý',
      en: 'Manage'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  // Filter accounts by selected brand
  const filteredAccounts = connectedAccounts.filter(account => account.brandId === selectedBrandId);

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
            <div className="space-y-4 mb-10">
              <h2 className="text-lg font-medium">
                {brands.find(brand => brand.id === selectedBrandId)?.name} - {t('socialAccounts')}
              </h2>
              
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map(account => (
                  <Card key={account.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {account.platform === 'facebook' && <Facebook className="text-[#1877F2]" />}
                          {account.platform === 'instagram' && <Instagram className="text-[#E4405F]" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{account.name}</h3>
                          <p className="text-sm text-gray-500">{account.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`flex items-center ${account.running ? 'text-green-500' : 'text-red-500'}`}>
                          {account.running ? (
                            <>
                              <span className="mr-1 inline-block w-4 h-4 bg-green-500 rounded-full relative">
                                <span className="absolute inset-0 animate-ping w-full h-full rounded-full bg-green-500 opacity-75"></span>
                              </span>
                              {t('running')}
                            </>
                          ) : 'Offline'}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <CircleCheck className="h-4 w-4 text-green-500" />
                          <span>{account.posts} {t('posts')}</span>
                        </div>
                        
                        <Button variant="outline" size="sm">+ {t('createPost')}</Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border rounded-lg">
                  <p className="text-gray-500">No social accounts connected for this brand. Add a new account below.</p>
                </Card>
              )}
            </div>
            
            {/* Connect new social account section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="font-medium">{t('availableConnections')}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{t('connectAccount')}</h2>
                  <p className="text-sm text-gray-500">{t('addMore')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {socialPlatforms.map((platform) => (
                  <div key={platform.name} className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                      <span>{platform.name}</span>
                      {platform.isNew && (
                        <Badge variant="outline" className="text-xs bg-gray-100 border-gray-200">
                          {t('new')}
                        </Badge>
                      )}
                    </div>
                    {platform.actions.map((action) => (
                      <Button
                        key={action.name}
                        variant="outline"
                        size="sm"
                        className="w-full text-left flex items-center justify-start"
                      >
                        {action.name}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* AI Chatbot integration section */
          <div className="space-y-6">
            <h2 className="text-lg font-medium">
              {brands.find(brand => brand.id === selectedBrandId)?.name} - {t('chatbotIntegrations')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chatbotPlatforms.map((platform) => (
                <div 
                  key={platform.id}
                  className="border rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-50"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                    {platform.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium flex items-center">
                      {platform.name}
                      {platform.connected && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                          <CircleCheck className="w-3 h-3 mr-1" />
                          Đã kết nối
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{platform.description}</p>
                  </div>
                  <Button 
                    variant={platform.connected ? "outline" : "default"}
                    size="sm"
                  >
                    {platform.connected ? t('manage') : t('connect')}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
