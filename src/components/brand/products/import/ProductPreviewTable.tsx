
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Product } from '../translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { importTranslations } from './importTranslations';

interface ProductPreviewTableProps {
  products: Product[];
}

export function ProductPreviewTable({ products }: ProductPreviewTableProps) {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
  };

  return (
    <div className="border rounded-lg">
      <h3 className="font-medium px-4 py-2 border-b">{t('preview')}</h3>
      <div className="max-h-[400px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('productName')}</TableHead>
              <TableHead>{t('price')}</TableHead>
              <TableHead>{t('description')}</TableHead>
              <TableHead>{t('features')}</TableHead>
              <TableHead>{t('benefits')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.pricing}</TableCell>
                <TableCell className="max-w-[200px] truncate">{product.description}</TableCell>
                <TableCell>{product.features.join(', ')}</TableCell>
                <TableCell>{product.benefits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
