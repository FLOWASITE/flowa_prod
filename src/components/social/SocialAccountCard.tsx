
import React from 'react';
import { Facebook, Instagram, CircleCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialAccount } from '@/types';

interface SocialAccountCardProps {
  account: {
    id: number;
    name: string;
    type: string;
    platform: string;
    running: boolean;
    posts: number;
    brandId: string;
  };
}

export function SocialAccountCard({ account }: SocialAccountCardProps) {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    posts: {
      vi: 'bài viết',
      en: 'posts'
    },
    running: {
      vi: 'Đang chạy',
      en: 'Running'
    },
    createPost: {
      vi: 'Tạo bài viết',
      en: 'Create post'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
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
  );
}
