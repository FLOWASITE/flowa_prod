
import React from 'react';
import { Content, Topic } from '@/types';
import { ContentTable } from './ContentTable';
import { ContentPagination } from './ContentPagination';
import { TableHead } from '@/components/ui/table';

interface ContentTabAllProps {
  content: Content[];
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

export const ContentTabAll: React.FC<ContentTabAllProps> = ({
  content,
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
  // Calculate paginated content
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedContent = content.slice(startIndex, endIndex);
  
  const additionalColumns = (
    <>
      <TableHead className="w-24">Người duyệt</TableHead>
      <TableHead className="w-24">Ngày duyệt</TableHead>
    </>
  );
  
  return (
    <div className="rounded-md border">
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
      />
      
      <ContentPagination
        currentPage={currentPage}
        totalItems={content.length}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};
