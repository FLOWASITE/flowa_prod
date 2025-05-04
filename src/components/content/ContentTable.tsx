
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { PlatformIcon } from './table/PlatformIcon';
import { StatusBadge } from './table/StatusBadge';
import { TableActions } from './table/TableActions';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableEmptyState } from './table/TableEmptyState';
import { TableLoadingState } from './table/TableLoadingState';
import { format } from 'date-fns';
import { Content, Topic } from '@/types';

interface ContentTableProps {
  items: Content[];
  allItems: Content[];
  isLoading: boolean;
  topics: Topic[];
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  onEdit?: (content: Content) => void;
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showApproveColumn?: boolean;
  showApprovalColumns?: boolean;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedItems?: string[];
  onToggleSelection?: (contentId: string) => void;
  onSelectAll?: (contentIds: string[]) => void;
  showBatchSelection?: boolean;
}

export const ContentTable: React.FC<ContentTableProps> = ({
  items,
  allItems,
  isLoading,
  topics,
  onApprove,
  onDelete,
  onView,
  onEdit,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  showApproveColumn = true,
  showApprovalColumns = false,
  selectedPlatform,
  onPlatformChange,
  selectedItems = [],
  onToggleSelection,
  onSelectAll,
  showBatchSelection = false,
}) => {
  // Get topic titles for easier lookup
  const topicMap = new Map(topics.map(topic => [topic.id, topic.title]));
  
  // Memoize the content IDs of the current page
  const currentPageContentIds = items.map(item => item.id);
  
  // Check if all items on the current page are selected
  const allSelected = items.length > 0 && currentPageContentIds.every(id => selectedItems.includes(id));
  
  // Handle select all checkbox change
  const handleSelectAllChange = (checked: boolean) => {
    if (onSelectAll) {
      if (checked) {
        onSelectAll(currentPageContentIds);
      } else {
        onSelectAll([]); // Clear selection
      }
    }
  };

  return (
    <div className="w-full">
      <TableFilters 
        selectedPlatform={selectedPlatform}
        onPlatformChange={onPlatformChange}
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {showBatchSelection && onToggleSelection && onSelectAll && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAllChange}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              <TableHead className="w-12">Platform</TableHead>
              <TableHead className="w-48">Chủ đề</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead className="w-24">Trạng thái</TableHead>
              {showApproveColumn && (
                <TableHead className="w-32">Ngày duyệt</TableHead>
              )}
              <TableHead className="w-32">Ngày tạo</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoadingState colSpan={showBatchSelection ? 8 : 7} />
            ) : items.length === 0 ? (
              <TableEmptyState colSpan={showBatchSelection ? 8 : 7} />
            ) : (
              items.map((content) => (
                <TableRow key={content.id}>
                  {showBatchSelection && onToggleSelection && (
                    <TableCell className="w-12">
                      <Checkbox
                        checked={selectedItems.includes(content.id)}
                        onCheckedChange={(checked) => {
                          if (checked !== 'indeterminate') {
                            onToggleSelection(content.id);
                          }
                        }}
                        aria-label={`Select ${content.id}`}
                        disabled={content.status !== 'draft'}
                      />
                    </TableCell>
                  )}
                  <TableCell className="w-12">
                    <PlatformIcon platform={content.platform} />
                  </TableCell>
                  <TableCell className="w-48 font-medium">
                    {content.topicTitle || topicMap.get(content.topicId) || 'Không có chủ đề'}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate">{content.text}</div>
                  </TableCell>
                  <TableCell className="w-24">
                    <StatusBadge status={content.status} />
                  </TableCell>
                  {showApproveColumn && (
                    <TableCell className="w-32">
                      {content.approvedAt 
                        ? format(new Date(content.approvedAt), 'dd/MM/yyyy')
                        : '-'}
                    </TableCell>
                  )}
                  <TableCell className="w-32">
                    {format(new Date(content.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className="w-12">
                    <TableActions 
                      onApprove={content.status === 'draft' ? () => onApprove(content) : undefined}
                      onDelete={() => onDelete(content.id)}
                      onView={() => onView(content)}
                      onEdit={onEdit ? () => onEdit(content) : undefined}
                      showApprove={showApprovalColumns}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <TablePagination 
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalItems={allItems.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};
