
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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

  // Units of measurement options
  const units = ['kg', 'cái', 'mét', 'gói', 'hộp', 'lít'];
  
  // Currency options
  const currencies = ['VND', 'USD', 'IDR', 'SGD'];

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
          
          {/* Pricing fields */}
          <div>
            <Label className="mb-2 block">{t('pricing')}</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="price-amount" className="text-sm text-muted-foreground mb-1">
                  {t('priceAmount')}
                </Label>
                <Input
                  id="price-amount"
                  type="number"
                  value={product.priceAmount || ''}
                  onChange={(e) => handleChange('priceAmount', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="price-currency" className="text-sm text-muted-foreground mb-1">
                  {t('priceCurrency')}
                </Label>
                <Select
                  value={product.priceCurrency || 'VND'}
                  onValueChange={(value) => handleChange('priceCurrency', value)}
                >
                  <SelectTrigger id="price-currency">
                    <SelectValue placeholder="VND" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="price-unit" className="text-sm text-muted-foreground mb-1">
                  {t('priceUnit')}
                </Label>
                <Select 
                  value={product.priceUnit || ''}
                  onValueChange={(value) => handleChange('priceUnit', value)}
                >
                  <SelectTrigger id="price-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
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
