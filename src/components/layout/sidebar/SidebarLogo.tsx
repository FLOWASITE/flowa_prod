
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SidebarLogoProps = {
  collapsed: boolean;
};

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed }) => {
  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      {!collapsed ? (
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
            alt="Flowa Logo" 
            className="h-[100px] object-contain" 
          />
        </Link>
      ) : (
        <Link to="/" className="flex items-center justify-center w-full">
          <img 
            src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
            alt="Flowa Logo" 
            className="h-[80px] w-[80px] object-contain"
          />
        </Link>
      )}
    </div>
  );
};
