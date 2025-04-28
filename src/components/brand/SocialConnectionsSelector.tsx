
import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageSquare,
  Share2,
  MessagesSquare,
  Share
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  socialConnections: {
    vi: 'Kết nối mạng xã hội',
    en: 'Social Connections',
    fr: 'Connexions sociales',
    es: 'Conexiones sociales',
    th: 'การเชื่อมต่อโซเชียล',
    id: 'Koneksi Sosial'
  }
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

export function SocialConnectionsSelector() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Share className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('socialConnections')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => (
          <div key={platform.name} className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
              <span>{platform.name}</span>
            </div>
            {platform.actions.map((action) => (
              <button
                key={action}
                type="button"
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-sm"
              >
                {action}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
