
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Content } from '@/types';
import { CheckCircle2, Edit, Eye, Share2, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ContentCardFooterProps {
  content: Content;
  onApprove?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
}

export const ContentCardFooter: React.FC<ContentCardFooterProps> = ({ 
  content, 
  onApprove, 
  onDelete, 
  onView,
  onEdit
}) => {
  return (
    <CardFooter className="pt-2 border-t flex justify-between">
      <div className="flex gap-1">
        {onEdit && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chỉnh sửa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {onView && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onView}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xem chi tiết</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {(content.status === 'approved' || content.status === 'scheduled' || content.status === 'published') && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chia sẻ</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {onDelete && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500" onClick={onDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {content.status === 'draft' && onApprove && (
        <Button variant="default" size="sm" onClick={onApprove}>
          <CheckCircle2 className="h-4 w-4 mr-1" /> Duyệt
        </Button>
      )}
    </CardFooter>
  );
};
