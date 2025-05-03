
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Product } from '../translations';
import { ValidationError } from './csvUtils';
import { ImportProductForm } from './ImportProductForm';
import { TemplateDownloadDialog } from './TemplateDownloadDialog';
import { CsvImportTab } from './tabs/CsvImportTab';
import { ImportDialogFooter } from './ImportDialogFooter';
import { productTranslations } from '../translations';

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

  const t = (key: string) => {
    return productTranslations[key]?.[currentLanguage.code] || productTranslations[key]?.en || key;
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
            <DialogDescription>{t('importOrAddDirectly')}</DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">{t('csvPreview')}</TabsTrigger>
              <TabsTrigger value="manual">{t('manualEntry')}</TabsTrigger>
            </TabsList>
            <p className="text-xs text-muted-foreground mt-1 text-center">{t('tabsNote')}</p>
            
            <TabsContent value="csv" className="mt-4">
              <CsvImportTab 
                previewData={previewData}
                setPreviewData={setPreviewData}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                onOpenTemplateDialog={() => setTemplateDialogOpen(true)}
              />
            </TabsContent>
            
            <TabsContent value="manual" className="mt-4">
              <ImportProductForm 
                products={manualProducts} 
                onProductsChange={setManualProducts} 
              />
            </TabsContent>
          </Tabs>

          <ImportDialogFooter
            onCancel={() => onOpenChange(false)}
            onImport={handleImport}
            isImportDisabled={isImportDisabled()}
          />
        </DialogContent>
      </Dialog>

      <TemplateDownloadDialog 
        open={templateDialogOpen} 
        onOpenChange={setTemplateDialogOpen} 
      />
    </>
  );
}
