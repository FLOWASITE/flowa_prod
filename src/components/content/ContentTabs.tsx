
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Content } from '@/types';
import { ContentTable } from './ContentTable';
import { ContentGridView } from './ContentGridView';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList } from 'lucide-react';

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
  viewMode: 'table' | 'grid';
  handleViewModeChange: (mode: 'table' | 'grid') => void;
}

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
  handleViewModeChange
}) => {
  // Filter content by status
  const draftContent = content.filter(item => item.status === 'draft');
  const approvedContent = content.filter(item => item.status === 'approved');
  const scheduledContent = content.filter(item => item.status === 'scheduled');
  const publishedContent = content.filter(item => item.status === 'published');

  // Filter by platform if selected
  const filterByPlatform = (items: Content[]) => {
    if (selectedPlatform === 'all') {
      return items;
    }
    return items.filter(item => item.platform === selectedPlatform);
  };

  // Apply platform filter
  const filteredContent = filterByPlatform(content);
  const filteredDraftContent = filterByPlatform(draftContent);
  const filteredApprovedContent = filterByPlatform([...approvedContent, ...scheduledContent, ...publishedContent]);

  // Pagination logic
  const getPaginatedData = (data: Content[]) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (dataLength: number) => Math.ceil(dataLength / rowsPerPage);

  // Get paginated data for each tab
  const paginatedAllContent = getPaginatedData(filteredContent);
  const paginatedDraftContent = getPaginatedData(filteredDraftContent);
  const paginatedApprovedContent = getPaginatedData(filteredApprovedContent);

  const renderContent = (items: Content[], allItems: Content[], showApproveColumn: boolean, showApprovalColumns: boolean = true) => {
    if (viewMode === 'table') {
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
          showApproveColumn={showApproveColumn}
          showApprovalColumns={showApprovalColumns}
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      );
    } else {
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
          showApproveActions={showApproveColumn}
        />
      );
    }
  };

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex justify-between items-center px-4 pt-4">
        <TabsList>
          <TabsTrigger value="all">
            Tất cả ({filteredContent.length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Bản nháp ({filteredDraftContent.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Đã duyệt ({filteredApprovedContent.length})
          </TabsTrigger>
        </TabsList>
        
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewModeChange('table')}
            className="rounded-r-none"
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewModeChange('grid')}
            className="rounded-l-none"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TabsContent value="all" className="space-y-4">
        {renderContent(paginatedAllContent, filteredContent, true)}
      </TabsContent>
      
      <TabsContent value="draft" className="space-y-4">
        {renderContent(paginatedDraftContent, filteredDraftContent, true, false)}
      </TabsContent>
      
      <TabsContent value="approved" className="space-y-4">
        {renderContent(paginatedApprovedContent, filteredApprovedContent, false)}
      </TabsContent>
    </Tabs>
  );
};
