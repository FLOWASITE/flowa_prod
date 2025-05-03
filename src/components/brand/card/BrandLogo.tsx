
import React from 'react';

interface BrandLogoProps {
  logo?: string;
  name: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ logo, name }) => {
  return (
    <div className="h-12 w-12 rounded-lg bg-gray-100/80 dark:bg-gray-700/80 flex items-center justify-center">
      {logo ? (
        <img src={logo} alt={name} className="w-8 h-8 object-contain" />
      ) : (
        <span className="text-xl font-semibold text-gray-500">
          {name[0]}
        </span>
      )}
    </div>
  );
};
