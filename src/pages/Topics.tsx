
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicRequestForm } from '@/components/topic/TopicRequestForm';
import { TopicsTableHeader } from '@/components/topic/TopicsTableHeader';
import { TopicsTable } from '@/components/topic/TopicsTable';
import { useTopicsPage } from '@/hooks/useTopicsPage';

const Topics = () => {
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
    // New action handlers
    handleViewTopic,
    handleApproveTopic,
    handleEditTopic,
    handleRejectTopic
  } = useTopicsPage();
  const [topics, setTopics] = useState<[]>([]);

  return (
    <Layout>
      <div className="space-y-8 overflow-y-auto">
        {/* Topic Request Form Section */}
        <div>
          <TopicRequestForm setTopics={setTopics} />
        </div>

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
            paginatedTopics={topics}
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
            // New action handlers
            handleViewTopic={handleViewTopic}
            handleApproveTopic={handleApproveTopic}
            handleEditTopic={handleEditTopic}
            handleRejectTopic={handleRejectTopic}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Topics;
