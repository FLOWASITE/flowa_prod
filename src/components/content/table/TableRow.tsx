
import React from 'react';
import { TableRow as UITableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Content, Topic } from '@/types';
import { StatusBadge } from './StatusBadge';
import { PlatformIcon } from './PlatformIcon';
import { TableActions } from './TableActions';

interface TableRowProps {
  item: Content;
  index: number;
  currentPage: number;
  rowsPerPage: number;
  topic: Topic | undefined;
  formatDate: (date: Date | undefined) => string;
  showApprovalColumns: boolean;
  showApproveColumn: boolean;
  showBatchSelection: boolean;
  isSelected: boolean;
  onToggleSelection?: (contentId: string) => void;
  onApprove: (content: Content) => void;
  onView: (content: Content) => void;
  onDelete: (contentId: string) => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  item,
  index,
  currentPage,
  rowsPerPage,
  topic,
  formatDate,
  showApprovalColumns,
  showApproveColumn,
  showBatchSelection,
  isSelected,
  onToggleSelection,
  onApprove,
  onView,
  onDelete
}) => {
  const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
  
  return (
    <UITableRow className="hover:bg-gray-50 transition-colors border-b border-gray-100">
      {showBatchSelection && (
        <TableCell>
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onToggleSelection && onToggleSelection(item.id)}
            disabled={item.status !== 'draft'}
          />
        </TableCell>
      )}
      <TableCell className="font-medium text-center">{displayIndex}</TableCell>
      <TableCell className="font-medium">{topic?.title || 'Không có chủ đề'}</TableCell>
      <TableCell className="text-center">
        <PlatformIcon platform={item.platform} />
      </TableCell>
      <TableCell>
        <div className="truncate max-w-xs" title={item.text}>
          {item.text.substring(0, 40)}...
        </div>
      </TableCell>
      <TableCell>
        {item.imageUrl && (
          <div className="h-12 w-12 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <img 
              src={item.imageUrl} 
              alt="Nội dung" 
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </TableCell>
      <TableCell>{formatDate(item.createdAt)}</TableCell>
      {showApprovalColumns && (
        <>
          <TableCell>AI Assistant</TableCell>
          <TableCell>{formatDate(item.approvedAt)}</TableCell>
        </>
      )}
      <TableCell>
        <StatusBadge status={item.status} />
      </TableCell>
      <TableCell>
        <TableActions
          item={item}
          onApprove={onApprove}
          onView={onView}
          onDelete={onDelete}
          showApproveColumn={showApproveColumn}
        />
      </TableCell>
    </UITableRow>
  );
};
