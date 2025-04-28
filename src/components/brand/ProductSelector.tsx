
import React from 'react';
import { Plus, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  products: {
    en: 'Products & Services',
    vi: 'Sản phẩm & Dịch vụ',
  },
  addProduct: {
    en: 'Add Product/Service',
    vi: 'Thêm Sản phẩm/Dịch vụ',
  },
  productName: {
    en: 'Product Name',
    vi: 'Tên sản phẩm',
  },
  productDescription: {
    en: 'Description',
    vi: 'Mô tả',
  },
  features: {
    en: 'Features (one per line)',
    vi: 'Tính năng (mỗi dòng một tính năng)',
  }
};

interface Product {
  name: string;
  description: string;
  features: string[];
}

interface ProductSelectorProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ProductSelector({ products, onProductsChange }: ProductSelectorProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const addNewProduct = () => {
    onProductsChange([
      ...products,
      { name: '', description: '', features: [] }
    ]);
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = [...products];
    if (field === 'features') {
      updatedProducts[index] = {
        ...updatedProducts[index],
        features: value.split('\n').filter(f => f.trim() !== '')
      };
    } else {
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      };
    }
    onProductsChange(updatedProducts);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Store className="h-4 w-4" />
        <Label>{t('products')}</Label>
      </div>

      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div>
              <Label htmlFor={`product-name-${index}`}>{t('productName')}</Label>
              <Input
                id={`product-name-${index}`}
                value={product.name}
                onChange={(e) => updateProduct(index, 'name', e.target.value)}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor={`product-desc-${index}`}>{t('productDescription')}</Label>
              <Textarea
                id={`product-desc-${index}`}
                value={product.description}
                onChange={(e) => updateProduct(index, 'description', e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor={`product-features-${index}`}>{t('features')}</Label>
              <Textarea
                id={`product-features-${index}`}
                value={product.features.join('\n')}
                onChange={(e) => updateProduct(index, 'features', e.target.value)}
                className="mt-1.5"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <Button 
        type="button" 
        variant="outline" 
        onClick={addNewProduct}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('addProduct')}
      </Button>
    </div>
  );
}
