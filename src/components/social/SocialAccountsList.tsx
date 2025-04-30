
import React from 'react';
import { Card } from '@/components/ui/card';
import { SocialAccountCard } from './SocialAccountCard';
import { EmptySocialAccountState } from './EmptySocialAccountState';
import { useLanguage } from '@/contexts/LanguageContext';

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
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="space-y-4 mb-10">
      <h2 className="text-lg font-medium">
        {brandName} - {t('socialAccounts')}
      </h2>
      
      {accounts.length > 0 ? (
        accounts.map(account => (
          <SocialAccountCard key={account.id} account={account} />
        ))
      ) : (
        <EmptySocialAccountState />
      )}
    </div>
  );
}
