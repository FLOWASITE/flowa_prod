
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
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

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
  };

  const handleImport = () => {
    onImport(previewData);
    setOpen(false);
    setPreviewData([]);
  };

  return (
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
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="w-full gap-2" asChild>
                <span>
                  <FileSpreadsheet className="h-4 w-4" />
                  {t('selectFile')}
                </span>
              </Button>
            </label>
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
  );
}
