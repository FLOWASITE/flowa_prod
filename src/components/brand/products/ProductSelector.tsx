
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductItem } from './item/ProductItem';
import { EmptyProductState } from './EmptyProductState';
import { ProductActions } from './actions/ProductActions';
import { Product, productTranslations } from './translations';
import { ImportProductsDialog } from './import/ImportProductsDialog';
import { ProductFormDialog } from './dialog/ProductFormDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

interface ProductSelectorProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ProductSelector({ products, onProductsChange }: ProductSelectorProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{index: number, product: Product} | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };
  
  const addNewProduct = (e: React.MouseEvent) => {
    // Prevent event propagation and default form submission
    e.preventDefault();
    e.stopPropagation();
    
    // Open form dialog instead of directly adding to array
    setEditingProduct(null);
    setIsProductFormOpen(true);
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

  const handleEditProduct = (index: number) => {
    setEditingProduct({index, product: products[index]});
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct !== null) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[editingProduct.index] = product;
      onProductsChange(updatedProducts);
    } else {
      // Add new product
      onProductsChange([...products, product]);
    }
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('manageProducts')}</h3>
              <Button 
                onClick={addNewProduct}
                type="button"
                className="flex items-center justify-center gap-2 border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                {t('addProduct')}
              </Button>
            </div>
            
            {products.length === 0 ? (
              <EmptyProductState onAddProduct={addNewProduct} />
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <ProductItem
                      key={index}
                      product={product}
                      index={index}
                      onUpdate={updateProduct}
                      onRemove={removeProduct}
                      onEdit={() => handleEditProduct(index)}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </>
      )}

      <ImportProductsDialog 
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImportProducts={handleImportProducts}
      />

      <ProductFormDialog
        open={isProductFormOpen}
        onOpenChange={setIsProductFormOpen}
        onSave={handleSaveProduct}
        initialProduct={editingProduct?.product}
        isEdit={!!editingProduct}
      />
    </div>
  );
}
