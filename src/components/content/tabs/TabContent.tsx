
import React from 'react';
import { Content, Topic } from '@/types';
import { TabsContent } from '@/components/ui/tabs';
import { ContentViewRenderer } from './ContentViewRenderer';

interface TabContentProps {
  value: string;
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
  selectedItems?: string[];
  onToggleSelection?: (contentId: string) => void;
  onSelectAll?: (contentIds: string[]) => void;
  viewMode: 'table' | 'grid' | 'accordion';
  showApproveActions: boolean;
  showBatchSelection: boolean;
}

export const TabContent: React.FC<TabContentProps> = ({
  value,
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
  selectedItems = [],
  onToggleSelection,
  onSelectAll,
  viewMode,
  showApproveActions,
  showBatchSelection
}) => {
  return (
    <TabsContent value={value}>
      <ContentViewRenderer
        viewMode={viewMode}
        items={items}
        allItems={allItems}
        isLoading={isLoading}
        topics={topics}
        onApprove={onApprove}
        onDelete={onDelete}
        onView={onView}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        selectedPlatform={selectedPlatform}
        onPlatformChange={onPlatformChange}
        selectedItems={selectedItems}
        onToggleSelection={onToggleSelection}
        onSelectAll={onSelectAll}
        showBatchSelection={showBatchSelection}
        showApproveActions={showApproveActions}
      />
    </TabsContent>
  );
};
