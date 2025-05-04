
import React, { useMemo } from 'react';
import { ContentCard } from './ContentCard';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableLoadingState } from './table/TableLoadingState';
import { TableEmptyState } from './table/TableEmptyState';
import { Content, Topic } from '@/types';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ContentGridViewProps {
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
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  showApproveActions?: boolean;
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
  onEdit,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  selectedPlatform,
  onPlatformChange,
  showApproveActions = true,
  selectedItems = [],
  onToggleSelection,
  onSelectAll,
  showBatchSelection = false,
}) => {
  // Get topic titles for easier lookup
  const topicMap = useMemo(() => {
    return new Map(topics.map(topic => [topic.id, topic]));
  }, [topics]);

  return (
    <div className="w-full">
      <TableFilters 
        selectedPlatform={selectedPlatform}
        onPlatformChange={onPlatformChange}
      />

      {isLoading ? (
        <div className="border rounded-md p-6">
          <TableLoadingState colSpan={1} />
        </div>
      ) : items.length === 0 ? (
        <div className="border rounded-md p-6">
          <TableEmptyState colSpan={1} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 sm:p-6">
          {items.map((content) => {
            const topic = topicMap.get(content.topicId);
            
            return (
              <ContentCard 
                key={content.id}
                content={content}
                topicTitle={topic?.title || content.topicTitle}
                onDelete={() => onDelete(content.id)}
                onView={() => onView(content)}
                onApprove={showApproveActions && content.status === 'draft' ? () => onApprove(content) : undefined}
                onEdit={onEdit ? () => onEdit(content) : undefined}
                isSelected={selectedItems.includes(content.id)}
                onToggleSelection={onToggleSelection && showBatchSelection ? () => onToggleSelection(content.id) : undefined}
                selectionDisabled={content.status !== 'draft'}
              />
            );
          })}
        </div>
      )}

      <div className="p-4 border-t">
        <TablePagination 
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalItems={allItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};
