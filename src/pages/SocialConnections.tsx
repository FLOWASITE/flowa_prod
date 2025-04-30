
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialConnectionsManager } from '@/components/brand/SocialConnectionsManager';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings } from 'lucide-react';

const SocialConnections = () => {
  const { currentLanguage } = useLanguage();
  const [days] = useState(8);
  
  const translations = {
    title: {
      vi: 'Tài khoản mạng xã hội đã kết nối',
      en: 'Connected social accounts',
    },
    description: {
      vi: 'Xem và quản lý các tài khoản mạng xã hội của bạn',
      en: 'View and manage your social media accounts in one place.',
    },
    trialMessage: {
      vi: `Dùng thử sẽ hết hạn trong ${days} ngày`,
      en: `Your trial will expire in ${days} days`,
    },
    upgrade: {
      vi: 'Nâng cấp ngay!',
      en: 'Upgrade Now!',
    },
    socialAccounts: {
      vi: 'Tài khoản mạng xã hội',
      en: 'Social Accounts',
    },
    allConnected: {
      vi: 'Tất cả tài khoản đã kết nối',
      en: 'All connected accounts',
    }
  };
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Trial notification bar */}
        <div className="bg-gray-800 text-white py-2 px-6 flex items-center justify-center">
          <span>{t('trialMessage')}</span>
          <Button 
            variant="link" 
            className="text-yellow-400 hover:text-yellow-300 font-semibold ml-2 p-0"
          >
            {t('upgrade')}
          </Button>
        </div>

        <div className="container max-w-7xl py-8 px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <p className="text-gray-500 mt-1">{t('description')}</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{t('allConnected')}</h2>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>{t('socialAccounts')}</span>
            </Button>
          </div>

          <ScrollArea className="w-full">
            <SocialConnectionsManager />
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default SocialConnections;
