
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileSpreadsheet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

const translations = {
  importData: {
    vi: 'Nhập dữ liệu',
    en: 'Import Data',
    fr: 'Importer des données',
    es: 'Importar datos',
    th: 'นำเข้าข้อมูล',
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
    vi: 'Nhập dữ liệu từ file Excel hoặc CSV. Vui lòng đảm bảo file của bạn có đúng định dạng.',
    en: 'Import data from Excel or CSV files. Please ensure your file has the correct format.',
    fr: 'Importez des données à partir de fichiers Excel ou CSV. Veuillez vous assurer que votre fichier a le format correct.',
    es: 'Importe datos de archivos Excel o CSV. Asegúrese de que su archivo tenga el formato correcto.',
    th: 'นำเข้าข้อมูลจากไฟล์ Excel หรือ CSV โปรดตรวจสอบว่าไฟล์ของคุณมีรูปแบบที่ถูกต้อง',
  },
  downloadConfirm: {
    vi: 'Tải xuống mẫu file',
    en: 'Download Template File',
    fr: 'Télécharger le fichier modèle',
    es: 'Descargar archivo de plantilla',
    th: 'ดาวน์โหลดไฟล์เทมเพลต',
  },
  downloadDescription: {
    vi: 'Tải xuống mẫu file Excel để nhập dữ liệu',
    en: 'Download an Excel template for importing data',
    fr: 'Télécharger un modèle Excel pour importer des données',
    es: 'Descargar una plantilla Excel para importar datos',
    th: 'ดาวน์โหลดเทมเพลต Excel สำหรับการนำเข้าข้อมูล',
  },
  downloadQATemplate: {
    vi: 'Mẫu Q&A',
    en: 'Q&A Template',
    fr: 'Modèle Q&R',
    es: 'Plantilla de preguntas y respuestas',
    th: 'เทมเพลตคำถามและคำตอบ',
  },
  downloadPricingTemplate: {
    vi: 'Mẫu giá sản phẩm',
    en: 'Pricing Template',
    fr: 'Modèle de tarification',
    es: 'Plantilla de precios',
    th: 'เทมเพลตราคา',
  }
};

interface ImportDialogProps {
  onImport: (data: any[]) => void;
  type: 'qa' | 'pricing';
}

export function ImportDialog({ onImport, type }: ImportDialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      
      if (type === 'qa') {
        const qaPairs = rows.slice(1) // Skip header row
          .filter(row => row.length >= 2 && row[0] && row[1])
          .map(row => ({
            question: row[0].trim(),
            answer: row[1].trim()
          }));
        setPreviewData(qaPairs);
      } else {
        const pricing = rows.slice(1) // Skip header row
          .filter(row => row.length >= 2 && row[0] && row[1])
          .map(row => ({
            product: row[0].trim(),
            price: row[1].trim()
          }));
        setPreviewData(pricing);
      }
    } catch (error) {
      toast({
        title: t('invalidFormat'),
        variant: 'destructive',
      });
    }
    
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  const handleImport = () => {
    onImport(previewData);
    setOpen(false);
    setPreviewData([]);
    
    toast({
      title: `${previewData.length} items imported successfully`,
      variant: 'default',
    });
  };
  
  const generateTemplate = (templateType: 'qa' | 'pricing') => {
    let csvContent = '';
    
    if (templateType === 'qa') {
      csvContent = 'Question,Answer\n"What is your company's mission?","Our mission is to provide excellent products and services."\n"How can I contact support?","You can reach our support team at support@example.com."';
    } else {
      csvContent = 'Product,Price\n"Basic Package","$99"\n"Premium Service","$199"';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = templateType === 'qa' ? 'qa_template.csv' : 'pricing_template.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            {t('importData')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('importData')}</DialogTitle>
            <DialogDescription>{t('importDescription')}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="flex-1">
                <Button variant="outline" className="w-full gap-2" asChild>
                  <span>
                    <FileSpreadsheet className="h-4 w-4" />
                    {t('selectFile')}
                  </span>
                </Button>
              </label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTemplateDialogOpen(true)}
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
                        {type === 'qa' ? (
                          <>
                            <TableHead>Question</TableHead>
                            <TableHead>Answer</TableHead>
                          </>
                        ) : (
                          <>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                          </>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((row, index) => (
                        <TableRow key={index}>
                          {type === 'qa' ? (
                            <>
                              <TableCell>{row.question}</TableCell>
                              <TableCell>{row.answer}</TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>{row.product}</TableCell>
                              <TableCell>{row.price}</TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
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
              onClick={() => generateTemplate(type)}
              className="bg-primary text-primary-foreground"
            >
              {type === 'qa' ? t('downloadQATemplate') : t('downloadPricingTemplate')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
