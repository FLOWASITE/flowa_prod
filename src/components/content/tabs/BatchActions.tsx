
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface BatchActionsProps {
  selectedItemsCount: number;
  onBatchApprove: () => void;
}

export const BatchActions: React.FC<BatchActionsProps> = ({ 
  selectedItemsCount,
  onBatchApprove 
}) => {
  if (selectedItemsCount === 0) return null;
  
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onBatchApprove}
      className="flex items-center gap-1"
    >
      <Check size={16} />
      <span>Duyệt {selectedItemsCount} nội dung</span>
    </Button>
  );
};
