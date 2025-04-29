
import React from 'react';
import { Content, Topic } from '@/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { ContentTable } from './ContentTable';
import { ContentPagination } from './ContentPagination';

interface ContentTabDraftProps {
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
  onBatchApprove: () => void;
}

export const ContentTabDraft: React.FC<ContentTabDraftProps> = ({
  content: draftContent,
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
  onRowsPerPageChange,
  onBatchApprove
}) => {
  // Calculate paginated content
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedContent = draftContent.slice(startIndex, endIndex);
  
  // Count selected draft content items
  const selectedDraftCount = selectedContentIds.filter(id => 
    draftContent.some(item => item.id === id)
  ).length;
  
  return (
    <div className="rounded-md border">
      <div className="flex items-center p-4 justify-between">
        <div>
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
        
        {selectedDraftCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBatchApprove}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Duyệt hàng loạt ({selectedDraftCount})
          </Button>
        )}
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
        emptyMessage="Không có bản nháp nào."
      />
      
      <ContentPagination
        currentPage={currentPage}
        totalItems={draftContent.length}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};
