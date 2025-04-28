
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageSquare,
  Share2,
  MessagesSquare
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function SocialConnections() {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    connectAccount: {
      vi: 'Kết nối tài khoản mới',
      en: 'Connect a new account',
      fr: 'Connecter un nouveau compte',
      es: 'Conectar una nueva cuenta',
      th: 'เชื่อมต่อบัญชีใหม่',
      id: 'Hubungkan akun baru'
    },
    addMore: {
      vi: 'Thêm nhiều tài khoản mạng xã hội để tăng hiệu suất trực tuyến của bạn.',
      en: 'Add more social accounts to increase your online performance.',
      fr: 'Ajoutez plus de comptes sociaux pour augmenter vos performances en ligne.',
      es: 'Agregue más cuentas sociales para aumentar su rendimiento en línea.',
      th: 'เพิ่มบัญชีโซเชียลเพื่อเพิ่มประสิทธิภาพออนไลน์ของคุณ',
      id: 'Tambahkan lebih banyak akun sosial untuk meningkatkan performa online Anda.'
    }
  };

  const getTranslation = (key) => {
    return translations[key][currentLanguage.code] || translations[key]['en'];
  };

  const socialPlatforms = [
    { 
      name: 'Facebook',
      icon: Facebook,
      actions: ['+ Profile', '+ Page']
    },
    {
      name: 'Instagram',
      icon: Instagram,
      actions: ['+ Profile', '+ Business']
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      actions: ['+ Profile', '+ Company']
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      actions: ['+ Profile']
    },
    {
      name: 'YouTube',
      icon: Youtube,
      actions: ['+ Channel']
    },
    {
      name: 'Pinterest',
      icon: Share2, // Using Share2 icon instead of Pinterest
      actions: ['+ Profile']
    },
    {
      name: 'TikTok',
      icon: MessageSquare, // Using MessageSquare icon instead of Tiktok
      actions: ['+ Profile']
    },
    {
      name: 'Universal Posting',
      icon: MessagesSquare, // Using MessagesSquare icon instead of UniversalPosting
      actions: ['+ Add']
    }
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{getTranslation('connectAccount')}</h2>
        <p className="text-sm text-gray-500 mt-1">{getTranslation('addMore')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialPlatforms.map((platform) => (
          <div key={platform.name} className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <platform.icon className="h-5 w-5" />
              <span>{platform.name}</span>
            </div>
            {platform.actions.map((action) => (
              <button
                key={action}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm"
              >
                {action}
              </button>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
