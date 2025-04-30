
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Crown, CircleUser } from 'lucide-react';
import { AccountTypeBadge } from '@/components/users/AccountTypeBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AccountType = () => {
  const { currentLanguage } = useLanguage();
  // Using Professional as the default account type
  const accountType = 'professional';
  const userEmail = 'flowasite@gmail.com';

  const getFeatures = () => {
    return [
      { id: 1, name: currentLanguage.code === 'vi' ? 'Quản lý thương hiệu' : 'Brand Management', included: true },
      { id: 2, name: currentLanguage.code === 'vi' ? 'Tạo nội dung' : 'Content Creation', included: true },
      { id: 3, name: currentLanguage.code === 'vi' ? 'Phân tích dữ liệu' : 'Data Analytics', included: true },
      { id: 4, name: currentLanguage.code === 'vi' ? 'Hỗ trợ ưu tiên' : 'Priority Support', included: true },
      { id: 5, name: currentLanguage.code === 'vi' ? 'Xuất dữ liệu' : 'Data Export', included: true },
      { id: 6, name: currentLanguage.code === 'vi' ? 'API tùy chỉnh' : 'Custom API', included: false },
      { id: 7, name: currentLanguage.code === 'vi' ? 'Phân quyền nâng cao' : 'Advanced Permissions', included: false },
    ];
  };

  const features = getFeatures();

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">
          {currentLanguage.code === 'vi' ? 'Loại tài khoản' : 'Account Type'}
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Account info card */}
          <Card className="p-6 md:col-span-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <CircleUser className="h-20 w-20 text-gray-400 dark:text-gray-500" />
                </div>
                
                {/* Position the account badge on the bottom right of the avatar */}
                <div className="absolute -bottom-2 -right-2">
                  <AccountTypeBadge type={accountType as any} size="lg" showLabel={false} clickable={false} />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-1">
                {userEmail}
              </h2>
              
              <div className="flex items-center justify-center mt-2">
                <AccountTypeBadge type={accountType as any} size="md" clickable={false} />
              </div>
              
              <div className="mt-6">
                <Link to="/pricing">
                  <Button>
                    {currentLanguage.code === 'vi' ? 'Nâng cấp tài khoản' : 'Upgrade Account'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
          
          {/* Features card */}
          <Card className="p-6 md:col-span-2 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">
                {currentLanguage.code === 'vi' ? 'Tính năng Professional' : 'Professional Features'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {features.map(feature => (
                <div 
                  key={feature.id} 
                  className={`flex items-center p-3 rounded-lg ${
                    feature.included ? 'bg-primary-container/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                    feature.included ? 'bg-primary' : 'bg-gray-400'
                  }`} />
                  <span className={feature.included ? 'font-medium' : 'text-gray-500'}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentLanguage.code === 'vi' 
                  ? 'Tài khoản của bạn đang sử dụng gói Professional. Bạn có thể nâng cấp để sử dụng thêm các tính năng nâng cao.'
                  : 'Your account is currently on the Professional plan. You can upgrade to unlock more advanced features.'}
              </p>
            </div>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/pricing">
            <Button variant="outline" className="mr-2">
              {currentLanguage.code === 'vi' ? 'Xem bảng giá' : 'View Pricing'}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AccountType;
