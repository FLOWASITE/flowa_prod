
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCheck, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TopicsTableHeaderProps {
  title: string;
  subtitle: string;
  selectedTopics: string[];
  onBulkApprove: () => void;
  onCreateNew: () => void;
}

export function TopicsTableHeader({
  title,
  subtitle,
  selectedTopics,
  onBulkApprove,
  onCreateNew
}: TopicsTableHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        {selectedTopics.length > 0 && (
          <Button onClick={onBulkApprove} variant="default">
            <CheckCheck className="mr-2 h-4 w-4" />
            Approve Selected ({selectedTopics.length})
          </Button>
        )}
        <Button onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo chủ đề mới
        </Button>
      </div>
    </div>
  );
}
