
import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  switch (platform) {
    case 'facebook':
      return (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <span className="text-xs font-bold">f</span>
        </div>
      );
    case 'instagram':
      return (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white">
          <span className="text-xs font-bold">i</span>
        </div>
      );
    case 'linkedin':
      return (
        <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white">
          <span className="text-xs font-bold">in</span>
        </div>
      );
    case 'tiktok':
      return (
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
          <span className="text-xs font-bold">t</span>
        </div>
      );
    case 'threads':
      return (
        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
          <span className="text-xs font-bold">th</span>
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white">
          <span className="text-xs font-bold">?</span>
        </div>
      );
  }
};
