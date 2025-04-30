
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialConnectionsSelector } from '@/components/brand/SocialConnectionsSelector';

const SocialConnections = () => {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    title: {
      vi: 'Quản lý mạng xã hội',
      en: 'Social Media Management',
    },
    description: {
      vi: 'Quản lý các tài khoản mạng xã hội kết nối với hệ thống',
      en: 'Manage social media accounts connected to the system',
    },
    connectedAccounts: {
      vi: 'Các tài khoản đã kết nối',
      en: 'Connected accounts',
    },
    accountDescription: {
      vi: 'Xem và quản lý các tài khoản mạng xã hội của bạn',
      en: 'View and manage your social media accounts',
    }
  };
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">{t('title')}</h1>
          <p className="text-gray-500 mt-1">{t('description')}</p>
        </div>
        
        <div className="border-b border-gray-200 mb-6 pb-4">
          <h2 className="text-xl font-medium">{t('connectedAccounts')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('accountDescription')}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <SocialConnectionsSelector />
        </div>
      </div>
    </Layout>
  );
};

export default SocialConnections;
