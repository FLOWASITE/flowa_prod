import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
  },
  uploadExcel: {
    vi: 'Tải lên file Excel',
    en: 'Upload Excel File',
    fr: 'Télécharger un fichier Excel',
    es: 'Subir archivo Excel',
    th: 'อัปโหลดไฟล์ Excel',
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
      
      if (type === 'qa') {
        const qaPairs = rows.slice(1) // Skip header row
          .filter(row => row.length >= 2 && row[0] && row[1])
          .map(row => ({
            question: row[0].trim().replace(/^"|"$/g, ''),
            answer: row[1].trim().replace(/^"|"$/g, '')
          }));
          
        setPreviewData(qaPairs);
        console.log("Parsed QA data:", qaPairs);
      } else {
        const pricing = rows.slice(1) // Skip header row
          .filter(row => row.length >= 2 && row[0] && row[1])
          .map(row => ({
            product: row[0].trim().replace(/^"|"$/g, ''),
            price: row[1].trim().replace(/^"|"$/g, '')
          }));
          
        setPreviewData(pricing);
        console.log("Parsed pricing data:", pricing);
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
    onImport(previewData);
    setPreviewData([]);
    
    toast({
      title: `${previewData.length} items imported successfully`,
      variant: 'default',
    });
  };
  
  const generateTemplate = (templateType: 'qa' | 'pricing') => {
    let csvContent = '';
    
    if (templateType === 'qa') {
      csvContent = 'Question,Answer\n"What is your company\'s mission?","Our mission is to provide excellent products and services."\n"How can I contact support?","You can reach our support team at support@example.com."';
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
      <div className="p-6">
        <DialogHeader>
          <DialogTitle>{t('importData')}</DialogTitle>
          <DialogDescription>{t('importDescription')}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="flex-1 w-full">
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
                            <TableCell className="align-top">{row.question}</TableCell>
                            <TableCell className="align-top">{row.answer}</TableCell>
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

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            {t('cancel')}
          </Button>
          <Button onClick={handleImport} disabled={previewData.length === 0}>
            {t('import')}
          </Button>
        </DialogFooter>
      </div>

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
