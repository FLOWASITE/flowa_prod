
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { QAAddFormProps } from './types';

export function QAAddForm({ onAdd, t }: QAAddFormProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleAddClick = () => {
    onAdd(newQuestion, newAnswer);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
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
      
      <Button 
        type="button" 
        onClick={handleAddClick} 
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> {t('add')}
      </Button>
    </div>
  );
}
