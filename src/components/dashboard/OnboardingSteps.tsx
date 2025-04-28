
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

export function OnboardingSteps() {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    gettingStarted: {
      vi: 'Bắt đầu với Flowa',
      en: 'Getting started with Flowa',
      fr: 'Commencer avec Flowa',
      es: 'Empezar con Flowa',
      th: 'เริ่มต้นใช้งาน Flowa',
      id: 'Memulai dengan Flowa'
    },
    setupAccount: {
      vi: 'Thiết lập tài khoản của bạn chỉ trong vài bước.',
      en: 'Set up your account in just a few steps.',
      fr: 'Configurez votre compte en quelques étapes.',
      es: 'Configure su cuenta en solo unos pasos.',
      th: 'ตั้งค่าบัญชีของคุณในไม่กี่ขั้นตอน',
      id: 'Siapkan akun Anda hanya dalam beberapa langkah.'
    },
    completed: {
      vi: 'đã hoàn thành',
      en: 'completed',
      fr: 'terminé',
      es: 'completado',
      th: 'เสร็จสิ้น',
      id: 'selesai'
    }
  };

  const getTranslation = (key) => {
    return translations[key][currentLanguage.code] || translations[key]['en'];
  };

  const steps = [
    {
      number: 1,
      title: 'Kết nối tài khoản mạng xã hội',
      description: 'để tăng sự hiện diện trực tuyến của bạn.',
      action: 'Kết nối'
    },
    {
      number: 2,
      title: 'Xác định danh mục nội dung',
      description: 'để quản lý và đa dạng hóa chiến lược đăng bài của bạn.',
      action: 'Quản lý'
    },
    {
      number: 3,
      title: 'Lên lịch danh mục',
      description: 'để tạo kế hoạch đăng bài hoàn hảo.',
      action: 'Lên lịch'
    },
    {
      number: 4,
      title: 'Tạo',
      description: 'và tùy chỉnh bài đăng cho từng mạng xã hội.',
      action: 'Tạo'
    }
  ];

  return (
    <Card className="p-6 mb-8 bg-primary/10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{getTranslation('gettingStarted')}</h2>
        <p className="text-sm text-gray-700 mt-1">{getTranslation('setupAccount')}</p>
        <div className="mt-4">
          <Progress value={10} className="h-2" />
          <p className="text-sm mt-1">10% {getTranslation('completed')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <Card key={step.number} className="p-4 bg-white">
            <div className="flex flex-col h-full">
              <div className="flex items-start mb-2">
                <div className="text-sm font-medium">
                  {step.number}. {step.title}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 flex-grow">
                {step.description}
              </p>
              <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                {step.action}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
