
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentTable } from './ContentTable';
import { ContentGridView } from './ContentGridView';
import { ContentAccordionView } from './ContentAccordionView';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Check, Package, AlignLeft } from 'lucide-react';
import { Content } from '@/types';

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

  // Filter by platform
  function filterByPlatform(content: Content[], platform: string) {
    if (platform === 'all') {
      return content;
    }
    return content.filter(item => item.platform === platform);
  }

  // Get paginated content
  const getPaginatedContent = (content: Content[]) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return content.slice(startIndex, endIndex);
  };

  // Count draft items for batch approval
  const draftItemCount = useMemo(() => {
    if (activeTab === 'all') {
      return allContent.filter(item => item.status === 'draft').length;
    }
    if (activeTab === 'draft') {
      return draftContent.length;
    }
    return 0;
  }, [activeTab, allContent, draftContent]);

  // Determine if batch selection should be shown
  const showBatchSelection = activeTab === 'all' || activeTab === 'draft';
  
  // Get currently visible items based on the active tab, pagination, and filtering
  const currentItems = useMemo(() => {
    switch (activeTab) {
      case 'draft':
        return getPaginatedContent(draftContent);
      case 'approved':
        return getPaginatedContent(approvedContent);
      case 'scheduled':
        return getPaginatedContent(scheduledContent);
      case 'all':
      default:
        return getPaginatedContent(allContent);
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

  // Render the appropriate view based on viewMode
  const renderContentView = (items: Content[], allItems: Content[]) => {
    // Common props that determine if approval actions should be shown
    const showApproveActions = activeTab !== 'approved' && activeTab !== 'scheduled';
    const showBatchSelectionAndDraftItemCount = showBatchSelection && draftItemCount > 0;
    
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
            onToggleSelection={toggleItemSelection}
            onSelectAll={selectAll}
            showBatchSelection={showBatchSelectionAndDraftItemCount}
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
            onToggleSelection={toggleItemSelection}
            onSelectAll={selectAll}
            showBatchSelection={showBatchSelectionAndDraftItemCount}
            showApproveColumn={showApproveActions}
          />
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-6 pt-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                Tất cả
                <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                  {content.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="draft" className="relative">
                Nháp
                <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full">
                  {draftContent.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="relative">
                Đã duyệt
                <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
                  {approvedContent.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="relative">
                Lên lịch
                <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full">
                  {scheduledContent.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-4 items-center">
              {showBatchSelection && selectedItems && selectedItems.length > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBatchApprove}
                  className="flex items-center gap-1"
                >
                  <Check size={16} />
                  <span>Duyệt {selectedItems.length} nội dung</span>
                </Button>
              )}
              
              <div className="flex rounded-md shadow-sm">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewModeChange('table')}
                  className="rounded-l-md rounded-r-none px-3"
                  title="Chế độ bảng"
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className="rounded-none border-l-0 border-r-0 px-3"
                  title="Chế độ lưới"
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'accordion' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleViewModeChange('accordion')}
                  className="rounded-r-md rounded-l-none px-3"
                  title="Chế độ phân cấp"
                >
                  <AlignLeft size={16} />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="all">
            {renderContentView(currentItems, allContent)}
          </TabsContent>

          <TabsContent value="draft">
            {renderContentView(currentItems, draftContent)}
          </TabsContent>

          <TabsContent value="approved">
            {renderContentView(currentItems, approvedContent)}
          </TabsContent>

          <TabsContent value="scheduled">
            {renderContentView(currentItems, scheduledContent)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
