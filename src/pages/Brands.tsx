
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { BrandCard } from '@/components/brand/BrandCard';
import { NewBrandDialog } from '@/components/brand/NewBrandDialog';
import { mockBrands } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  brands: {
    en: 'Brands',
    vi: 'Thương hiệu',
    fr: 'Marques',
    es: 'Marcas',
    th: 'แบรนด์',
  },
  description: {
    en: 'Manage your brand identities and settings',
    vi: 'Quản lý danh tính và cài đặt thương hiệu của bạn',
    fr: 'Gérez les identités et les paramètres de votre marque',
    es: 'Administre las identidades y configuraciones de su marca',
    th: 'จัดการข้อมูลและการตั้งค่าแบรนด์ของคุณ',
  }
};

const Brands = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('brands')}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>
        
        <NewBrandDialog />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBrands.map(brand => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </Layout>
  );
};

export default Brands;
