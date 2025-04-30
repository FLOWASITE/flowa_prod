
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PricingTable } from '@/components/pricing/PricingTable';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AccountType() {
  const { currentLanguage } = useLanguage();
  const isVietnamese = currentLanguage.code === 'vi';
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">
          {isVietnamese ? 'Loại tài khoản' : 'Account Type'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isVietnamese 
            ? 'So sánh các loại tài khoản và chọn gói phù hợp cho nhu cầu của bạn.' 
            : 'Compare account types and choose the plan that fits your needs.'}
        </p>
        
        <PricingTable />
        
        <div className="flex justify-center mt-8">
          <Link to="/register">
            <Button size="lg">
              {isVietnamese ? 'Đăng ký ngay' : 'Register Now'}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default AccountType;
