
import React from 'react';
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
import { Topic } from '@/types';
import { TopicStatusBadge } from './TopicStatusBadge';

interface TopicApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic: Topic | null;
  onApprove: () => void;
  isLoading: boolean;
  action: 'approve' | 'reject';
}

export const TopicApprovalDialog: React.FC<TopicApprovalDialogProps> = ({
  open,
  onOpenChange,
  topic,
  onApprove,
  isLoading,
  action
}) => {
  const isApprove = action === 'approve';
  
  if (!topic) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isApprove ? 'Duyệt chủ đề này?' : 'Từ chối chủ đề này?'}
          </DialogTitle>
          <DialogDescription>
            {isApprove 
              ? 'Chủ đề này sẽ được duyệt và nội dung sẽ được tự động tạo cho các nền tảng mạng xã hội.'
              : 'Chủ đề này sẽ bị từ chối và không thể tạo nội dung cho nó.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Tiêu đề:</h3>
            <p className="mt-1">{topic.title}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Mô tả:</h3>
            <p className="mt-1 text-sm">{topic.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Trạng thái hiện tại:</h3>
            <div className="mt-1">
              <TopicStatusBadge status={topic.status} />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={onApprove}
            disabled={isLoading}
            variant={isApprove ? "default" : "destructive"}
          >
            {isLoading 
              ? 'Đang xử lý...' 
              : isApprove 
                ? 'Duyệt chủ đề' 
                : 'Từ chối chủ đề'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
