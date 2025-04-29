
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Content, Topic } from '@/types';
import { useContentApproval } from '@/hooks/useContentApproval';
import { toast } from 'sonner';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { PlatformIcon } from './PlatformIcon';

interface BatchApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contents: Content[];
  topics: Topic[];
  onApproved?: () => void;
}

export const BatchApprovalDialog: React.FC<BatchApprovalDialogProps> = ({
  open,
  onOpenChange,
  contents,
  topics,
  onApproved,
}) => {
  const { approveContent, isLoading } = useContentApproval();
  const [processingContents, setProcessingContents] = useState<string[]>([]);
  const [completedContents, setCompletedContents] = useState<string[]>([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const handleBatchApprove = async () => {
    if (isLoading || isBatchProcessing) return;
    
    setIsBatchProcessing(true);
    let successCount = 0;
    
    for (const content of contents) {
      const topic = topics.find(t => t.id === content.topicId);
      if (!topic) continue;
      
      setProcessingContents(prev => [...prev, content.id]);
      
      try {
        const success = await approveContent(content, topic);
        if (success) {
          successCount++;
          setCompletedContents(prev => [...prev, content.id]);
        }
      } catch (error) {
        console.error(`Error approving content ${content.id}:`, error);
      } finally {
        setProcessingContents(prev => prev.filter(id => id !== content.id));
      }
    }
    
    setIsBatchProcessing(false);
    
    if (successCount === contents.length) {
      toast.success(`Đã duyệt thành công ${successCount} nội dung`);
      onOpenChange(false);
      if (onApproved) onApproved();
    } else if (successCount > 0) {
      toast.warning(`Đã duyệt ${successCount}/${contents.length} nội dung`);
    } else {
      toast.error('Không có nội dung nào được duyệt thành công');
    }
  };
  
  const isContentProcessing = (contentId: string) => 
    processingContents.includes(contentId);
  
  const isContentCompleted = (contentId: string) => 
    completedContents.includes(contentId);

  return (
    <Dialog open={open} onOpenChange={isBatchProcessing ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Duyệt hàng loạt</DialogTitle>
          <DialogDescription>
            Duyệt {contents.length} nội dung đã chọn. Dữ liệu liên quan sẽ được tự động tạo trong phần Quản lý dữ liệu.
          </DialogDescription>
        </DialogHeader>

        {contents.length > 0 && (
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {contents.map(content => {
              const topic = topics.find(t => t.id === content.topicId);
              const isProcessing = isContentProcessing(content.id);
              const isCompleted = isContentCompleted(content.id);
              
              return (
                <div 
                  key={content.id} 
                  className={`p-3 border rounded-md flex gap-3 items-start ${
                    isCompleted ? 'bg-green-50 border-green-200' : ''
                  }`}
                >
                  <div className="mt-1">
                    <PlatformIcon platform={content.platform} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{topic?.title || 'Không có chủ đề'}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{content.text}</p>
                  </div>
                  <div className="flex-shrink-0 w-6">
                    {isProcessing ? (
                      <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="outline"
              disabled={isBatchProcessing}
            >
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handleBatchApprove}
            disabled={isLoading || isBatchProcessing}
            className="min-w-[120px]"
          >
            {isBatchProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Duyệt tất cả
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
