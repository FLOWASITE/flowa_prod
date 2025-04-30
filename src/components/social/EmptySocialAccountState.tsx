
import React from 'react';
import { Card } from '@/components/ui/card';
import { Share2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function EmptySocialAccountState() {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    noAccounts: {
      vi: 'Chưa có tài khoản mạng xã hội nào được kết nối cho thương hiệu này.',
      en: 'No social accounts connected for this brand.'
    },
    addAccount: {
      vi: 'Thêm tài khoản mới bên dưới để bắt đầu.',
      en: 'Add a new account below to get started.'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Card className="p-8 text-center border rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
          <Share2 className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">{t('noAccounts')}</h3>
        <p className="text-gray-500 dark:text-gray-400">{t('addAccount')}</p>
      </div>
    </Card>
  );
}
