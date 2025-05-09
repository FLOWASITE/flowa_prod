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
  MessagesSquare,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAccessToken, handleFacebookLogin, handleGoogleLogin, handleInstagramLogin } from '@/FBLogin';
import { FaSquareThreads } from 'react-icons/fa6';

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
      actions: ['+ Profile', '+ Page'],
      color: '#1877F2'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      actions: ['+ Profile', '+ Business'],
      color: '#E4405F'
    },
    {
      name: 'Thread',
      icon: FaSquareThreads,
      actions: ['+ Profile', '+ Business'],
      color: '#0f0f0f'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      actions: ['+ Profile', '+ Company'],
      color: '#0A66C2'
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      actions: ['+ Profile'],
      color: '#000000'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      actions: ['+ Channel'],
      color: '#FF0000'
    },
    {
      name: 'Pinterest',
      icon: Share2,
      actions: ['+ Profile'],
      color: '#BD081C'
    },
    {
      name: 'TikTok',
      icon: MessageSquare,
      actions: ['+ Profile'],
      color: '#000000'
    },
    {
      name: 'Universal Posting',
      icon: MessagesSquare,
      actions: ['+ Add'],
      color: '#6366f1'
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
              <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
              <span>{platform.name}</span>
            </div>
            {platform.actions.map((action) => (
              <button
                key={action}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm"
                onClick={() => {
                  if (platform.name === 'Facebook') {
                    handleFacebookLogin();
                  } else if (platform.name === 'Instagram') {
                    handleInstagramLogin();
                  }
                  else if (platform.name === 'TikTok') {
                    const clientId = 'awntdpvuyyff1rkh';
                    const redirectUri = 'http://localhost:3000/tiktok/callback';
                    const scope = 'user.info.basic';
                    window.location.href = `https://www.tiktok.com/auth/authorize/?client_key=${clientId}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
                  }
                  else if (platform.name === 'YouTube') {
                    handleGoogleLogin();
                  } else {
                    alert(`Redirecting to ${platform.name} ${action}`);
                  }
                }}
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
