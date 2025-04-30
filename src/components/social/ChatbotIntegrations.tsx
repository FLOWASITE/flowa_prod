
import React from 'react';
import { CircleCheck, Bot, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { platformIcons } from '@/components/chat/PlatformIcons';
import { Card } from '@/components/ui/card';

export function ChatbotIntegrations({ brandName }: { brandName: string }) {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    chatbotIntegrations: {
      vi: 'Tích hợp Chatbot AI',
      en: 'AI Chatbot Integrations'
    },
    brandChatbots: {
      vi: 'Tích hợp Chatbot AI cho',
      en: 'AI Chatbot Integrations for'
    },
    connect: {
      vi: 'Kết nối',
      en: 'Connect'
    },
    manage: {
      vi: 'Quản lý',
      en: 'Manage'
    },
    connected: {
      vi: 'Đã kết nối',
      en: 'Connected'
    },
    noIntegrations: {
      vi: 'Chưa có tích hợp Chatbot nào cho thương hiệu này.',
      en: 'No chatbot integrations for this brand yet.'
    },
    addIntegration: {
      vi: 'Kết nối một nền tảng để bắt đầu.',
      en: 'Connect a platform to get started.'
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

  const hasIntegrations = chatbotPlatforms.some(platform => platform.connected);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Store className="h-5 w-5 text-blue-600" />
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-medium">
          {`${t('brandChatbots')} ${brandName}`}
        </h2>
      </div>
      
      {hasIntegrations ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chatbotPlatforms.map((platform) => (
            <div 
              key={platform.id}
              className="border rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                {platform.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium flex items-center">
                  {platform.name}
                  {platform.connected && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-0.5 rounded-full flex items-center">
                      <CircleCheck className="w-3 h-3 mr-1" />
                      {t('connected')}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{platform.description}</p>
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
      ) : (
        <Card className="p-8 text-center border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <Bot className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">{t('noIntegrations')}</h3>
            <p className="text-gray-500 dark:text-gray-400">{t('addIntegration')}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
