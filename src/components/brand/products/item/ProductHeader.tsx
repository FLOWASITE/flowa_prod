
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductHeaderProps {
  title: string;
  index: number;
  defaultTitle: string;
  onRemove: () => void;
}

export function ProductHeader({ title, index, defaultTitle, onRemove }: ProductHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-2 pb-2 border-b">
      <h4 className="font-medium">
        {title ? title : `${defaultTitle} #${index + 1}`}
      </h4>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onRemove}
        className="h-8 px-2 text-muted-foreground hover:text-destructive"
      >
        &times;
      </Button>
    </div>
  );
}
