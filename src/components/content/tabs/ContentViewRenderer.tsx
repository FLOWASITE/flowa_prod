
import React from 'react';
import { Content, Topic } from '@/types';
import { ContentTable } from '../ContentTable';
import { ContentGridView } from '../ContentGridView';
import { ContentAccordionView } from '../ContentAccordionView';

interface ContentViewRendererProps {
  viewMode: 'table' | 'grid' | 'accordion';
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
  showApproveActions: boolean;
  // Batch selection props
  selectedItems?: string[];
  onToggleSelection?: (contentId: string) => void;
  onSelectAll?: (contentIds: string[]) => void;
  showBatchSelection?: boolean;
}

export const ContentViewRenderer: React.FC<ContentViewRendererProps> = ({
  viewMode,
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
  showApproveActions,
  selectedItems = [],
  onToggleSelection,
  onSelectAll,
  showBatchSelection = false
}) => {
  switch (viewMode) {
    case 'grid':
      return (
        <ContentGridView
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
      );
    case 'accordion':
      return (
        <ContentAccordionView
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
          showApproveColumn={showApproveActions}
        />
      );
    case 'table':
    default:
      return (
        <ContentTable
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
          showApprovalColumns={true}
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
          selectedItems={selectedItems}
          onToggleSelection={onToggleSelection}
          onSelectAll={onSelectAll}
          showBatchSelection={showBatchSelection}
          showApproveColumn={showApproveActions}
        />
      );
  }
};
