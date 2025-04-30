
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SettingsSectionProps {
  currentLanguage: {
    code: string;
  };
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ currentLanguage }) => {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-xl font-medium">
          {currentLanguage.code === 'vi' ? 'Bảo mật' : 'Security'}
        </h2>
        <p className="text-gray-500 mt-2">
          {currentLanguage.code === 'vi' 
            ? 'Thông tin bảo mật cho tài khoản của bạn' 
            : 'Security information for your account'}
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {currentLanguage.code === 'vi' ? 'Xác thực hai yếu tố' : 'Two-factor authentication'}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentLanguage.code === 'vi' 
                    ? 'Bảo vệ tài khoản của bạn bằng xác thực hai yếu tố' 
                    : 'Add an extra layer of security to your account'}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {currentLanguage.code === 'vi' ? 'Chưa thiết lập' : 'Not configured'}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">
                  {currentLanguage.code === 'vi' ? 'Phiên đăng nhập' : 'Login sessions'}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentLanguage.code === 'vi' 
                    ? 'Quản lý phiên đăng nhập đang hoạt động' 
                    : 'Manage your active login sessions'}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                1
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SettingsSection;
