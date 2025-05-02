
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '../translations';
import { importTranslations } from './importTranslations';
import { ProductPreviewTable } from './ProductPreviewTable';
import { TemplateDownloadDialog } from './TemplateDownloadDialog';
import { parseCsvToProducts } from './csvUtils';

interface ImportProductsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportProducts: (products: Product[]) => void;
}

export function ImportProductsDialog({ open, onOpenChange, onImportProducts }: ImportProductsDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [previewData, setPreviewData] = useState<Product[]>([]);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  const t = (key: keyof typeof importTranslations) => {
    return importTranslations[key][currentLanguage.code] || importTranslations[key].en;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const products = await parseCsvToProducts(file);
      setPreviewData(products);
      console.log("Parsed product data:", products);
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
    onImportProducts(previewData);
    setPreviewData([]);
    onOpenChange(false);
    
    toast({
      title: `${previewData.length} ${previewData.length === 1 ? 'product' : 'products'} imported successfully`,
      variant: 'default',
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('importProducts')}</DialogTitle>
            <DialogDescription>{t('importDescription')}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
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

            {previewData.length > 0 && <ProductPreviewTable products={previewData} />}
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleImport} disabled={previewData.length === 0}>
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
