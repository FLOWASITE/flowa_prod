
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { Content } from '@/types';
import { usePlatformUtils } from './table/usePlatformUtils';

// Import our components
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableEmptyState } from './table/TableEmptyState';
import { TableLoadingState } from './table/TableLoadingState';
import { TableHeader } from './table/TableHeader';
import { TableRow } from './table/TableRow';

interface ContentTableProps {
  items: Content[];
  allItems: Content[];
  isLoading: boolean;
  topics: any[];
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showApprovalColumns?: boolean;
  showApproveColumn?: boolean;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  // Batch selection props
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
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  showApprovalColumns = true,
  showApproveColumn = true,
  selectedPlatform,
  onPlatformChange,
  // Batch selection props
  selectedItems = [],
  onToggleSelection,
  onSelectAll,
  showBatchSelection = false
}) => {
  const { formatDate, getPlatformIcon, getUniquePlatforms } = usePlatformUtils(allItems);
  
  // Handle select all checkbox
  const handleSelectAllChange = (checked: boolean) => {
    if (checked && onSelectAll) {
      onSelectAll(items.map(item => item.id));
    } else if (!checked && onSelectAll) {
      onSelectAll([]);
    }
  };

  const uniquePlatforms = getUniquePlatforms();
  const columnsCount = showApprovalColumns ? (showBatchSelection ? 11 : 10) : (showBatchSelection ? 9 : 8);

  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-border bg-white">
      <TableFilters
        rowsPerPage={rowsPerPage}
        selectedPlatform={selectedPlatform}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPlatformChange={onPlatformChange}
        uniquePlatforms={uniquePlatforms}
        getPlatformIcon={getPlatformIcon}
      />
      
      <div className="relative">
        <div className="w-full overflow-auto custom-scrollbar">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader 
                showBatchSelection={showBatchSelection}
                showApprovalColumns={showApprovalColumns}
                allSelected={items.length > 0 && selectedItems.length === items.length}
                onSelectAllChange={handleSelectAllChange}
                hasItems={items.length > 0}
              />
              <TableBody>
                {isLoading ? (
                  <TableLoadingState colSpan={columnsCount} />
                ) : items.length === 0 ? (
                  <TableEmptyState colSpan={columnsCount} />
                ) : (
                  items.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    return (
                      <TableRow
                        key={item.id}
                        item={item}
                        index={index}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        topic={topic}
                        formatDate={formatDate}
                        showApprovalColumns={showApprovalColumns}
                        showApproveColumn={showApproveColumn}
                        showBatchSelection={showBatchSelection}
                        isSelected={selectedItems.includes(item.id)}
                        onToggleSelection={onToggleSelection}
                        onApprove={onApprove}
                        onView={onView}
                        onDelete={onDelete}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
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
