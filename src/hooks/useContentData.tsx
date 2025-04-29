
import { useEffect } from 'react';
import { useSupabaseConnection } from './useSupabaseConnection';
import { useContentFetch } from './useContentFetch';
import { useTopicsFetch } from './useTopicsFetch';
import { useContentActions } from './useContentActions';
import { useContentPagination } from './useContentPagination';
import { mockContents, mockTopics } from '@/data/mockData';

export const useContentData = () => {
  // Get Supabase connection status
  const { useLocalData, setUseLocalData } = useSupabaseConnection();
  
  // Get content data
  const { content, isContentLoading, contentError } = useContentFetch(useLocalData);
  
  // Get topics data
  const { topics, isTopicsLoading, topicsError } = useTopicsFetch(useLocalData);
  
  // Get pagination and filtering controls
  const {
    currentPage,
    rowsPerPage,
    selectedPlatform,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange
  } = useContentPagination();
  
  // Get content actions
  const {
    selectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    handleApprove,
    handleDelete,
    handleView,
    handleCreateNew
  } = useContentActions(useLocalData, topics);

  // Handle errors
  useEffect(() => {
    if (contentError || topicsError) {
      console.error('Error fetching data:', contentError || topicsError);
      setUseLocalData(true);
    }
  }, [contentError, topicsError, setUseLocalData]);

  // Combine it all
  const isLoading = isContentLoading || isTopicsLoading;
  const contentData = useLocalData ? mockContents : content;
  const topicsData = useLocalData ? mockTopics : topics;

  return {
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
  };
};
