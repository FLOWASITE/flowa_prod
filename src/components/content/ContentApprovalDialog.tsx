
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
import { Content, Topic } from '@/types';
import { useContentApproval } from '@/hooks/useContentApproval';

interface ContentApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: Content | null;
  topic: Topic | null;
  onApproved?: () => void;
}

export const ContentApprovalDialog: React.FC<ContentApprovalDialogProps> = ({
  open,
  onOpenChange,
  content,
  topic,
  onApproved,
}) => {
  const { approveContent, isLoading } = useContentApproval();

  const handleApprove = async () => {
    if (!content || !topic) return;
    
    const success = await approveContent(content, topic);
    
    if (success) {
      onOpenChange(false);
      if (onApproved) onApproved();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Duyệt nội dung</DialogTitle>
          <DialogDescription>
            Nội dung này sẽ được duyệt và thêm vào lịch đăng bài. Dữ liệu liên quan sẽ được tự động tạo trong phần Quản lý dữ liệu.
          </DialogDescription>
        </DialogHeader>

        {content && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Nội dung:</h3>
              <p className="text-sm">{content.text}</p>
            </div>
            
            {content.imageUrl && (
              <div>
                <h3 className="font-medium">Hình ảnh:</h3>
                <div className="mt-2 rounded-md overflow-hidden">
                  <img 
                    src={content.imageUrl} 
                    alt="Content preview" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-medium">Nền tảng:</h3>
              <p className="text-sm capitalize">{content.platform}</p>
            </div>
          </div>
        )}

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handleApprove}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Duyệt nội dung'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
