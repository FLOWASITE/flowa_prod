
import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Product } from '../translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { importTranslations } from './importTranslations';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductPreviewTableProps {
  products: Product[];
}

type SortField = 'name' | 'pricing' | 'description' | 'features' | 'benefits';
type SortDirection = 'asc' | 'desc';

export function ProductPreviewTable({ products }: ProductPreviewTableProps) {
  const { currentLanguage } = useLanguage();
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
  };

  // Sort and filter products
  const filteredAndSortedProducts = useMemo(() => {
    // First filter the products
    let result = products;
    
    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      result = products.filter(product => 
        product.name.toLowerCase().includes(lowerFilter) || 
        product.description.toLowerCase().includes(lowerFilter) || 
        product.features.some(feature => feature.toLowerCase().includes(lowerFilter)) ||
        (product.benefits && product.benefits.toLowerCase().includes(lowerFilter))
      );
    }
    
    // Then sort them
    return [...result].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle special cases for features which is an array
      if (sortField === 'features') {
        aValue = a.features.join(', ');
        bValue = b.features.join(', ');
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [products, filterText, sortField, sortDirection]);
  
  // Toggle sort direction or change sort field
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Render sort indicator
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="inline h-4 w-4 ml-1" /> 
      : <ChevronDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="border rounded-lg">
      <h3 className="font-medium px-4 py-2 border-b">{t('preview')}</h3>
      
      <div className="p-2 border-b">
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            placeholder={t('filterProducts')}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="max-w-sm text-sm"
          />
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className={cn("cursor-pointer hover:bg-muted/50", sortField === 'name' && "bg-muted/30")}
                onClick={() => handleSort('name')}
              >
                {t('productName')} <SortIndicator field="name" />
              </TableHead>
              <TableHead 
                className={cn("cursor-pointer hover:bg-muted/50", sortField === 'pricing' && "bg-muted/30")}
                onClick={() => handleSort('pricing')}
              >
                {t('price')} <SortIndicator field="pricing" />
              </TableHead>
              <TableHead 
                className={cn("cursor-pointer hover:bg-muted/50", sortField === 'description' && "bg-muted/30")}
                onClick={() => handleSort('description')}
              >
                {t('description')} <SortIndicator field="description" />
              </TableHead>
              <TableHead 
                className={cn("cursor-pointer hover:bg-muted/50", sortField === 'features' && "bg-muted/30")}
                onClick={() => handleSort('features')}
              >
                {t('features')} <SortIndicator field="features" />
              </TableHead>
              <TableHead 
                className={cn("cursor-pointer hover:bg-muted/50", sortField === 'benefits' && "bg-muted/30")}
                onClick={() => handleSort('benefits')}
              >
                {t('benefits')} <SortIndicator field="benefits" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  {filterText ? t('noMatchingProducts') : t('noProducts')}
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.pricing}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{product.description}</TableCell>
                  <TableCell>{product.features.join(', ')}</TableCell>
                  <TableCell>{product.benefits}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground p-2 border-t">
        {filterText ? 
          t('filteredProductsCount', { count: filteredAndSortedProducts.length, total: products.length }) : 
          t('totalProductsCount', { count: products.length })}
      </div>
    </div>
  );
}
