
import React from 'react';
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
    setSelectedPlatform
  } = useTopicsPage();
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Topic Request Form Section */}
        <div>
          <TopicRequestForm />
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
          />
        </div>
      </div>
    </Layout>
  );
};

export default Topics;
