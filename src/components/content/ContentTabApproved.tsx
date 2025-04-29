
import React from 'react';
import { Content, Topic } from '@/types';
import { ContentTable } from './ContentTable';
import { ContentPagination } from './ContentPagination';
import { TableHead } from '@/components/ui/table';

interface ContentTabApprovedProps {
  approvedContent: Content[];
  scheduledContent: Content[];
  publishedContent: Content[];
  topics: Topic[];
  isLoading: boolean;
  currentPage: number;
  rowsPerPage: number;
  selectedContentIds: string[];
  toggleSelectAll: (checked: boolean, contentList: Content[]) => void;
  toggleSelectItem: (checked: boolean, contentId: string) => void;
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ContentTabApproved: React.FC<ContentTabApprovedProps> = ({
  approvedContent,
  scheduledContent,
  publishedContent,
  topics,
  isLoading,
  currentPage,
  rowsPerPage,
  selectedContentIds,
  toggleSelectAll,
  toggleSelectItem,
  onApprove,
  onDelete,
  onView,
  onPageChange,
  onRowsPerPageChange
}) => {
  // Combine all approved, scheduled, and published content
  const combinedContent = [...approvedContent, ...scheduledContent, ...publishedContent];
  
  // Calculate paginated content
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedContent = combinedContent.slice(startIndex, endIndex);
  
  const additionalColumns = (
    <>
      <TableHead className="w-24">Người duyệt</TableHead>
      <TableHead className="w-24">Ngày duyệt</TableHead>
    </>
  );
  
  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Số dòng/trang:</label>
          <select 
            className="ml-2 p-1 border rounded text-sm"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <ContentTable
        contents={paginatedContent}
        topics={topics}
        isLoading={isLoading}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        selectedContentIds={selectedContentIds}
        toggleSelectAll={toggleSelectAll}
        toggleSelectItem={toggleSelectItem}
        onApprove={onApprove}
        onDelete={onDelete}
        onView={onView}
        customColumns={additionalColumns}
        emptyMessage="Không có nội dung đã duyệt nào."
      />
      
      <ContentPagination
        currentPage={currentPage}
        totalItems={combinedContent.length}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};
