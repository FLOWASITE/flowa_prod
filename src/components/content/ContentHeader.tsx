
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Plus } from 'lucide-react';

interface ContentHeaderProps {
  selectedContentCount: number;
  onBatchApprove: () => void;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({ 
  selectedContentCount, 
  onBatchApprove 
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Danh sách Nội dung</h1>
        <p className="text-muted-foreground">Tạo, duyệt và quản lý nội dung trên các nền tảng</p>
      </div>
      
      <div className="flex gap-2">
        {selectedContentCount > 0 && (
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={onBatchApprove}
          >
            <CheckCircle2 className="h-4 w-4" />
            Duyệt ({selectedContentCount})
          </Button>
        )}
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Tạo nội dung mới
        </Button>
      </div>
    </div>
  );
};
