import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Topic } from '@/types/content';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { TopicStatusBadge } from './TopicStatusBadge';
import { TopicProductBadge } from './table/TopicProductBadge';

interface ViewTopicDialogProps {
  topic: Topic;
  onClose: () => void;
}

export const ViewTopicDialog: React.FC<ViewTopicDialogProps> = ({ topic, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chi tiết chủ đề</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">ID:</div>
            <div className="col-span-3 text-sm break-all">{topic.id}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Tiêu đề:</div>
            <div className="col-span-3">{topic.title}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Mô tả:</div>
            <div className="col-span-3">{topic.description}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Phân loại:</div>
            <div className="col-span-3">
              <Badge variant="secondary">
                {topic.themeTypeId || 'General'}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Sản phẩm:</div>
            <div className="col-span-3">
              <TopicProductBadge productTypeId={topic.productTypeId} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Trạng thái:</div>
            <div className="col-span-3">
              <TopicStatusBadge status={topic.status} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Ngày tạo:</div>
            <div className="col-span-3">{format(topic.createdAt, 'dd/MM/yyyy HH:mm')}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 font-medium">Cập nhật:</div>
            <div className="col-span-3">{format(topic.updatedAt, 'dd/MM/yyyy HH:mm')}</div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
