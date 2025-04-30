
import React from 'react';
import { Card } from '@/components/ui/card';
import { SocialAccountCard } from './SocialAccountCard';
import { EmptySocialAccountState } from './EmptySocialAccountState';
import { useLanguage } from '@/contexts/LanguageContext';
import { Share2, Store } from 'lucide-react';

interface SocialAccountsListProps {
  accounts: Array<{
    id: number;
    name: string;
    type: string;
    platform: string;
    running: boolean;
    posts: number;
    brandId: string;
  }>;
  brandName: string;
}

export function SocialAccountsList({ accounts, brandName }: SocialAccountsListProps) {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    socialAccounts: {
      vi: 'Tài khoản mạng xã hội',
      en: 'Social Accounts'
    },
    brandAccounts: {
      vi: 'Tài khoản mạng xã hội của',
      en: 'Social Accounts for'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 space-y-4 mb-6">
      <div className="flex items-center gap-2">
        <Store className="h-5 w-5 text-blue-600" />
        <Share2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-medium">
          {`${t('brandAccounts')} ${brandName}`}
        </h2>
      </div>
      
      {accounts.length > 0 ? (
        <div className="space-y-4">
          {accounts.map(account => (
            <SocialAccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <EmptySocialAccountState />
      )}
    </div>
  );
}
