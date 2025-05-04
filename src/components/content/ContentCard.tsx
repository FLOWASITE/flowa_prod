
import React from 'react';
import { Content } from '@/types';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { PlatformIcon } from './table/PlatformIcon';
import { StatusBadge } from './table/StatusBadge';
import { Button } from '@/components/ui/button';
import { Check, Eye, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

interface ContentCardProps {
  content: Content;
  topicTitle?: string;
  onDelete: () => void;
  onView: () => void;
  onApprove?: () => void;
  onEdit?: () => void;
  isSelected?: boolean;
  onToggleSelection?: () => void;
  selectionDisabled?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({ 
  content, 
  topicTitle,
  onDelete, 
  onView,
  onApprove,
  onEdit,
  isSelected,
  onToggleSelection,
  selectionDisabled = false
}) => {
  return (
    <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-gray-100">
      <CardHeader className="p-3 pb-0 flex flex-row justify-between items-start">
        <div className="flex items-center">
          {onToggleSelection && (
            <Checkbox 
              className="mr-2"
              checked={isSelected} 
              onCheckedChange={() => onToggleSelection()} 
              disabled={selectionDisabled}
            />
          )}
          <PlatformIcon platform={content.platform} />
          <h3 className="text-sm font-medium ml-2">{topicTitle || 'No topic'}</h3>
        </div>
        <StatusBadge status={content.status} />
      </CardHeader>
      <CardContent className="p-3">
        <div className="text-sm line-clamp-3 min-h-[3rem]">
          {content.text}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex flex-col gap-2">
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <div>Created: {format(new Date(content.createdAt), 'dd/MM/yy')}</div>
          {content.approvedAt && (
            <div>Approved: {format(new Date(content.approvedAt), 'dd/MM/yy')}</div>
          )}
        </div>
        <div className="flex justify-between w-full">
          <div className="space-x-1">
            {onApprove && (
              <Button variant="outline" size="sm" onClick={onApprove}>
                <Check className="h-3.5 w-3.5 mr-1" />
                <span>Duyệt</span>
              </Button>
            )}
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-3.5 w-3.5 mr-1" />
                <span>Sửa</span>
              </Button>
            )}
          </div>
          <div className="space-x-1">
            <Button variant="ghost" size="sm" onClick={onView}>
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
