
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
  handleRowsPerPageChange
}) => {
  // Filter content by status
  const draftContent = content.filter(item => item.status === 'draft');
  const approvedContent = content.filter(item => item.status === 'approved');
  const scheduledContent = content.filter(item => item.status === 'scheduled');
  const publishedContent = content.filter(item => item.status === 'published');

  // Pagination logic
  const getPaginatedData = (data: Content[]) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (dataLength: number) => Math.ceil(dataLength / rowsPerPage);

  // Get paginated data for each tab
  const paginatedAllContent = getPaginatedData(content);
  const paginatedDraftContent = getPaginatedData(draftContent);
  const paginatedApprovedContent = getPaginatedData([...approvedContent, ...scheduledContent, ...publishedContent]);

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">
          Tất cả ({content.length})
        </TabsTrigger>
        <TabsTrigger value="draft">
          Bản nháp ({draftContent.length})
        </TabsTrigger>
        <TabsTrigger value="approved">
          Đã duyệt ({approvedContent.length + scheduledContent.length + publishedContent.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-4">
        <ContentTable
          items={paginatedAllContent}
          allItems={content}
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
        />
      </TabsContent>
      
      <TabsContent value="draft" className="space-y-4">
        <ContentTable
          items={paginatedDraftContent}
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
          showApprovalColumns={false}
          showApproveColumn={true}
        />
      </TabsContent>
      
      <TabsContent value="approved" className="space-y-4">
        <ContentTable
          items={paginatedApprovedContent}
          allItems={[...approvedContent, ...scheduledContent, ...publishedContent]}
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
        />
      </TabsContent>
    </Tabs>
  );
};
