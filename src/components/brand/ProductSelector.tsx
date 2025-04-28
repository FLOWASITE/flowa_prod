
import React from 'react';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  products: {
    en: 'Products & Services',
    vi: 'Sản phẩm & Dịch vụ',
    fr: 'Produits & Services',
    es: 'Productos y servicios',
    th: 'สินค้าและบริการ',
  },
  addProduct: {
    en: 'Add Product/Service',
    vi: 'Thêm Sản phẩm/Dịch vụ',
    fr: 'Ajouter Produit/Service',
    es: 'Añadir Producto/Servicio',
    th: 'เพิ่มสินค้า/บริการ',
  },
  productName: {
    en: 'Product Name',
    vi: 'Tên sản phẩm',
    fr: 'Nom du produit',
    es: 'Nombre del producto',
    th: 'ชื่อสินค้า',
  },
  productDescription: {
    en: 'Description',
    vi: 'Mô tả',
    fr: 'Description',
    es: 'Descripción',
    th: 'คำอธิบาย',
  },
  features: {
    en: 'Features (one per line)',
    vi: 'Tính năng (mỗi dòng một tính năng)',
    fr: 'Caractéristiques (une par ligne)',
    es: 'Características (una por línea)',
    th: 'คุณสมบัติ (หนึ่งบรรทัดต่อหนึ่งคุณสมบัติ)',
  },
  noProducts: {
    en: 'No products or services added yet. Click the button below to add your first product.',
    vi: 'Chưa có sản phẩm hoặc dịch vụ nào được thêm. Nhấn nút bên dưới để thêm sản phẩm đầu tiên của bạn.',
    fr: 'Aucun produit ou service ajouté pour l\'instant. Cliquez sur le bouton ci-dessous pour ajouter votre premier produit.',
    es: 'Aún no se han añadido productos o servicios. Haga clic en el botón de abajo para añadir su primer producto.',
    th: 'ยังไม่มีสินค้าหรือบริการที่เพิ่ม คลิกปุ่มด้านล่างเพื่อเพิ่มสินค้าแรกของคุณ',
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

  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    onProductsChange(updatedProducts);
  };

  return (
    <div className="space-y-4">
      {products.length === 0 && (
        <div className="text-center p-6 border border-dashed rounded-lg bg-background">
          <Package className="h-12 w-12 mx-auto opacity-50 mb-2" />
          <p className="text-muted-foreground">{t('noProducts')}</p>
        </div>
      )}

      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg bg-background">
            <div className="flex justify-between items-center mb-2 pb-2 border-b">
              <h4 className="font-medium">
                {product.name ? product.name : `${t('addProduct')} #${index + 1}`}
              </h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => removeProduct(index)}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
              >
                &times;
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`product-name-${index}`}>{t('productName')}</Label>
              <Input
                id={`product-name-${index}`}
                value={product.name}
                onChange={(e) => updateProduct(index, 'name', e.target.value)}
                placeholder="e.g. Web Design Service"
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor={`product-desc-${index}`}>{t('productDescription')}</Label>
              <Textarea
                id={`product-desc-${index}`}
                value={product.description}
                onChange={(e) => updateProduct(index, 'description', e.target.value)}
                placeholder="Describe your product or service..."
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor={`product-features-${index}`}>{t('features')}</Label>
              <Textarea
                id={`product-features-${index}`}
                value={product.features.join('\n')}
                onChange={(e) => updateProduct(index, 'features', e.target.value)}
                placeholder="Responsive design\nSEO optimization\n24/7 support"
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
        className="w-full bg-primary/5 border-primary/20 hover:bg-primary/10"
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('addProduct')}
      </Button>
    </div>
  );
}
