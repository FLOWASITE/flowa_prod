
import React, { useState, useMemo } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Content } from '@/types';
import { filterByPlatform } from './utils/contentFilters';
import { TabsHeaderSection } from './tabs/TabsHeaderSection';
import { TabsContainer } from './tabs/TabsContainer';

interface ContentTabsProps {
  content: Content[];
  isLoading: boolean;
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  topics: any[];
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  viewMode: 'table' | 'grid' | 'accordion';
  handleViewModeChange: (mode: 'table' | 'grid' | 'accordion') => void;
  // Batch selection props
  selectedItems?: string[];
  toggleItemSelection?: (contentId: string) => void;
  selectAll?: (contentIds: string[]) => void;
  clearSelection?: () => void;
  handleBatchApprove?: () => void;
}

// Define a type for the active tab values to ensure type safety
type TabValue = 'all' | 'draft' | 'approved' | 'scheduled' | 'rejected' | 'published';

export const ContentTabs: React.FC<ContentTabsProps> = ({
  content,
  isLoading,
  onApprove,
  onDelete,
  onView,
  topics,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  selectedPlatform,
  onPlatformChange,
  viewMode,
  handleViewModeChange,
  // Batch selection props
  selectedItems = [],
  toggleItemSelection,
  selectAll,
  clearSelection,
  handleBatchApprove
}) => {
  const [activeTab, setActiveTab] = useState<TabValue>('all');

  // Filter content based on status for each tab
  const allContent = useMemo(() => {
    return filterByPlatform(content, selectedPlatform);
  }, [content, selectedPlatform]);
  
  const draftContent = useMemo(() => {
    return filterByPlatform(content.filter(item => item.status === 'draft'), selectedPlatform);
  }, [content, selectedPlatform]);
  
  const approvedContent = useMemo(() => {
    return filterByPlatform(content.filter(item => item.status === 'approved'), selectedPlatform);
  }, [content, selectedPlatform]);

  const scheduledContent = useMemo(() => {
    return filterByPlatform(content.filter(item => item.status === 'scheduled'), selectedPlatform);
  }, [content, selectedPlatform]);

  // Add states for rejected and published content
  const rejectedContent = useMemo(() => {
    return filterByPlatform(content.filter(item => item.status === 'rejected'), selectedPlatform);
  }, [content, selectedPlatform]);
  
  const publishedContent = useMemo(() => {
    return filterByPlatform(content.filter(item => item.status === 'published'), selectedPlatform);
  }, [content, selectedPlatform]);

  // Determine if batch selection should be shown
  const showBatchSelection = activeTab === 'all' || activeTab === 'draft';

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
          <TabsHeaderSection
            contentLength={content.length}
            draftLength={draftContent.length}
            approvedLength={approvedContent.length}
            scheduledLength={scheduledContent.length}
            rejectedLength={rejectedContent.length}
            publishedLength={publishedContent.length}
            viewMode={viewMode}
            handleViewModeChange={handleViewModeChange}
            selectedItems={selectedItems}
            handleBatchApprove={handleBatchApprove}
            showBatchSelection={showBatchSelection}
          />
          
          <TabsContainer
            activeTab={activeTab}
            allContent={allContent}
            draftContent={draftContent}
            approvedContent={approvedContent}
            scheduledContent={scheduledContent}
            rejectedContent={rejectedContent}
            publishedContent={publishedContent}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            isLoading={isLoading}
            topics={topics}
            onApprove={onApprove}
            onDelete={onDelete}
            onView={onView}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
            selectedItems={selectedItems}
            toggleItemSelection={toggleItemSelection}
            selectAll={selectAll}
            viewMode={viewMode}
          />
        </Tabs>
      </div>
    </div>
  );
};
