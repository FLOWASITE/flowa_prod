
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { QAListItemProps } from './types';

export function QAListItem({ pair, onDelete, t }: QAListItemProps) {
  return (
    <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-900 relative">
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-6 w-6 p-0 text-destructive"
        onClick={onDelete}
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">{t('delete')}</span>
      </Button>
      <p className="font-medium text-sm">{t('question')}:</p>
      <p className="mb-2">{pair.question}</p>
      <p className="font-medium text-sm">{t('answer')}:</p>
      <p className="text-muted-foreground">{pair.answer}</p>
    </div>
  );
}
