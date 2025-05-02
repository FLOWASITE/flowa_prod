
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Product } from '../translations';
import { importTranslations } from './importTranslations';
import { ProductPreviewTable } from './ProductPreviewTable';
import { ImportProductForm } from './ImportProductForm';
import { TemplateDownloadDialog } from './TemplateDownloadDialog';
import { parseCsvToProducts, ValidationError } from './csvUtils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ImportProductsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportProducts: (products: Product[]) => void;
}

export function ImportProductsDialog({ open, onOpenChange, onImportProducts }: ImportProductsDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [previewData, setPreviewData] = useState<Product[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("csv");
  const [manualProducts, setManualProducts] = useState<Product[]>([]);

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

  const handleImport = () => {
    if (activeTab === "csv") {
      if (validationErrors.length > 0) {
        toast({
          title: t('validationErrors'),
          description: t('validationErrorsDescription'),
          variant: 'destructive',
        });
        return;
      }
      
      onImportProducts(previewData);
      setPreviewData([]);
      setValidationErrors([]);
      
      toast({
        title: `${previewData.length} ${previewData.length === 1 ? 'product' : 'products'} imported successfully`,
        variant: 'default',
      });
    } else {
      // Validate manual products
      const hasEmptyFields = manualProducts.some(
        product => !product.name || !product.pricing || !product.description || product.features.length === 0
      );
      
      if (hasEmptyFields) {
        toast({
          title: t('validationErrors'),
          description: t('validationErrorsDescription'),
          variant: 'destructive',
        });
        return;
      }
      
      onImportProducts(manualProducts);
      setManualProducts([]);
      
      toast({
        title: `${manualProducts.length} ${manualProducts.length === 1 ? 'product' : 'products'} imported successfully`,
        variant: 'default',
      });
    }
    
    onOpenChange(false);
  };

  const isImportDisabled = () => {
    if (activeTab === "csv") {
      return previewData.length === 0 || validationErrors.length > 0;
    } else {
      return manualProducts.length === 0;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('importProducts')}</DialogTitle>
            <DialogDescription>{t('importDescription')}</DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">{t('csvPreview')}</TabsTrigger>
              <TabsTrigger value="manual">{t('manualEntry')}</TabsTrigger>
            </TabsList>
            <p className="text-xs text-muted-foreground mt-1 text-center">{t('tabsNote')}</p>
            
            <TabsContent value="csv" className="mt-4">
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
                    onClick={() => setTemplateDialogOpen(true)}
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
            </TabsContent>
            
            <TabsContent value="manual" className="mt-4">
              <ImportProductForm 
                products={manualProducts} 
                onProductsChange={setManualProducts} 
              />
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('cancel')}
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={isImportDisabled()}
            >
              {t('import')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TemplateDownloadDialog 
        open={templateDialogOpen} 
        onOpenChange={setTemplateDialogOpen} 
      />
    </>
  );
}
