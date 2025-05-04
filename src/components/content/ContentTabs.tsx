
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Content } from '@/types';
import { ContentTabHeader } from './tabs/ContentTabHeader';
import { ViewModeSwitcher } from './tabs/ViewModeSwitcher';
import { BatchActions } from './tabs/BatchActions';
import { ContentViewRenderer } from './tabs/ContentViewRenderer';
import { filterByPlatform, getPaginatedContent, countDraftItems } from './utils/contentFilters';

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
type TabValue = 'all' | 'draft' | 'approved' | 'scheduled';

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

  // Count draft items for batch approval
  const draftItemCount = useMemo(() => {
    return countDraftItems(activeTab, allContent, draftContent);
  }, [activeTab, allContent, draftContent]);

  // Determine if batch selection should be shown
  const showBatchSelection = activeTab === 'all' || activeTab === 'draft';
  
  // Get currently visible items based on the active tab, pagination, and filtering
  const currentItems = useMemo(() => {
    switch (activeTab) {
      case 'draft':
        return getPaginatedContent(draftContent, currentPage, rowsPerPage);
      case 'approved':
        return getPaginatedContent(approvedContent, currentPage, rowsPerPage);
      case 'scheduled':
        return getPaginatedContent(scheduledContent, currentPage, rowsPerPage);
      case 'all':
      default:
        return getPaginatedContent(allContent, currentPage, rowsPerPage);
    }
  }, [activeTab, currentPage, rowsPerPage, allContent, draftContent, approvedContent, scheduledContent]);

  // Get total items for the active tab
  const totalItems = useMemo(() => {
    switch (activeTab) {
      case 'draft':
        return draftContent;
      case 'approved':
        return approvedContent;
      case 'scheduled':
        return scheduledContent;
      case 'all':
      default:
        return allContent;
    }
  }, [activeTab, allContent, draftContent, approvedContent, scheduledContent]);

  // Common props that determine if approval actions should be shown
  const showApproveActions = activeTab !== 'approved' && activeTab !== 'scheduled';
  const showBatchSelectionAndDraftItemCount = showBatchSelection && draftItemCount > 0;

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <ContentTabHeader 
              allCount={content.length}
              draftCount={draftContent.length}
              approvedCount={approvedContent.length}
              scheduledCount={scheduledContent.length}
            />

            <div className="flex gap-4 items-center">
              {showBatchSelection && selectedItems && selectedItems.length > 0 && (
                <BatchActions 
                  selectedItemsCount={selectedItems.length}
                  onBatchApprove={handleBatchApprove || (() => {})}
                />
              )}
              
              <ViewModeSwitcher 
                viewMode={viewMode} 
                handleViewModeChange={handleViewModeChange} 
              />
            </div>
          </div>

          <TabsContent value="all">
            <ContentViewRenderer
              viewMode={viewMode}
              items={currentItems}
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
              showBatchSelection={showBatchSelectionAndDraftItemCount}
              showApproveActions={showApproveActions}
            />
          </TabsContent>

          <TabsContent value="draft">
            <ContentViewRenderer
              viewMode={viewMode}
              items={currentItems}
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
              showBatchSelection={showBatchSelectionAndDraftItemCount}
              showApproveActions={showApproveActions}
            />
          </TabsContent>

          <TabsContent value="approved">
            <ContentViewRenderer
              viewMode={viewMode}
              items={currentItems}
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
              showBatchSelection={false}
              showApproveActions={showApproveActions}
            />
          </TabsContent>

          <TabsContent value="scheduled">
            <ContentViewRenderer
              viewMode={viewMode}
              items={currentItems}
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
              showBatchSelection={false}
              showApproveActions={showApproveActions}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
