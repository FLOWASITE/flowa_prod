
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';

export function Pricing() {
  const { currentLanguage } = useLanguage();
  const isVietnamese = currentLanguage.code === 'vi';
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');
  
  // Content based on language
  const content = {
    title: isVietnamese ? 'Bảng Giá' : 'Pricing Plans',
    subtitle: isVietnamese 
      ? 'Chọn gói phù hợp với nhu cầu của bạn' 
      : 'Choose a plan that fits your needs',
    monthly: isVietnamese ? 'Theo tháng' : 'Monthly',
    yearly: isVietnamese ? 'Theo năm' : 'Yearly',
    saveText: isVietnamese ? '(tiết kiệm 20%)' : '(save 20%)',
    ctaText: isVietnamese ? 'Đăng ký ngay' : 'Get Started',
    trialText: isVietnamese ? 'Thời gian dùng thử còn' : 'Trial expires in',
    trialDays: '8',
    upgradeText: isVietnamese ? 'Nâng cấp ngay!' : 'Upgrade Now!',
  };
  
  // Plans data
  const plans = [
    {
      name: 'Basic',
      description: isVietnamese 
        ? 'Dành cho cá nhân, Freelancer, Startup' 
        : 'For individuals, Freelancers, Startups',
      priceMonthly: '$19',
      priceYearly: '$182',
      perText: isVietnamese ? '/người dùng' : '/user',
      features: [
        { text: isVietnamese ? '1 Brand' : '1 Brand', available: true },
        { text: isVietnamese ? '20 Chủ đề/tháng' : '20 Topics/month', available: true },
        { text: isVietnamese ? '100 Nội dung/tháng' : '100 Content pieces/month', available: true },
        { text: isVietnamese ? '3 Nền tảng mạng xã hội' : '3 Social platforms', available: true },
        { text: isVietnamese ? '50 Hình ảnh/tháng' : '50 Images/month', available: true },
        { text: isVietnamese ? 'Chatbot cơ bản' : 'Basic Chatbot', available: true },
        { text: isVietnamese ? 'Không có hỗ trợ chuyên dụng' : 'No dedicated support', available: false },
      ]
    },
    {
      name: 'Professional',
      description: isVietnamese 
        ? 'Dành cho SMB, Agency nhỏ' 
        : 'For SMBs, Small Agencies',
      priceMonthly: '$49',
      priceYearly: '$470',
      perText: isVietnamese ? '/người dùng' : '/user',
      featured: true,
      features: [
        { text: isVietnamese ? '3 Brands' : '3 Brands', available: true },
        { text: isVietnamese ? '100 Chủ đề/tháng' : '100 Topics/month', available: true },
        { text: isVietnamese ? '500 Nội dung/tháng' : '500 Content pieces/month', available: true },
        { text: isVietnamese ? '7 Nền tảng mạng xã hội' : '7 Social platforms', available: true },
        { text: isVietnamese ? '300 Hình ảnh/tháng' : '300 Images/month', available: true },
        { text: isVietnamese ? 'Chatbot nâng cao' : 'Advanced Chatbot', available: true },
        { text: isVietnamese ? 'Hỗ trợ qua email' : 'Email support', available: true },
      ]
    },
    {
      name: 'Enterprise',
      description: isVietnamese 
        ? 'Dành cho Agency lớn, Doanh nghiệp' 
        : 'For Large Agencies, Enterprises',
      priceMonthly: '$99',
      priceYearly: '$950',
      perText: isVietnamese ? '/người dùng' : '/user',
      features: [
        { text: isVietnamese ? 'Không giới hạn Brands' : 'Unlimited Brands', available: true },
        { text: isVietnamese ? 'Không giới hạn Chủ đề' : 'Unlimited Topics', available: true },
        { text: isVietnamese ? 'Không giới hạn Nội dung' : 'Unlimited Content', available: true },
        { text: isVietnamese ? 'Không giới hạn Nền tảng' : 'Unlimited Platforms', available: true },
        { text: isVietnamese ? '1000 Hình ảnh/tháng' : '1000 Images/month', available: true },
        { text: isVietnamese ? 'Chatbot tùy chỉnh' : 'Custom Chatbot', available: true },
        { text: isVietnamese ? 'Hỗ trợ ưu tiên 24/7' : 'Priority 24/7 support', available: true },
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Trial expiration notice */}
        <div className="bg-gray-900 text-white p-4 rounded-lg mb-8 flex justify-between items-center">
          <span>{content.trialText} {content.trialDays} {isVietnamese ? 'ngày' : 'days'}</span>
          <Link to="/account-type">
            <Button variant="secondary" size="sm">{content.upgradeText}</Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{content.subtitle}</p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span 
              className={`text-sm ${billingInterval === 'monthly' ? 'font-bold' : 'text-gray-500'}`}
            >
              {content.monthly}
            </span>
            <Switch 
              checked={billingInterval === 'yearly'}
              onCheckedChange={(checked) => setBillingInterval(checked ? 'yearly' : 'monthly')}
            />
            <span 
              className={`text-sm ${billingInterval === 'yearly' ? 'font-bold' : 'text-gray-500'}`}
            >
              {content.yearly} <span className="text-green-600 font-normal">{content.saveText}</span>
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <Card 
              key={i} 
              className={`flex flex-col ${
                plan.featured 
                  ? 'border-primary shadow-lg relative' 
                  : 'border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  {isVietnamese ? 'Phổ biến nhất' : 'Most Popular'}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm min-h-12">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">
                      {billingInterval === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {billingInterval === 'monthly' 
                        ? `${plan.perText}/${isVietnamese ? 'tháng' : 'mo'}` 
                        : `${plan.perText}/${isVietnamese ? 'năm' : 'yr'}`}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      {feature.available ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                      )}
                      <span 
                        className={feature.available ? '' : 'text-gray-500 dark:text-gray-400'}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/register" className="w-full">
                  <Button 
                    variant={plan.featured ? 'default' : 'outline'} 
                    className="w-full"
                  >
                    {content.ctaText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;
