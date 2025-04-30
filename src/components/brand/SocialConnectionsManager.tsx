
import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  MessageSquare, 
  Share2, 
  Plus,
  CircleCheck,
  CircleAlert 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export function SocialConnectionsManager() {
  const { currentLanguage } = useLanguage();
  const isVietnamese = currentLanguage.code === 'vi';
  
  // Mock connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      name: 'Flowa - Auto AI Content for Socials',
      type: 'Facebook Page',
      platform: 'facebook',
      running: true,
      posts: 0
    },
    {
      id: 2,
      name: 'Sa Giang Riverside',
      type: 'Facebook Profile',
      platform: 'facebook',
      running: true,
      posts: 0
    }
  ]);

  // Social platforms available for connection
  const socialPlatforms = [
    { 
      name: 'Facebook',
      icon: Facebook,
      actions: [{name: '+ Profile'}, {name: '+ Page'}],
      color: '#1877F2',
      connected: true
    },
    {
      name: 'Instagram',
      icon: Instagram,
      actions: [{name: '+ Profile'}, {name: '+ Business'}],
      color: '#E4405F',
      connected: false
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      actions: [{name: '+ Profile'}, {name: '+ Company'}],
      color: '#0A66C2',
      connected: false
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      actions: [{name: '+ Profile'}],
      color: '#000000',
      connected: false
    },
    {
      name: 'YouTube',
      icon: Youtube,
      actions: [{name: '+ Channel'}],
      color: '#FF0000',
      connected: false
    },
    {
      name: 'Pinterest',
      icon: Share2,
      actions: [{name: '+ Profile'}],
      color: '#BD081C',
      connected: false
    },
    {
      name: 'TikTok',
      icon: MessageSquare,
      actions: [{name: '+ Profile'}],
      color: '#000000',
      connected: false
    },
    {
      name: 'Bluesky',
      icon: Twitter,
      actions: [{name: '+ Profile'}],
      color: '#0084FF',
      connected: false
    },
    {
      name: 'Google Business Profile',
      icon: Share2,
      actions: [{name: '+ Location'}],
      color: '#4285F4',
      connected: false
    },
    {
      name: 'Universal Posting',
      icon: Share2,
      actions: [{name: '+ Add'}],
      color: '#6366f1',
      connected: false,
      isNew: true
    }
  ];

  const translations = {
    createPost: {
      vi: 'Tạo bài viết',
      en: 'Create post'
    },
    connectAccount: {
      vi: 'Kết nối tài khoản mới',
      en: 'Connect a new account',
    },
    addMore: {
      vi: 'Thêm nhiều tài khoản mạng xã hội để tăng hiệu suất trực tuyến của bạn.',
      en: 'Add more social accounts to increase your online performance.',
    },
    posts: {
      vi: 'bài viết',
      en: 'posts'
    },
    running: {
      vi: 'Đang chạy',
      en: 'Running'
    },
    new: {
      vi: 'Mới',
      en: 'New'
    },
    availableConnections: {
      vi: '2/25',
      en: '2/25'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="space-y-8">
      {/* Connected accounts section */}
      <div className="space-y-4">
        {connectedAccounts.map(account => (
          <Card key={account.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {account.platform === 'facebook' && <Facebook className="text-[#1877F2]" />}
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
                  <CircleAlert className="h-4 w-4 text-yellow-500" />
                  <span>{account.posts} {t('posts')}</span>
                </div>
                
                <Button variant="outline" size="sm">+ {t('createPost')}</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Connect new account section */}
      <div className="mt-10">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
            <span className="font-medium">{t('availableConnections')}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{t('connectAccount')}</h2>
            <p className="text-sm text-gray-500">{t('addMore')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                <span>{platform.name}</span>
                {platform.isNew && (
                  <Badge variant="outline" className="text-xs bg-gray-100 border-gray-200">
                    {t('new')}
                  </Badge>
                )}
              </div>
              {platform.actions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  size="sm"
                  className="w-full text-left flex items-center justify-start"
                >
                  {action.name}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
