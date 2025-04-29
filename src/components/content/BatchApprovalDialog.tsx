
import React, { useState } from 'react';
import { Content, Topic } from '@/types';
import { useContentApproval } from '@/hooks/useContentApproval';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BatchApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedContents: Content[];
  topics: Topic[];
  onSuccess?: () => void;
}

export const BatchApprovalDialog: React.FC<BatchApprovalDialogProps> = ({
  open,
  onOpenChange,
  selectedContents,
  topics,
  onSuccess
}) => {
  const { approveContent, isLoading } = useContentApproval();
  const [processingStatus, setProcessingStatus] = useState<{
    total: number;
    processed: number;
    success: number;
    failed: number;
  }>({ total: 0, processed: 0, success: 0, failed: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBatchApprove = async () => {
    if (selectedContents.length === 0) {
      toast.error('Không có nội dung nào được chọn');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus({
      total: selectedContents.length,
      processed: 0,
      success: 0,
      failed: 0
    });

    // Process contents one by one
    for (const content of selectedContents) {
      const topic = topics.find(t => t.id === content.topicId);
      
      if (!topic) {
        setProcessingStatus(prev => ({
          ...prev,
          processed: prev.processed + 1,
          failed: prev.failed + 1
        }));
        continue;
      }

      try {
        const success = await approveContent(content, topic);
        setProcessingStatus(prev => ({
          ...prev,
          processed: prev.processed + 1,
          success: success ? prev.success + 1 : prev.success,
          failed: !success ? prev.failed + 1 : prev.failed
        }));
      } catch (error) {
        console.error('Error approving content:', error);
        setProcessingStatus(prev => ({
          ...prev,
          processed: prev.processed + 1,
          failed: prev.failed + 1
        }));
      }
    }

    setIsProcessing(false);
    
    if (processingStatus.success > 0) {
      toast.success(`Đã duyệt thành công ${processingStatus.success} nội dung`);
      if (onSuccess) onSuccess();
    }
    
    if (processingStatus.failed > 0) {
      toast.error(`Có ${processingStatus.failed} nội dung không thể duyệt`);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Duyệt nhiều nội dung</DialogTitle>
          <DialogDescription>
            Bạn đang chọn {selectedContents.length} nội dung để duyệt. Bạn có chắc chắn muốn tiếp tục?
          </DialogDescription>
        </DialogHeader>

        {isProcessing && (
          <div className="py-3">
            <div className="mb-2 text-sm">
              Đang xử lý {processingStatus.processed}/{processingStatus.total} nội dung...
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(processingStatus.processed / processingStatus.total) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>Thành công: {processingStatus.success}</span>
              <span>Thất bại: {processingStatus.failed}</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleBatchApprove} 
            disabled={isProcessing || selectedContents.length === 0}
          >
            {isProcessing ? 'Đang duyệt...' : 'Duyệt tất cả'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
