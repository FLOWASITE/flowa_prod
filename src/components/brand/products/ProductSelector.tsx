
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductItem } from './item/ProductItem';
import { EmptyProductState } from './EmptyProductState';
import { ProductActions } from './actions/ProductActions';
import { Product, productTranslations } from './translations';
import { ImportProductsDialog } from './import/ImportProductsDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Import } from 'lucide-react';

interface ProductSelectorProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ProductSelector({ products, onProductsChange }: ProductSelectorProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };
  
  const addNewProduct = (e: React.MouseEvent) => {
    // Prevent event propagation and default form submission
    e.preventDefault();
    e.stopPropagation();
    
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
      {!showProductForm ? (
        <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="mb-4 text-lg font-medium">
            {t('totalProducts')}: {products.length}
          </p>
          <Button 
            onClick={() => setShowProductForm(true)}
            className="gap-2 bg-[#ea384c] hover:bg-[#c52940] text-white"
          >
            <Plus className="h-4 w-4" />
            {t('manageProducts')}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowProductForm(false)}
              className="border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
            >
              &larr; {t('back')}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsImportDialogOpen(true)} 
              className="border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              {t('importCSV')}
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <p className="text-center text-sm text-gray-500 mb-4">
              {t('importOrAddDirectly')}
            </p>
            
            <p className="text-center text-sm text-gray-500 mb-4">
              {t('importUsingCSV')}
            </p>
            
            <div className="border rounded-md overflow-hidden">
              <div className="grid grid-cols-4 font-medium bg-white border-b">
                <div className="p-3 border-r">{t('productName')}</div>
                <div className="p-3 border-r">{t('price')}</div>
                <div className="p-3 border-r">{t('description')}</div>
                <div className="p-3">{t('features')}</div>
              </div>
              
              {products.length === 0 ? (
                <div className="bg-gray-200 text-center p-6 text-gray-600">
                  {t('noProducts')}
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  {products.map((product, index) => (
                    <ProductItem
                      key={index}
                      product={product}
                      index={index}
                      onUpdate={updateProduct}
                      onRemove={removeProduct}
                    />
                  ))}
                </ScrollArea>
              )}
            </div>
            
            <Button 
              onClick={addNewProduct}
              type="button"
              className="mt-4 w-full md:w-auto flex items-center justify-center gap-2 border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              {t('addProduct')}
            </Button>
          </div>
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
