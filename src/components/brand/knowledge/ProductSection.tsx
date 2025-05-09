
import React from 'react';
import { ProductSelector } from '@/components/brand/products/ProductSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../products/translations';

const translations = {
  manageProducts: {
    vi: 'Quản lý sản phẩm & dịch vụ',
    en: 'Manage Products & Services',
    fr: 'Gérer les produits et services',
    es: 'Gestionar productos y servicios',
    th: 'จัดการสินค้าและบริการ',
  },
  productDescription: {
    vi: 'Tạo danh sách sản phẩm và dịch vụ của thương hiệu của bạn',
    en: 'Create a list of products and services for your brand',
    fr: 'Créez une liste de produits et services pour votre marque',
    es: 'Cree una lista de productos y servicios para su marca',
    th: 'สร้างรายการสินค้าและบริการสำหรับแบรนด์ของคุณ',
  }
};

interface ProductSectionProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ProductSection({ products, onProductsChange }: ProductSectionProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  return (
    <Card className="border border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <ShoppingBag className="h-5 w-5 text-[#ea384c]" />
          {t('manageProducts')}
        </CardTitle>
        <CardDescription>
          {t('productDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductSelector 
          products={products}
          onProductsChange={onProductsChange}
        />
      </CardContent>
    </Card>
  );
}
