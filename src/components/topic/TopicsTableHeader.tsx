
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCheck, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        {selectedTopics.length > 0 && (
          <Button onClick={onBulkApprove} variant="default" className="w-full md:w-auto">
            <CheckCheck className="mr-2 h-4 w-4" />
            {isMobile ? `Approve (${selectedTopics.length})` : `Approve Selected (${selectedTopics.length})`}
          </Button>
        )}
        <Button onClick={onCreateNew} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {isMobile ? "Tạo mới" : "Tạo chủ đề mới"}
        </Button>
      </div>
    </div>
  );
}
