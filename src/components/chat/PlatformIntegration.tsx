
import React from 'react';
import { Button } from '@/components/ui/button';
import { platformIcons } from './PlatformIcons';
import { Check } from 'lucide-react';

export function PlatformIntegration() {
  const platforms = [
    {
      id: 'messenger',
      name: 'Facebook Messenger',
      description: 'Kết nối với Fanpage Facebook để tích hợp tin nhắn',
      connected: true,
      icon: platformIcons.messenger
    },
    {
      id: 'zalo',
      name: 'Zalo OA',
      description: 'Tích hợp với Official Account trên Zalo',
      connected: true,
      icon: platformIcons.zalo
    },
    {
      id: 'website',
      name: 'Website Chat',
      description: 'Thêm chatbot vào website của bạn',
      connected: false,
      icon: platformIcons.website
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Kết nối với LinkedIn để trò chuyện với khách hàng',
      connected: false,
      icon: platformIcons.linkedin
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      description: 'Kết nối với tài khoản Twitter',
      connected: false,
      icon: platformIcons.twitter
    },
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Tích hợp với bot Telegram',
      connected: false,
      icon: platformIcons.telegram
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Kết nối với TikTok Business',
      connected: false,
      icon: platformIcons.tiktok
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Kết nối với Instagram Business',
      connected: false,
      icon: platformIcons.instagram
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 max-h-[60vh] overflow-y-auto">
      {platforms.map((platform) => (
        <div 
          key={platform.id}
          className="border rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-50"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
            {platform.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium flex items-center">
              {platform.name}
              {platform.connected && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Đã kết nối
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500">{platform.description}</p>
          </div>
          <Button 
            variant={platform.connected ? "outline" : "default"}
            size="sm"
          >
            {platform.connected ? 'Quản lý' : 'Kết nối'}
          </Button>
        </div>
      ))}
    </div>
  );
}
