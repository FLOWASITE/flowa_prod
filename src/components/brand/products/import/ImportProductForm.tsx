
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { importTranslations } from './importTranslations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '../translations';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ImportProductFormProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ImportProductForm({ products, onProductsChange }: ImportProductFormProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
  };

  const updateProduct = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = [...products];
    
    if (field === 'features') {
      updatedProducts[index] = {
        ...updatedProducts[index],
        features: value.split(';').map(item => item.trim()).filter(Boolean)
      };
    } else {
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      };
    }
    
    onProductsChange(updatedProducts);
  };

  const addEmptyRow = () => {
    onProductsChange([
      ...products,
      { name: '', pricing: '', description: '', features: [] }
    ]);
  };

  const removeRow = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    onProductsChange(updatedProducts);
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[400px] border rounded-md">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>{t('productName')}</TableHead>
              <TableHead>{t('price')}</TableHead>
              <TableHead>{t('description')}</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  {t('noProducts')}
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input 
                      value={product.name} 
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      placeholder={t('productName')}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={product.pricing} 
                      onChange={(e) => updateProduct(index, 'pricing', e.target.value)}
                      placeholder={t('price')}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      value={product.description} 
                      onChange={(e) => updateProduct(index, 'description', e.target.value)}
                      placeholder={t('description')}
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeRow(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={addEmptyRow}
      >
        <Plus className="h-4 w-4 mr-2" />
        {t('addProductRow')}
      </Button>
    </div>
  );
}
