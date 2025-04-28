import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, FileText, Trash } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ImportDialog } from './ImportDialog';

const translations = {
  manageQA: {
    vi: 'Quản lý câu hỏi & trả lời',
    en: 'Manage Q&A',
    fr: 'Gérer Q&R',
    es: 'Gestionar preguntas y respuestas',
    th: 'จัดการคำถามและคำตอบ',
  },
  question: {
    vi: 'Câu hỏi',
    en: 'Question',
    fr: 'Question',
    es: 'Pregunta',
    th: 'คำถาม',
  },
  answer: {
    vi: 'Trả lời',
    en: 'Answer',
    fr: 'Réponse',
    es: 'Respuesta',
    th: 'คำตอบ',
  },
  add: {
    vi: 'Thêm',
    en: 'Add',
    fr: 'Ajouter',
    es: 'Añadir',
    th: 'เพิ่ม',
  },
  cancel: {
    vi: 'Hủy',
    en: 'Cancel',
    fr: 'Annuler',
    es: 'Cancelar',
    th: 'ยกเลิก',
  },
  save: {
    vi: 'Lưu',
    en: 'Save',
    fr: 'Enregistrer',
    es: 'Guardar',
    th: 'บันทึก',
  },
  delete: {
    vi: 'Xóa',
    en: 'Delete',
    fr: 'Supprimer',
    es: 'Eliminar',
    th: 'ลบ',
  },
  questionRequired: {
    vi: 'Câu hỏi là bắt buộc',
    en: 'Question is required',
    fr: 'La question est obligatoire',
    es: 'La pregunta es obligatoria',
    th: 'จำเป็นต้องมีคำถาม',
  },
  answerRequired: {
    vi: 'Câu trả lời là bắt buộc',
    en: 'Answer is required',
    fr: 'La réponse est obligatoire',
    es: 'La respuesta es obligatoria',
    th: 'จำเป็นต้องมีคำตอบ',
  },
  qaList: {
    vi: 'Danh sách Q&A',
    en: 'Q&A List',
    fr: 'Liste Q&R',
    es: 'Lista de preguntas y respuestas',
    th: 'รายการคำถามและคำตอบ',
  },
  newQuestion: {
    vi: 'Câu hỏi mới',
    en: 'New Question',
    fr: 'Nouvelle question',
    es: 'Nueva pregunta',
    th: 'คำถามใหม่',
  },
  addQA: {
    vi: 'Thêm Q&A',
    en: 'Add Q&A',
    fr: 'Ajouter Q&R',
    es: 'Añadir preguntas y respuestas',
    th: 'เพิ่มคำถามและคำตอบ',
  },
  totalQA: {
    vi: 'Tổng số Q&A: ',
    en: 'Total Q&A: ',
    fr: 'Total Q&R: ',
    es: 'Total de preguntas y respuestas: ',
    th: 'คำถามและคำตอบทั้งหมด: ',
  }
};

interface QAPair {
  question: string;
  answer: string;
}

interface QADialogProps {
  qaPairs: QAPair[];
  onChange: (qaPairs: QAPair[]) => void;
}

export function QADialog({ qaPairs, onChange }: QADialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [localQAPairs, setLocalQAPairs] = useState<QAPair[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const t = (key: keyof typeof translations) => {
    return translations[key][currentLanguage.code] || translations[key].en;
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setLocalQAPairs([...qaPairs]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  const handleSave = () => {
    onChange(localQAPairs);
    setOpen(false);
  };

  const handleAddQA = () => {
    if (!newQuestion.trim()) {
      toast({
        title: t('questionRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (!newAnswer.trim()) {
      toast({
        title: t('answerRequired'),
        variant: 'destructive',
      });
      return;
    }

    setLocalQAPairs([...localQAPairs, { question: newQuestion.trim(), answer: newAnswer.trim() }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteQA = (index: number) => {
    const updatedQAPairs = [...localQAPairs];
    updatedQAPairs.splice(index, 1);
    setLocalQAPairs(updatedQAPairs);
  };

  const handleImportQA = (importedData: Array<{ question: string; answer: string }>) => {
    setLocalQAPairs([...localQAPairs, ...importedData]);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{t('manageQA')}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {t('totalQA')} {qaPairs.length}
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('manageQA')}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{t('addQA')}</h3>
            <ImportDialog type="qa" onImport={handleImportQA} />
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="font-medium">{t('addQA')}</h3>
            <div className="space-y-2">
              <Label htmlFor="newQuestion">{t('question')}</Label>
              <Input
                id="newQuestion"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder={t('newQuestion')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newAnswer">{t('answer')}</Label>
              <Textarea
                id="newAnswer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder={t('answer')}
                rows={3}
              />
            </div>
            
            <Button type="button" onClick={handleAddQA} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> {t('add')}
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t('qaList')}</h3>
            <ScrollArea className="h-[40vh] border rounded-md">
              {localQAPairs.length > 0 ? (
                <div className="p-4 space-y-4">
                  {localQAPairs.map((pair, index) => (
                    <div key={index} className="border rounded-md p-3 bg-gray-50 dark:bg-gray-900 relative">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive"
                        onClick={() => handleDeleteQA(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <p className="font-medium text-sm">{t('question')}:</p>
                      <p className="mb-2">{pair.question}</p>
                      <p className="font-medium text-sm">{t('answer')}:</p>
                      <p className="text-muted-foreground">{pair.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No Q&A pairs added yet</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSave}>
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
