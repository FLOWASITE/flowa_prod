
import React from 'react';

interface PlatformIconProps {
  platform: string;
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  switch (platform) {
    case 'facebook':
      return (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
          f
        </div>
      );
    case 'instagram':
      return (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white text-xs">
          i
        </div>
      );
    case 'tiktok':
      return (
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs">
          t
        </div>
      );
    case 'threads':
      return (
        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
          th
        </div>
      );
    case 'linkedin':
      return (
        <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs">
          in
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
          ?
        </div>
      );
  }
};
