
import React from 'react';
import { Content } from '@/types';
import { StatusBadge } from '../table/StatusBadge';
import { PlatformIcon } from '../table/PlatformIcon';
import { TableActions } from '../table/TableActions';

interface AccordionItemProps {
  content: Content;
  onApprove: (content: Content) => void;
  onView: (content: Content) => void;
  onDelete: (contentId: string) => void;
  showApproveColumn?: boolean;
  formatDate: (date: Date | undefined) => string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  content,
  onApprove,
  onView,
  onDelete,
  showApproveColumn = true,
  formatDate
}) => {
  return (
    <div 
      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors"
    >
      <div className="w-12 flex justify-center">
        <PlatformIcon platform={content.platform} />
      </div>
      <div className="flex-grow">
        <div className="truncate text-sm">
          {content.text.length > 80 
            ? `${content.text.substring(0, 80)}...` 
            : content.text
          }
        </div>
        <div className="flex gap-3 mt-1 text-xs text-gray-500">
          <span>Tạo: {formatDate(content.createdAt)}</span>
          {content.approvedAt && (
            <span>Duyệt: {formatDate(content.approvedAt)}</span>
          )}
          <StatusBadge status={content.status} />
        </div>
      </div>
      <div className="flex-shrink-0">
        {content.imageUrl && (
          <div className="h-12 w-12 relative rounded-lg overflow-hidden shadow-sm">
            <img 
              src={content.imageUrl} 
              alt="Nội dung" 
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex-shrink-0">
        <TableActions 
          item={content} 
          onApprove={onApprove}
          onView={onView}
          onDelete={onDelete}
          showApproveColumn={showApproveColumn}
        />
      </div>
    </div>
  );
};
