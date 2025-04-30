
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialConnectionsManager } from '@/components/brand/SocialConnectionsManager';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BrandSwitcher } from '@/components/brand/BrandSwitcher';
import { Building2, Share2, Bot, Store } from 'lucide-react';

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
    },
    brandConnections: {
      vi: 'Kết nối của thương hiệu',
      en: 'Brand Connections',
    },
    selectBrandPrompt: {
      vi: 'Chọn thương hiệu để xem và quản lý các kết nối',
      en: 'Select a brand to view and manage connections'
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

          {/* Brand Selection Area with improved UX */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">{t('brandConnections')}</h2>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">{t('selectBrandPrompt')}</p>
            
            <div className="flex items-center gap-4">
              <BrandSwitcher />
            </div>
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
