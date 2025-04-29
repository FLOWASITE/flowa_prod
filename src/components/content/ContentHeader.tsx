
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ContentHeaderProps {
  title: string;
  description: string;
  onCreateNew?: () => void;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({ 
  title, 
  description,
  onCreateNew
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {onCreateNew && (
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" /> Tạo nội dung mới
        </Button>
      )}
    </div>
  );
};
