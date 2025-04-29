
import React from 'react';
import { Content, Topic } from '@/types';
import { ContentCard } from './ContentCard';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableEmptyState } from './table/TableEmptyState';
import { Skeleton } from '@/components/ui/skeleton';

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
  showApproveActions = true
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

  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-border bg-white">
      <div className="border-b p-4">
        <TableFilters
          rowsPerPage={rowsPerPage}
          selectedPlatform={selectedPlatform}
          handleRowsPerPageChange={handleRowsPerPageChange}
          onPlatformChange={onPlatformChange}
          uniquePlatforms={uniquePlatforms}
          getPlatformIcon={(platform) => null} // We'll handle icons in the card
        />
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
                <ContentCard
                  key={item.id}
                  content={item}
                  topic={topic}
                  onApprove={showApproveActions && item.status === 'draft' ? () => onApprove(item) : undefined}
                  onDelete={() => onDelete(item.id)}
                  onView={() => onView(item)}
                />
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
