
import React from 'react';
import { Content, Topic } from '@/types';
import { TabContent } from './TabContent';

interface TabsContainerProps {
  activeTab: 'all' | 'draft' | 'approved' | 'scheduled' | 'rejected' | 'published';
  allContent: Content[];
  draftContent: Content[];
  approvedContent: Content[];
  scheduledContent: Content[];
  rejectedContent: Content[];
  publishedContent: Content[];
  currentPage: number;
  rowsPerPage: number;
  isLoading: boolean;
  topics: Topic[];
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedItems?: string[];
  toggleItemSelection?: (contentId: string) => void;
  selectAll?: (contentIds: string[]) => void;
  viewMode: 'table' | 'grid' | 'accordion';
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  allContent,
  draftContent,
  approvedContent,
  scheduledContent,
  rejectedContent,
  publishedContent,
  currentPage,
  rowsPerPage,
  isLoading,
  topics,
  onApprove,
  onDelete,
  onView,
  handlePageChange,
  handleRowsPerPageChange,
  selectedPlatform,
  onPlatformChange,
  selectedItems = [],
  toggleItemSelection,
  selectAll,
  viewMode
}) => {
  // Determine if batch selection should be shown
  const showBatchSelection = activeTab === 'all' || activeTab === 'draft';
  
  // Common props that determine if approval actions should be shown
  const showApproveActions = activeTab !== 'approved' && activeTab !== 'scheduled' && activeTab !== 'published';
  
  // Get currently visible items based on the active tab, pagination, and filtering
  const currentItems = (() => {
    switch (activeTab) {
      case 'draft':
        return getPaginatedContent(draftContent, currentPage, rowsPerPage);
      case 'approved':
        return getPaginatedContent(approvedContent, currentPage, rowsPerPage);
      case 'scheduled':
        return getPaginatedContent(scheduledContent, currentPage, rowsPerPage);
      case 'rejected':
        return getPaginatedContent(rejectedContent, currentPage, rowsPerPage);
      case 'published':
        return getPaginatedContent(publishedContent, currentPage, rowsPerPage);
      case 'all':
      default:
        return getPaginatedContent(allContent, currentPage, rowsPerPage);
    }
  })();

  // Get total items for the active tab
  const totalItems = (() => {
    switch (activeTab) {
      case 'draft':
        return draftContent;
      case 'approved':
        return approvedContent;
      case 'scheduled':
        return scheduledContent;
      case 'rejected':
        return rejectedContent;
      case 'published':
        return publishedContent;
      case 'all':
      default:
        return allContent;
    }
  })();

  // Count draft items for batch approval
  const draftItemCount = countDraftItems(activeTab, allContent, draftContent);
  const showBatchSelectionAndDraftItemCount = showBatchSelection && draftItemCount > 0;

  return (
    <>
      <TabContent
        value="all"
        items={activeTab === 'all' ? currentItems : []}
        allItems={allContent}
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
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAll}
        viewMode={viewMode}
        showBatchSelection={showBatchSelectionAndDraftItemCount}
        showApproveActions={showApproveActions}
      />

      <TabContent
        value="draft"
        items={activeTab === 'draft' ? currentItems : []}
        allItems={draftContent}
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
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAll}
        viewMode={viewMode}
        showBatchSelection={showBatchSelectionAndDraftItemCount}
        showApproveActions={true}
      />

      <TabContent
        value="approved"
        items={activeTab === 'approved' ? currentItems : []}
        allItems={approvedContent}
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
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAll}
        viewMode={viewMode}
        showBatchSelection={false}
        showApproveActions={false}
      />

      <TabContent
        value="scheduled"
        items={activeTab === 'scheduled' ? currentItems : []}
        allItems={scheduledContent}
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
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAll}
        viewMode={viewMode}
        showBatchSelection={false}
        showApproveActions={false}
      />

      <TabContent
        value="rejected"
        items={activeTab === 'rejected' ? currentItems : []}
        allItems={rejectedContent}
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
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAll}
        viewMode={viewMode}
        showBatchSelection={false}
        showApproveActions={true}
      />

      <TabContent
        value="published"
        items={activeTab === 'published' ? currentItems : []}
        allItems={publishedContent}
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
        onToggleSelection={toggleItemSelection}
        onSelectAll={selectAll}
        viewMode={viewMode}
        showBatchSelection={false}
        showApproveActions={false}
      />
    </>
  );
};

// Import required utility functions
import { getPaginatedContent, countDraftItems } from '../utils/contentFilters';
