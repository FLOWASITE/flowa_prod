
import React from 'react';
import { Content, Topic } from '@/types';
import { ContentCard } from './ContentCard';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableEmptyState } from './table/TableEmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';

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

// Create a GridLoadingState component instead of using TableLoadingState
const GridLoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="border rounded-lg p-4 space-y-3">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    ))}
  </div>
);

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
  const getUniquePlatforms = () => {
    const platforms = new Set<string>();
    allItems.forEach(item => {
      if (item.platform) {
        platforms.add(item.platform);
      }
    });
    return Array.from(platforms);
  };

  const uniquePlatforms = getUniquePlatforms();

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
        <div className="flex justify-between items-center mb-2">
          <TableFilters
            rowsPerPage={rowsPerPage}
            selectedPlatform={selectedPlatform}
            handleRowsPerPageChange={handleRowsPerPageChange}
            onPlatformChange={onPlatformChange}
            uniquePlatforms={uniquePlatforms}
            getPlatformIcon={(platform) => null} // We'll handle icons in the card
          />
          
          {showBatchSelection && items.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox 
                id="select-all"
                className="border-gray-400"
                onCheckedChange={handleSelectAllChange}
                checked={items.length > 0 && selectedItems.length === items.length}
              />
              <label htmlFor="select-all" className="text-sm text-gray-700 cursor-pointer">
                Chọn tất cả
              </label>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <GridLoadingState />
          </div>
        ) : items.length === 0 ? (
          <div className="flex justify-center items-center h-[400px]">
            <TableEmptyState colSpan={1} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              const topic = topics.find(t => t.id === item.topicId);
              return (
                <div key={item.id} className="relative">
                  {showBatchSelection && (
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => onToggleSelection && onToggleSelection(item.id)}
                        disabled={item.status !== 'draft'}
                        className="bg-white border-gray-300 rounded-full"
                      />
                    </div>
                  )}
                  <ContentCard
                    content={item}
                    topic={topic}
                    onApprove={showApproveActions && item.status === 'draft' ? () => onApprove(item) : undefined}
                    onDelete={() => onDelete(item.id)}
                    onView={() => onView(item)}
                  />
                </div>
              );
            })}
          </div>
        )}
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
