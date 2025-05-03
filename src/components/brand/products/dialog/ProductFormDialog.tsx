
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productTranslations, Product } from '../translations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ProductFormContent } from './components/ProductFormContent';
import { ProductFormActions } from './components/ProductFormActions';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: Product) => void;
  initialProduct?: Product;
  isEdit?: boolean;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  onSave,
  initialProduct,
  isEdit = false,
}: ProductFormDialogProps) {
  const { currentLanguage } = useLanguage();
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    pricing: '',
    priceAmount: undefined,
    priceUnit: '',
    priceCurrency: 'VND',
    features: [],
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    } else {
      // Reset form when opening for a new product
      setProduct({
        name: '',
        description: '',
        pricing: '',
        priceAmount: undefined,
        priceUnit: '',
        priceCurrency: 'VND',
        features: [],
      });
    }
  }, [initialProduct, open]);

  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };

  const handleChange = (field: keyof Product, value: string | number) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Create the pricing string from structured price fields
    const updatedProduct = { ...product };
    if (updatedProduct.priceAmount !== undefined && updatedProduct.priceUnit && updatedProduct.priceCurrency) {
      updatedProduct.pricing = `${updatedProduct.priceAmount} ${updatedProduct.priceCurrency}/${updatedProduct.priceUnit}`;
    }
    
    onSave(updatedProduct);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            {isEdit ? t('editProduct') : t('addProduct')}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? t('editProductDescription') : t('addProductDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <ProductFormContent 
          product={product}
          onChange={handleChange}
          t={t}
        />
        
        <DialogFooter>
          <ProductFormActions 
            onSave={handleSave}
            onCancel={() => onOpenChange(false)}
            isDisabled={!product.name.trim()}
            saveText={t('save')}
            cancelText={t('cancel')}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
