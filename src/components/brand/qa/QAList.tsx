
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QAPair } from './types';
import { QAListItem } from './QAListItem';

interface QAListProps {
  qaPairs: QAPair[];
  onDeleteItem: (index: number) => void;
  t: (key: string) => string;
}

export function QAList({ qaPairs, onDeleteItem, t }: QAListProps) {
  return (
    <div>
      <h3 className="font-medium mb-2">{t('qaList')}</h3>
      <ScrollArea className="h-[30vh] border rounded-md">
        {qaPairs.length > 0 ? (
          <div className="p-4 space-y-4">
            {qaPairs.map((pair, index) => (
              <QAListItem 
                key={index} 
                pair={pair} 
                onDelete={() => onDeleteItem(index)} 
                t={t} 
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>No Q&A pairs added yet</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
