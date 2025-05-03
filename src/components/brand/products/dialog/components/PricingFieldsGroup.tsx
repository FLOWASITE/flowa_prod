
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '../../translations';

interface PricingFieldsGroupProps {
  product: Product;
  onChange: (field: keyof Product, value: string | number) => void;
  t: (key: string) => string;
}

export function PricingFieldsGroup({ product, onChange, t }: PricingFieldsGroupProps) {
  // Units of measurement options
  const units = ['kg', 'cái', 'mét', 'gói', 'hộp', 'lít'];
  
  // Currency options
  const currencies = ['VND', 'USD', 'IDR', 'SGD'];

  return (
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
            onChange={(e) => onChange('priceAmount', parseFloat(e.target.value) || 0)}
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
            onValueChange={(value) => onChange('priceCurrency', value)}
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
            onValueChange={(value) => onChange('priceUnit', value)}
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
  );
}
