
import React, { useState, useMemo } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Product } from '../translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { productTranslations } from '../translations';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValidationError } from './csvUtils';

interface ProductPreviewTableProps {
  products: Product[];
  validationErrors?: ValidationError[];
}

type SortField = 'name' | 'pricing' | 'description';
type SortDirection = 'asc' | 'desc';

export function ProductPreviewTable({ products, validationErrors = [] }: ProductPreviewTableProps) {
  const { currentLanguage } = useLanguage();
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const t = (key: string) => {
    return productTranslations[key]?.[currentLanguage.code] || productTranslations[key]?.en || key;
  };

  // Create a map of validation errors for easier lookup
  const errorsByRow = useMemo(() => {
    const map = new Map<number, Map<keyof Product, string>>();
    
    validationErrors.forEach(error => {
      if (!map.has(error.row)) {
        map.set(error.row, new Map());
      }
      map.get(error.row)?.set(error.field, error.message);
    });
    
    return map;
  }, [validationErrors]);

  // Sort and filter products
  const filteredAndSortedProducts = useMemo(() => {
    // First filter the products
    let result = products;
    
    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      result = products.filter(product => 
        product.name.toLowerCase().includes(lowerFilter) || 
        product.description.toLowerCase().includes(lowerFilter) || 
        product.pricing.toLowerCase().includes(lowerFilter)
      );
    }
    
    // Then sort them
    return [...result].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
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

  // Check if a field has validation error
  const hasError = (rowIndex: number, field: keyof Product) => {
    // Row index in the filtered list needs to be mapped back to the original data
    const rowNumber = rowIndex + 2; // +1 for zero index and +1 for header
    return errorsByRow.get(rowNumber)?.has(field) || false;
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  {filterText ? t('noMatchingProducts') : t('noProducts')}
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell 
                    className={cn(
                      "font-medium", 
                      hasError(index, 'name') && "bg-red-50 text-red-800 border-b border-red-200"
                    )}
                  >
                    {product.name}
                  </TableCell>
                  <TableCell 
                    className={cn(
                      "", 
                      hasError(index, 'pricing') && "bg-red-50 text-red-800 border-b border-red-200"
                    )}
                  >
                    {product.pricing}
                  </TableCell>
                  <TableCell 
                    className={cn(
                      "max-w-[200px] truncate", 
                      hasError(index, 'description') && "bg-red-50 text-red-800 border-b border-red-200"
                    )}
                  >
                    {product.description}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground p-2 border-t">
        {filterText ? 
          t('filteredProductsCount').replace('{count}', filteredAndSortedProducts.length.toString()).replace('{total}', products.length.toString()) : 
          t('totalProductsCount').replace('{count}', products.length.toString())}
      </div>
    </div>
  );
}
