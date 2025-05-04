
import React from 'react';
import { Content, Topic } from '@/types';
import { TablePagination } from './table/TablePagination';
import { GridHeader } from './grid/GridHeader';
import { GridContent } from './grid/GridContent';
import { getUniquePlatforms } from './utils/contentFilters';

interface ContentGridViewProps {
  items: Content[];
  allItems: Content[];
  isLoading: boolean;
  topics: Topic[];
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  showApproveActions?: boolean;
  // Batch selection props
  selectedItems?: string[];
  onToggleSelection?: (contentId: string) => void;
  onSelectAll?: (contentIds: string[]) => void;
  showBatchSelection?: boolean;
}

export const ContentGridView: React.FC<ContentGridViewProps> = ({
  items,
  allItems,
  isLoading,
  topics,
  onApprove,
  onDelete,
  onView,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  selectedPlatform,
  onPlatformChange,
  showApproveActions = true,
  // Batch selection props
  selectedItems = [],
  onToggleSelection,
  onSelectAll,
  showBatchSelection = false
}) => {
  const uniquePlatforms = getUniquePlatforms(allItems);

  // Handle select all checkbox
  const handleSelectAllChange = (checked: boolean) => {
    if (checked && onSelectAll) {
      onSelectAll(items.map(item => item.id));
    } else if (!checked && onSelectAll) {
      onSelectAll([]);
    }
  };

  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-border bg-white">
      <div className="border-b p-4">
        <GridHeader 
          rowsPerPage={rowsPerPage}
          selectedPlatform={selectedPlatform}
          handleRowsPerPageChange={handleRowsPerPageChange}
          onPlatformChange={onPlatformChange}
          uniquePlatforms={uniquePlatforms}
          showBatchSelection={showBatchSelection}
          hasItems={items.length > 0}
          allSelected={items.length > 0 && selectedItems.length === items.length}
          onSelectAllChange={handleSelectAllChange}
        />
      </div>
      
      <div className="p-4 min-h-[400px]">
        <GridContent 
          items={items}
          topics={topics}
          isLoading={isLoading}
          onApprove={onApprove}
          onDelete={onDelete}
          onView={onView}
          selectedItems={selectedItems}
          onToggleSelection={onToggleSelection}
          showBatchSelection={showBatchSelection}
          showApproveActions={showApproveActions}
        />
      </div>
      
      <div className="flex items-center justify-between p-5 border-t bg-gradient-to-r from-gray-50 to-white">
        <div className="text-sm text-muted-foreground">
          Trang {currentPage} - Hiển thị {items.length} / {allItems.length} nội dung
        </div>
        <TablePagination
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalItems={allItems.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
