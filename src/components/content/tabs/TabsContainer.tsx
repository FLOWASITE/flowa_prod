
import React from 'react';
import { Content, Topic } from '@/types';
import { TabContent } from './TabContent';
import { useContentTabsData } from '@/hooks/useContentTabsData';

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
  // Use the hook to get paginated content and other tab-related data
  const {
    paginatedContent,
    showBatchSelection,
    showApproveActions
  } = useContentTabsData({
    content: [],  // This is not used in this context since we're passing in pre-filtered content
    selectedPlatform,
    currentPage,
    rowsPerPage,
    activeTab
  });

  return (
    <>
      <TabContent
        value="all"
        items={activeTab === 'all' ? paginatedContent : []}
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
        showBatchSelection={showBatchSelection && activeTab === 'all'}
        showApproveActions={showApproveActions}
      />

      <TabContent
        value="draft"
        items={activeTab === 'draft' ? paginatedContent : []}
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
        showBatchSelection={showBatchSelection && activeTab === 'draft'}
        showApproveActions={true}
      />

      <TabContent
        value="approved"
        items={activeTab === 'approved' ? paginatedContent : []}
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
        items={activeTab === 'scheduled' ? paginatedContent : []}
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
        items={activeTab === 'rejected' ? paginatedContent : []}
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
        items={activeTab === 'published' ? paginatedContent : []}
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
