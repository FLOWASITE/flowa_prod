
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, File } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Product } from './translations';

const translations = {
  importProducts: {
    vi: 'Nhập sản phẩm',
    en: 'Import Products',
    fr: 'Importer des produits',
    es: 'Importar productos',
    th: 'นำเข้าสินค้า',
  },
  selectFile: {
    vi: 'Chọn file Excel/CSV',
    en: 'Select Excel/CSV file',
    fr: 'Sélectionner un fichier Excel/CSV',
    es: 'Seleccionar archivo Excel/CSV',
    th: 'เลือกไฟล์ Excel/CSV',
  },
  preview: {
    vi: 'Xem trước dữ liệu',
    en: 'Data Preview',
    fr: 'Aperçu des données',
    es: 'Vista previa de datos',
    th: 'ดูตัวอย่างข้อมูล',
  },
  import: {
    vi: 'Nhập',
    en: 'Import',
    fr: 'Importer',
    es: 'Importar',
    th: 'นำเข้า',
  },
  cancel: {
    vi: 'Hủy',
    en: 'Cancel',
    fr: 'Annuler',
    es: 'Cancelar',
    th: 'ยกเลิก',
  },
  invalidFormat: {
    vi: 'File không đúng định dạng. Vui lòng kiểm tra lại.',
    en: 'Invalid file format. Please check the template.',
    fr: 'Format de fichier invalide. Veuillez vérifier le modèle.',
    es: 'Formato de archivo no válido. Por favor, revise la plantilla.',
    th: 'รูปแบบไฟล์ไม่ถูกต้อง โปรดตรวจสอบเทมเพลต',
  },
  downloadTemplate: {
    vi: 'Tải xuống mẫu',
    en: 'Download Template',
    fr: 'Télécharger le modèle',
    es: 'Descargar plantilla',
    th: 'ดาวน์โหลดเทมเพลต',
  },
  importDescription: {
    vi: 'Nhập dữ liệu sản phẩm từ file Excel hoặc CSV. Vui lòng đảm bảo file của bạn có đúng định dạng.',
    en: 'Import product data from Excel or CSV files. Please ensure your file has the correct format.',
    fr: 'Importez des données de produits à partir de fichiers Excel ou CSV. Veuillez vous assurer que votre fichier a le format correct.',
    es: 'Importe datos de productos de archivos Excel o CSV. Asegúrese de que su archivo tenga el formato correcto.',
    th: 'นำเข้าข้อมูลสินค้าจากไฟล์ Excel หรือ CSV โปรดตรวจสอบว่าไฟล์ของคุณมีรูปแบบที่ถูกต้อง',
  },
  downloadConfirm: {
    vi: 'Tải xuống mẫu file',
    en: 'Download Template File',
    fr: 'Télécharger le fichier modèle',
    es: 'Descargar archivo de plantilla',
    th: 'ดาวน์โหลดไฟล์เทมเพลต',
  },
  downloadDescription: {
    vi: 'Tải xuống mẫu file Excel để nhập dữ liệu sản phẩm',
    en: 'Download an Excel template for importing product data',
    fr: 'Télécharger un modèle Excel pour importer des données de produits',
    es: 'Descargar una plantilla Excel para importar datos de productos',
    th: 'ดาวน์โหลดเทมเพลต Excel สำหรับการนำเข้าข้อมูลสินค้า',
  },
  productName: {
    vi: 'Tên sản phẩm',
    en: 'Product Name',
    fr: 'Nom du produit',
    es: 'Nombre del producto',
    th: 'ชื่อสินค้า',
  },
  price: {
    vi: 'Giá',
    en: 'Price',
    fr: 'Prix',
    es: 'Precio',
    th: 'ราคา',
  },
  description: {
    vi: 'Mô tả',
    en: 'Description',
    fr: 'Description',
    es: 'Descripción',
    th: 'คำอธิบาย',
  },
  features: {
    vi: 'Tính năng',
    en: 'Features',
    fr: 'Fonctionnalités',
    es: 'Características',
    th: 'คุณสมบัติ',
  },
  benefits: {
    vi: 'Công dụng',
    en: 'Benefits',
    fr: 'Avantages',
    es: 'Beneficios',
    th: 'ประโยชน์',
  },
  uploadExcel: {
    vi: 'Tải lên file Excel/CSV',
    en: 'Upload Excel/CSV File',
    fr: 'Télécharger un fichier Excel/CSV',
    es: 'Subir archivo Excel/CSV',
    th: 'อัปโหลดไฟล์ Excel/CSV',
  }
};

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

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => {
        const result = [];
        let inQuote = false;
        let current = '';
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            inQuote = !inQuote;
          } else if (char === ',' && !inQuote) {
            result.push(current);
            current = '';
          } else {
            current += char;
          }
        }
        
        result.push(current);
        return result;
      });
      
      // Skip header row
      const products = rows.slice(1)
        .filter(row => row.length >= 5 && row[0])
        .map(row => {
          const features = row[3] ? row[3].replace(/^"|"$/g, '').split(';').filter(Boolean) : [];
          
          return {
            name: row[0].trim().replace(/^"|"$/g, ''),
            pricing: row[1].trim().replace(/^"|"$/g, ''),
            description: row[2].trim().replace(/^"|"$/g, ''),
            features: features,
            benefits: row[4].trim().replace(/^"|"$/g, '')
          };
        });
          
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
  
  const generateTemplate = () => {
    const csvContent = `${t('productName')},${t('price')},${t('description')},${t('features')},${t('benefits')}\n"Product A","$99","This is product A","Feature 1;Feature 2;Feature 3","Improves productivity"\n"Product B","$199","This is product B","Feature 1;Feature 2","Saves time"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products_template.csv';
    link.click();
    URL.revokeObjectURL(link.href);
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
                {t('downloadTemplate')}
              </Button>
            </div>

            {previewData.length > 0 && (
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
                      {previewData.map((product, index) => (
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
            )}
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

      <AlertDialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('downloadConfirm')}</AlertDialogTitle>
          </AlertDialogHeader>
          <p>{t('downloadDescription')}</p>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={generateTemplate}
              className="bg-primary text-primary-foreground"
            >
              {t('downloadTemplate')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
