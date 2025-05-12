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
import { handleFacebookLogin, handleGoogleBusinessLogin, handleInstagramLogin, handleTwitterLogin, handleYoutubeLogin, } from '@/utils/SocialLogin';
import { FaSquareThreads } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

export function SocialConnections() {
  const { currentLanguage } = useLanguage();
  const dispatch = useDispatch();
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

  // Cập nhật lại socialPlatforms:
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      actions: [
        {
          label: '+ Profile',
          handler: () => handleFacebookLogin(dispatch)
        },
        {
          label: '+ Page',
          handler: () => alert('Redirecting to Facebook Page connection')
        }
      ]
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      actions: [
        {
          label: '+ Profile',
          handler: () => handleInstagramLogin()
        },
        {
          label: '+ Business',
          handler: () => alert('Redirecting to Instagram Business connection')
        }
      ]
    },
    {
      name: 'Thread',
      icon: FaSquareThreads,
      color: '#0f0f0f',
      actions: [
        {
          label: '+ Profile',
          handler: () => alert('Thread Profile connected')
        },
        {
          label: '+ Business',
          handler: () => alert('Thread Business connected')
        }
      ]
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      actions: [
        {
          label: '+ Profile',
          handler: () => alert('Redirecting to LinkedIn Profile')
        },
        {
          label: '+ Company',
          handler: () => alert('Redirecting to LinkedIn Company')
        }
      ]
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: '#000000',
      actions: [
        {
          label: '+ Profile',
          handler: () => handleTwitterLogin()
        }
      ]
    },
    {
      name: 'YouTube',
      icon: Youtube,
      color: '#FF0000',
      actions: [
        {
          label: '+ Channel',
          handler: () => handleYoutubeLogin(dispatch)
        }
      ]
    },
    {
      name: 'Pinterest',
      icon: Share2,
      color: '#BD081C',
      actions: [
        {
          label: '+ Profile',
          handler: () => alert('Redirecting to Pinterest')
        }
      ]
    },
    {
      name: 'TikTok',
      icon: MessageSquare,
      color: '#000000',
      actions: [
        {
          label: '+ Profile',
          handler: () => {
            const clientId = 'awntdpvuyyff1rkh';
            const redirectUri = 'http://localhost:3000/tiktok/callback';
            const scope = 'user.info.basic';
            window.location.href = `https://www.tiktok.com/auth/authorize/?client_key=${clientId}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
          }
        }
      ]
    },
    {
      name: 'Universal Posting',
      icon: MessagesSquare,
      color: '#6366f1',
      actions: [
        {
          label: '+ Add',
          handler: () => handleGoogleBusinessLogin()
        }
      ]
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
                key={action.label}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm"
                onClick={action.handler}
              >
                {action.label}
              </button>
            ))}

          </div>
        ))}
      </div>
    </Card>
  );
}
