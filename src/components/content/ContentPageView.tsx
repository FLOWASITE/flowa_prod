
import React from 'react';
import { ContentApprovalDialog } from '@/components/content/ContentApprovalDialog';
import { ContentHeader } from '@/components/content/ContentHeader';
import { ContentTabs } from '@/components/content/ContentTabs';
import { LocalDataWarning } from '@/components/content/LocalDataWarning';
import { BatchApprovalDialog } from '@/components/content/BatchApprovalDialog';
import { CreateContentDialog } from '@/components/content/CreateContentDialog';
import { useContentDataContext } from './ContentPageProvider';
import { useApprovedTopicsFetch } from '@/hooks/useApprovedTopicsFetch';

export const ContentPageView: React.FC = () => {
  const {
    selectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    isBatchApprovalDialogOpen,
    setIsBatchApprovalDialogOpen,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    currentPage,
    rowsPerPage,
    selectedPlatform,
    viewMode,
    useLocalData,
    contentData,
    topicsData,
    isLoading,
    handleApprove,
    handleDelete,
    handleView,
    handleCreateNew,
    handleCreateSuccess,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange,
    handleViewModeChange,
    // Batch selection
    selectedItems,
    toggleItemSelection,
    selectAll,
    clearSelection,
    handleBatchApprove
  } = useContentDataContext();
  
  // Fetch approved topics directly from API
  const { approvedTopics, isTopicsLoading: isApprovedTopicsLoading } = useApprovedTopicsFetch(useLocalData);

  // Get the selected content items
  const selectedContentItems = contentData.filter(item => selectedItems.includes(item.id));

  return (
    <div className="animate-fade-in">
      <ContentHeader 
        title="Danh sách Nội dung"
        description="Tạo, duyệt và quản lý nội dung trên các nền tảng"
        onCreateNew={handleCreateNew}
      />
      
      <LocalDataWarning useLocalData={useLocalData} />
      
      <div className="mt-4 bg-white backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <ContentTabs
          content={contentData}
          isLoading={isLoading}
          onApprove={handleApprove}
          onDelete={handleDelete}
          onView={handleView}
          topics={topicsData}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          selectedPlatform={selectedPlatform}
          onPlatformChange={handlePlatformChange}
          viewMode={viewMode}
          handleViewModeChange={handleViewModeChange}
          selectedItems={selectedItems}
          toggleItemSelection={toggleItemSelection}
          selectAll={selectAll}
          clearSelection={clearSelection}
          handleBatchApprove={handleBatchApprove}
        />
      </div>
      
      <ContentApprovalDialog 
        open={isApprovalDialogOpen}
        onOpenChange={setIsApprovalDialogOpen}
        content={selectedContent}
        topic={selectedTopic}
      />

      <BatchApprovalDialog
        open={isBatchApprovalDialogOpen}
        onOpenChange={setIsBatchApprovalDialogOpen}
        selectedContents={selectedContentItems}
        topics={topicsData}
        onSuccess={clearSelection}
      />
      
      <CreateContentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        approvedTopics={approvedTopics}
        onSuccess={handleCreateSuccess}
        isLoading={isApprovedTopicsLoading}
      />
    </div>
  );
};
