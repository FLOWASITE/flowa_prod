
import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageSquare,
  Share2,
  Share
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const translations = {
  socialConnections: {
    vi: 'Kết nối mạng xã hội',
    en: 'Social Connections',
    fr: 'Connexions sociales',
    es: 'Conexiones sociales',
    th: 'การเชื่อมต่อโซเชียล',
    id: 'Koneksi Sosial'
  },
  socialDescription: {
    vi: 'Kết nối tài khoản mạng xã hội của thương hiệu để quản lý nội dung',
    en: 'Connect your brand\'s social media accounts to manage content',
    fr: 'Connectez les comptes de médias sociaux de votre marque pour gérer le contenu',
    es: 'Conecte las cuentas de redes sociales de su marca para administrar el contenido',
    th: 'เชื่อมต่อบัญชีโซเชียลมีเดียของแบรนด์ของคุณเพื่อจัดการเนื้อหา',
    id: 'Hubungkan akun media sosial merek Anda untuk mengelola konten'
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
];

export function SocialConnectionsSelector() {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Card className="border border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Share className="h-5 w-5 text-primary" />
          {t('socialConnections')}
        </CardTitle>
        <CardDescription>
          {t('socialDescription')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="p-4 border rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                <span className="font-medium">{platform.name}</span>
              </div>
              <div className="space-y-2">
                {platform.actions.map((action) => (
                  <Button
                    key={action}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full text-left flex justify-start"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
