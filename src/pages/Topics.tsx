
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicRequestForm } from '@/components/topic/TopicRequestForm';
import { TopicsTableHeader } from '@/components/topic/TopicsTableHeader';
import { TopicsTable } from '@/components/topic/TopicsTable';
import { TopicApprovalDialog } from '@/components/topic/TopicApprovalDialog';
import { LocalDataWarning } from '@/components/content/LocalDataWarning';
import { useTopicsPage } from '@/hooks/useTopicsPage';
import { Topic } from '@/types';
import { useTopicStatusUpdate } from '@/hooks/useTopicStatusUpdate';
import { useSupabaseConnection } from '@/hooks/useSupabaseConnection';

const Topics = () => {
  const { useLocalData } = useSupabaseConnection();
  const {
    selectedTopics,
    currentPage,
    rowsPerPage,
    selectedPlatform,
    filteredTopics,
    paginatedTopics,
    uniqueProductIds,
    getTranslation,
    handleSelectTopic,
    handleSelectAll,
    handleBulkApprove,
    handleCreateNew,
    handlePageChange,
    handleRowsPerPageChange,
    setSelectedPlatform,
    handleViewTopic,
    handleEditTopic
  } = useTopicsPage();
  
  // Topic approval dialog state
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  // Topic status update hooks
  const { approveTopic, rejectTopic, isLoading } = useTopicStatusUpdate();
  
  // Handle approve topic with confirmation dialog
  const handleApproveTopic = (topic: Topic) => {
    if (topic.status !== 'draft') {
      return;
    }
    setSelectedTopic(topic);
    setApprovalDialogOpen(true);
  };
  
  // Handle reject topic with confirmation dialog
  const handleRejectTopic = (topic: Topic) => {
    if (topic.status !== 'draft') {
      return;
    }
    setSelectedTopic(topic);
    setRejectDialogOpen(true);
  };
  
  // Confirm approval
  const confirmApprove = async () => {
    if (!selectedTopic) return;
    
    const success = await approveTopic(selectedTopic);
    if (success) {
      setApprovalDialogOpen(false);
      setSelectedTopic(null);
    }
  };
  
  // Confirm rejection
  const confirmReject = async () => {
    if (!selectedTopic) return;
    
    const success = await rejectTopic(selectedTopic);
    if (success) {
      setRejectDialogOpen(false);
      setSelectedTopic(null);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-8 overflow-y-auto">
        {/* Topic Request Form Section */}
        <div>
          <TopicRequestForm />
        </div>
        
        {/* Data Source Warning */}
        <LocalDataWarning useLocalData={useLocalData} />

        {/* Topic Management Section */}
        <div>
          <TopicsTableHeader
            title={getTranslation('title')}
            subtitle={getTranslation('subtitle')}
            selectedTopics={selectedTopics}
            onBulkApprove={handleBulkApprove}
            onCreateNew={handleCreateNew}
          />

          <TopicsTable
            topics={filteredTopics}
            filteredTopics={filteredTopics}
            paginatedTopics={paginatedTopics}
            selectedTopics={selectedTopics}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            selectedPlatform={selectedPlatform}
            uniqueProductIds={uniqueProductIds}
            handleSelectTopic={handleSelectTopic}
            handleSelectAll={handleSelectAll}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            setSelectedPlatform={setSelectedPlatform}
            getTranslation={getTranslation}
            // Action handlers
            handleViewTopic={handleViewTopic}
            handleApproveTopic={handleApproveTopic}
            handleEditTopic={handleEditTopic}
            handleRejectTopic={handleRejectTopic}
          />
        </div>
        
        {/* Approval/Rejection Dialog */}
        <TopicApprovalDialog
          open={approvalDialogOpen}
          onOpenChange={setApprovalDialogOpen}
          topic={selectedTopic}
          onApprove={confirmApprove}
          isLoading={isLoading}
          action="approve"
        />
        
        <TopicApprovalDialog
          open={rejectDialogOpen}
          onOpenChange={setRejectDialogOpen}
          topic={selectedTopic}
          onApprove={confirmReject}
          isLoading={isLoading}
          action="reject"
        />
      </div>
    </Layout>
  );
}

export default Topics;
