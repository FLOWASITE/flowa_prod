
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Content } from '@/types';
import { ContentTable } from './ContentTable';

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
  onPlatformChange
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

  return (
    <Tabs defaultValue="all" className="space-y-4">
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
      
      <TabsContent value="all" className="space-y-4">
        <ContentTable
          items={paginatedAllContent}
          allItems={filteredContent}
          isLoading={isLoading}
          topics={topics}
          onApprove={onApprove}
          onDelete={onDelete}
          onView={onView}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          showApproveColumn={true}
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </TabsContent>
      
      <TabsContent value="draft" className="space-y-4">
        <ContentTable
          items={paginatedDraftContent}
          allItems={filteredDraftContent}
          isLoading={isLoading}
          topics={topics}
          onApprove={onApprove}
          onDelete={onDelete}
          onView={onView}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          showApprovalColumns={false}
          showApproveColumn={true}
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </TabsContent>
      
      <TabsContent value="approved" className="space-y-4">
        <ContentTable
          items={paginatedApprovedContent}
          allItems={filteredApprovedContent}
          isLoading={isLoading}
          topics={topics}
          onApprove={onApprove}
          onDelete={onDelete}
          onView={onView}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          showApproveColumn={false}
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </TabsContent>
    </Tabs>
  );
};
