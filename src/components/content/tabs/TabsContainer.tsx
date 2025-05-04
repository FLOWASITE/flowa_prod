
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
  // Use helper function to get the current items based on the active tab
  const getCurrentItems = (tab: string) => {
    switch (tab) {
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
  };

  // Get total items for pagination based on the active tab
  const getTotalItems = (tab: string) => {
    switch (tab) {
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
  };

  // Determine if batch selection should be shown
  const showBatchSelection = activeTab === 'all' || activeTab === 'draft';
  
  // Determine if approve actions should be shown
  const showApproveActions = (tab: string) => {
    return tab !== 'approved' && tab !== 'scheduled' && tab !== 'published';
  };

  // Count draft items for batch approval
  const draftItemCount = countDraftItems(activeTab, allContent, draftContent);
  const showBatchSelectionAndDraftItemCount = showBatchSelection && draftItemCount > 0;

  return (
    <>
      <TabContent
        value="all"
        items={activeTab === 'all' ? getCurrentItems('all') : []}
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
        showApproveActions={showApproveActions('all')}
      />

      <TabContent
        value="draft"
        items={activeTab === 'draft' ? getCurrentItems('draft') : []}
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
        items={activeTab === 'approved' ? getCurrentItems('approved') : []}
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
        items={activeTab === 'scheduled' ? getCurrentItems('scheduled') : []}
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
        items={activeTab === 'rejected' ? getCurrentItems('rejected') : []}
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
        items={activeTab === 'published' ? getCurrentItems('published') : []}
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
