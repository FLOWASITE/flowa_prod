
import React from 'react';
import { platformIcons } from '@/components/chat/PlatformIcons';

interface PlatformIconProps {
  platform: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  const icon = platformIcons[platform as keyof typeof platformIcons] || null;
  
  return (
    <div className="flex justify-center">
      {icon}
    </div>
  );
};
