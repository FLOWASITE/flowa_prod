
import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Twitter, MessageSquare, Share2, Plus, Store, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlatformIcon } from '@/components/schedule/PlatformIcon';

export function SocialPlatformSelector() {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    connectAccount: {
      vi: 'Kết nối tài khoản mới',
      en: 'Connect a new account',
    },
    addMore: {
      vi: 'Thêm nhiều tài khoản mạng xã hội để tăng hiệu suất trực tuyến của thương hiệu.',
      en: 'Add more social accounts to increase your brand\'s online performance.',
    },
    new: {
      vi: 'Mới',
      en: 'New'
    },
    availableConnections: {
      vi: '4/25',
      en: '4/25'
    },
    connectedAccounts: {
      vi: 'Tài khoản mạng xã hội đã kết nối',
      en: 'Connected social accounts'
    },
    viewAndManage: {
      vi: 'Xem và quản lý tài khoản mạng xã hội của bạn tại một nơi.',
      en: 'View and manage your social accounts in one place.'
    },
    allConnectedAccounts: {
      vi: 'Tất cả tài khoản đã kết nối',
      en: 'All connected accounts'
    },
    socialAccounts: {
      vi: 'Tài khoản mạng xã hội',
      en: 'Social Accounts'
    },
    running: {
      vi: 'Đang chạy',
      en: 'Running'
    },
    posts: {
      vi: 'bài viết',
      en: 'posts'
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };
  
  // Connected social accounts (mock data)
  const connectedAccounts = [
    {
      id: 1,
      name: 'Vĩnh Bảo Đặng Khoa',
      type: 'Facebook Profile',
      platform: 'facebook',
      running: true,
      posts: 1
    }
  ];
  
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

  return (
    <>
      {/* Connected accounts section - New section added matching the image */}
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-semibold">{t('connectedAccounts')}</h2>
            <p className="text-sm text-gray-500 mt-1">{t('viewAndManage')}</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings size={16} />
            <span>{t('socialAccounts')}</span>
          </Button>
        </div>
        
        <h3 className="text-sm font-medium mt-4 mb-2">{t('allConnectedAccounts')}</h3>
        
        {connectedAccounts.map(account => (
          <div key={account.id} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 overflow-hidden rounded-full border bg-gray-100 flex items-center justify-center">
                  {account.platform === 'facebook' && <Facebook className="w-full h-full text-[#1877F2] p-1" />}
                </div>
                <div>
                  <h4 className="font-medium">{account.name}</h4>
                  <p className="text-sm text-gray-500">{account.type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{t('running')}</span>
                  <Switch checked={account.running} />
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{account.posts} {t('posts')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect new account section */}
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
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
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                <span>{platform.name}</span>
                {platform.isNew && (
                  <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
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
    </>
  );
}
