
import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, Video } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type PlatformType = 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin';

interface PlatformIconProps {
  platform: PlatformType;
  showLabel?: boolean;
  size?: number;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  platform, 
  showLabel = false,
  size = 18 
}) => {
  const getPlatformDetails = () => {
    switch (platform) {
      case 'facebook':
        return { 
          icon: <Facebook size={size} className="text-blue-600" />, 
          label: 'Facebook',
          bgColor: 'bg-blue-100'
        };
      case 'instagram':
        return { 
          icon: <Instagram size={size} className="text-pink-600" />, 
          label: 'Instagram',
          bgColor: 'bg-pink-100'
        };
      case 'tiktok':
        return { 
          icon: <Video size={size} className="text-black" />, 
          label: 'TikTok',
          bgColor: 'bg-gray-100'
        };
      case 'threads':
        return { 
          icon: <MessageCircle size={size} className="text-black" />, 
          label: 'Threads',
          bgColor: 'bg-gray-100'
        };
      case 'linkedin':
        return { 
          icon: <Linkedin size={size} className="text-blue-700" />, 
          label: 'LinkedIn',
          bgColor: 'bg-blue-100'
        };
      default:
        return { 
          icon: <Facebook size={size} className="text-gray-600" />, 
          label: platform,
          bgColor: 'bg-gray-100'
        };
    }
  };

  const { icon, label, bgColor } = getPlatformDetails();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1.5 p-1 rounded-md ${showLabel ? bgColor : ''}`}>
            {icon}
            {showLabel && <span className="text-xs font-medium">{label}</span>}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
