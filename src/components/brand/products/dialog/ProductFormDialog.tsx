
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { productTranslations, Product } from '../translations';
import { ProductField } from '../item/ProductField';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
        features: [],
      });
    }
  }, [initialProduct, open]);

  const t = (key: keyof typeof productTranslations) => {
    return productTranslations[key][currentLanguage.code] || productTranslations[key].en;
  };

  const handleChange = (field: keyof Product, value: string) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(product);
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
        
        <div className="space-y-4 py-4">
          <ProductField
            id="product-name-dialog"
            label={t('productName')}
            value={product.name}
            onChange={(value) => handleChange('name', value)}
            placeholder="e.g. Web Design Service"
          />
          
          <ProductField
            id="product-pricing-dialog"
            label={t('pricing')}
            value={product.pricing}
            onChange={(value) => handleChange('pricing', value)}
            placeholder="e.g. 200.000đ/month"
          />
          
          <ProductField
            id="product-desc-dialog"
            label={t('productDescription')}
            value={product.description}
            onChange={(value) => handleChange('description', value)}
            placeholder="Describe your product or service..."
            multiline
            rows={4}
          />
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            {t('cancel')}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#ea384c] hover:bg-[#c52940] text-white"
            disabled={!product.name.trim()}
          >
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
