
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  currentLanguage: {
    code: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  firstName, 
  lastName, 
  avatarUrl, 
  currentLanguage 
}) => {
  return (
    <>
      <div className="flex items-center mb-8">
        <div className="relative mr-6">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="text-2xl">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">
            {currentLanguage.code === 'vi' ? 'Thông tin tài khoản' : 'Account Information'}
          </h1>
          <p className="text-gray-500 mt-1">
            {currentLanguage.code === 'vi' 
              ? 'Xem và cập nhật thông tin cá nhân của bạn' 
              : 'View and update your personal information'}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-medium">{firstName} {lastName}</h2>
      </div>
    </>
  );
};

export default ProfileHeader;
