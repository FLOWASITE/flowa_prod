
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductItem } from './item/ProductItem';
import { EmptyProductState } from './EmptyProductState';
import { ProductActions } from './actions/ProductActions';
import { Product } from './translations';
import { ImportProductsDialog } from './import/ImportProductsDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { translations } from './translations';

interface ProductSelectorProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ProductSelector({ products, onProductsChange }: ProductSelectorProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };
  
  const addNewProduct = () => {
    onProductsChange([
      ...products,
      { name: '', description: '', features: [], pricing: '', benefits: '' }
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

  const handleImportProducts = (importedProducts: Product[]) => {
    onProductsChange([...products, ...importedProducts]);
  };

  return (
    <div className="space-y-4">
      {products.length === 0 && <EmptyProductState />}

      {!showProductForm ? (
        <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="mb-4 text-lg font-medium">
            {t('totalProducts')}: {products.length}
          </p>
          <Button 
            onClick={() => setShowProductForm(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('manageProducts')}
          </Button>
        </div>
      ) : (
        <>
          <Button 
            variant="outline" 
            onClick={() => setShowProductForm(false)}
            className="mb-2"
          >
            &larr; {t('back')}
          </Button>
          
          <ProductActions 
            onAddProduct={addNewProduct} 
            onOpenImportDialog={() => setIsImportDialogOpen(true)} 
          />

          {products.length > 0 && (
            <ScrollArea className="h-[30vh] border rounded-md">
              <div className="p-4 space-y-6">
                {products.map((product, index) => (
                  <ProductItem
                    key={index}
                    product={product}
                    index={index}
                    onUpdate={updateProduct}
                    onRemove={removeProduct}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </>
      )}

      <ImportProductsDialog 
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImportProducts={handleImportProducts}
      />
    </div>
  );
}
