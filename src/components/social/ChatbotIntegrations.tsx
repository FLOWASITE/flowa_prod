
import React from 'react';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { platformIcons } from '@/components/chat/PlatformIcons';

export function ChatbotIntegrations({ brandName }: { brandName: string }) {
  const { currentLanguage } = useLanguage();
  
  const translations = {
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

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">
        {brandName} - {t('chatbotIntegrations')}
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
  );
}
