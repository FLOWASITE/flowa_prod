
import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, X, MessageCircle, Globe, TrendingUp, Rss, Share2 } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
  size?: 'small' | 'medium' | 'large';
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 'medium' }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      container: "w-5 h-5",
      icon: "w-3 h-3",
      text: "text-xs"
    },
    medium: {
      container: "w-8 h-8",
      icon: "w-4 h-4",
      text: "text-xs"
    },
    large: {
      container: "w-10 h-10",
      icon: "w-5 h-5",
      text: "text-xs" // Changed from text-sm to text-xs for consistency
    }
  };
  
  const { container, icon, text } = sizeConfig[size];
  
  // Fix the platform name display for Twitter -> X
  const platformName = platform.toLowerCase() === 'twitter' ? 'x' : platform.toLowerCase();
  
  switch (platformName) {
    case 'facebook':
      return (
        <div className={`${container} rounded-full bg-[#1877F2] flex items-center justify-center text-white`}>
          <Facebook className={icon} />
        </div>
      );
    case 'instagram':
      return (
        <div className={`${container} rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white`}>
          <Instagram className={icon} />
        </div>
      );
    case 'linkedin':
      return (
        <div className={`${container} rounded-full bg-[#0A66C2] flex items-center justify-center text-white`}>
          <Linkedin className={icon} />
        </div>
      );
    case 'x':
      return (
        <div className={`${container} rounded-full bg-black flex items-center justify-center text-white`}>
          <X className={icon} />
        </div>
      );
    case 'youtube':
      return (
        <div className={`${container} rounded-full bg-[#FF0000] flex items-center justify-center text-white`}>
          <Youtube className={icon} />
        </div>
      );
    case 'tiktok':
      return (
        <div className={`${container} rounded-full bg-black flex items-center justify-center text-white`}>
          <span className={text}>TT</span>
        </div>
      );
    case 'threads':
      return (
        <div className={`${container} rounded-full bg-black flex items-center justify-center text-white`}>
          <Share2 className={icon} />
        </div>
      );
    case 'messenger':
      return (
        <div className={`${container} rounded-full bg-[#0084FF] flex items-center justify-center text-white`}>
          <MessageCircle className={icon} />
        </div>
      );
    case 'pinterest':
      return (
        <div className={`${container} rounded-full bg-[#E60023] flex items-center justify-center text-white`}>
          <span className={text}>P</span>
        </div>
      );
    case 'blog':
      return (
        <div className={`${container} rounded-full bg-[#FF5722] flex items-center justify-center text-white`}>
          <Rss className={icon} />
        </div>
      );
    default:
      return (
        <div className={`${container} rounded-full bg-gray-400 flex items-center justify-center text-white`}>
          <Globe className={icon} />
        </div>
      );
  }
};
