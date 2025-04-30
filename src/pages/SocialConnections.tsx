
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialConnectionsManager } from '@/components/brand/SocialConnectionsManager';
import { ScrollArea } from '@/components/ui/scroll-area';

const SocialConnections = () => {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    title: {
      vi: 'Quản lý kết nối',
      en: 'Connection Management',
    },
    description: {
      vi: 'Quản lý tất cả các tài khoản mạng xã hội cho từng thương hiệu',
      en: 'Manage all social media accounts for each brand',
    },
    allConnected: {
      vi: 'Quản lý tài khoản',
      en: 'Account Management',
    }
  };
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="container max-w-7xl py-8 px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <p className="text-gray-500 mt-1">{t('description')}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium">{t('allConnected')}</h2>
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
