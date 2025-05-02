
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { importTranslations } from '../importTranslations';
import { Product } from '../../translations';
import { ProductPreviewTable } from '../ProductPreviewTable';
import { parseCsvToProducts, ValidationError } from '../csvUtils';

interface CsvImportTabProps {
  previewData: Product[];
  setPreviewData: React.Dispatch<React.SetStateAction<Product[]>>;
  validationErrors: ValidationError[];
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>;
  onOpenTemplateDialog: () => void;
}

export function CsvImportTab({
  previewData,
  setPreviewData,
  validationErrors,
  setValidationErrors,
  onOpenTemplateDialog
}: CsvImportTabProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { products, validationErrors } = await parseCsvToProducts(file);
      setPreviewData(products);
      setValidationErrors(validationErrors);
      
      if (validationErrors.length > 0) {
        toast({
          title: t('validationErrors'),
          description: `${validationErrors.length} issues found`,
          variant: 'destructive',
        });
      } else if (products.length > 0) {
        toast({
          title: t('validationSuccess'),
          variant: 'default',
        });
      }
    } catch (error) {
      console.error("CSV parsing error:", error);
      toast({
        title: t('invalidFormat'),
        variant: 'destructive',
      });
    }
    
    event.target.value = '';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
          id="product-file-upload"
        />
        <label htmlFor="product-file-upload" className="flex-1 w-full">
          <Button variant="default" className="w-full gap-2" asChild>
            <span>
              <Upload className="h-4 w-4" />
              {t('uploadExcel')}
            </span>
          </Button>
        </label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onOpenTemplateDialog}
          className="w-full md:w-auto"
        >
          <FileText className="h-4 w-4 mr-2" />
          {t('downloadTemplate')}
        </Button>
      </div>

      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t('validationErrors')}</AlertTitle>
          <AlertDescription>
            <div className="text-sm mt-2">
              <p>{t('validationErrorsDescription')}</p>
              <ul className="list-disc ml-6 mt-2">
                {validationErrors.slice(0, 5).map((error, index) => (
                  <li key={index}>
                    {t('rowNumber')} {error.row}: {error.field} {error.message}
                  </li>
                ))}
                {validationErrors.length > 5 && (
                  <li>...and {validationErrors.length - 5} more errors</li>
                )}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {validationErrors.length === 0 && previewData.length > 0 && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">{t('validationSuccess')}</AlertTitle>
        </Alert>
      )}

      {previewData.length > 0 && (
        <ProductPreviewTable 
          products={previewData} 
          validationErrors={validationErrors} 
        />
      )}
    </div>
  );
}
