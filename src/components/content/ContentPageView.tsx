
import React from 'react';
import { ContentApprovalDialog } from '@/components/content/ContentApprovalDialog';
import { ContentHeader } from '@/components/content/ContentHeader';
import { ContentTabs } from '@/components/content/ContentTabs';
import { LocalDataWarning } from '@/components/content/LocalDataWarning';
import { useContentDataContext } from './ContentPageProvider';

export const ContentPageView: React.FC = () => {
  const {
    selectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    currentPage,
    rowsPerPage,
    selectedPlatform,
    useLocalData,
    contentData,
    topicsData,
    isLoading,
    handleApprove,
    handleDelete,
    handleView,
    handleCreateNew,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange
  } = useContentDataContext();

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
        />
      </div>
      
      <ContentApprovalDialog 
        open={isApprovalDialogOpen}
        onOpenChange={setIsApprovalDialogOpen}
        content={selectedContent}
        topic={selectedTopic}
      />
    </div>
  );
};
