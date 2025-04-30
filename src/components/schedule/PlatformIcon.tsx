
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MessageCircle, Globe, TrendingUp, Rss, Share2 } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return (
        <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white">
          <Facebook className="w-4 h-4" />
        </div>
      );
    case 'instagram':
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white">
          <Instagram className="w-4 h-4" />
        </div>
      );
    case 'linkedin':
      return (
        <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white">
          <Linkedin className="w-4 h-4" />
        </div>
      );
    case 'twitter':
      return (
        <div className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white">
          <Twitter className="w-4 h-4" />
        </div>
      );
    case 'youtube':
      return (
        <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
          <Youtube className="w-4 h-4" />
        </div>
      );
    case 'tiktok':
      return (
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
          <span className="text-xs font-bold">TT</span>
        </div>
      );
    case 'threads':
      return (
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
          <Share2 className="w-4 h-4" />
        </div>
      );
    case 'messenger':
      return (
        <div className="w-8 h-8 rounded-full bg-[#0084FF] flex items-center justify-center text-white">
          <MessageCircle className="w-4 h-4" />
        </div>
      );
    case 'pinterest':
      return (
        <div className="w-8 h-8 rounded-full bg-[#E60023] flex items-center justify-center text-white">
          <span className="text-xs font-bold">P</span>
        </div>
      );
    case 'blog':
      return (
        <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
          <Rss className="w-4 h-4" />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
          <Globe className="w-4 h-4" />
        </div>
      );
  }
};
