
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
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImportDialog } from './ImportDialog';
import { qaTranslations } from './qa/translations';
import { QAPair } from './qa/types';
import { QAAddForm } from './qa/QAAddForm';
import { QAList } from './qa/QAList';
import { QADialogHeader } from './qa/QADialogHeader';

interface QADialogProps {
  qaPairs: QAPair[];
  onChange: (qaPairs: QAPair[]) => void;
}

export function QADialog({ qaPairs, onChange }: QADialogProps) {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [localQAPairs, setLocalQAPairs] = useState<QAPair[]>([]);
  
  const t = (key: keyof typeof qaTranslations) => {
    return qaTranslations[key][currentLanguage.code] || qaTranslations[key].en;
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setLocalQAPairs([...qaPairs]);
    }
  };

  const handleSave = () => {
    onChange(localQAPairs);
    setOpen(false);
    
    toast({
      title: `${localQAPairs.length} Q&A pairs saved`,
      description: "Your Q&A knowledge base has been updated",
    });
  };

  const handleAddQA = (question: string, answer: string) => {
    if (!question.trim()) {
      toast({
        title: t('questionRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (!answer.trim()) {
      toast({
        title: t('answerRequired'),
        variant: 'destructive',
      });
      return;
    }

    setLocalQAPairs([...localQAPairs, { question: question.trim(), answer: answer.trim() }]);
  };

  const handleDeleteQA = (index: number) => {
    const updatedQAPairs = [...localQAPairs];
    updatedQAPairs.splice(index, 1);
    setLocalQAPairs(updatedQAPairs);
  };

  const handleImportQA = (importedData: Array<{ question: string; answer: string }>) => {
    console.log("Importing QA data:", importedData);
    setLocalQAPairs([...localQAPairs, ...importedData]);
    
    toast({
      title: `${importedData.length} Q&A pairs imported`,
      description: "Q&A pairs have been added to your list",
    });
    
    setImportDialogOpen(false);
  };

  return (
    <>
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
        
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t('manageQA')}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 mt-2 overflow-y-auto flex-1 px-1">
            <QADialogHeader 
              onImportClick={() => setImportDialogOpen(true)} 
              t={t} 
            />

            <QAAddForm 
              onAdd={handleAddQA} 
              t={t} 
            />
            
            <QAList 
              qaPairs={localQAPairs} 
              onDeleteItem={handleDeleteQA} 
              t={t} 
            />
          </div>
          
          <DialogFooter className="pt-4 border-t mt-4 sticky bottom-0 bg-background">
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSave}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {importDialogOpen && (
        <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
          <DialogContent className="p-0 max-w-3xl overflow-hidden">
            <ImportDialog type="qa" onImport={handleImportQA} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
