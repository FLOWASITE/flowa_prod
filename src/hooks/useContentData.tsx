
import { useEffect, useState } from 'react';
import { useSupabaseConnection } from './useSupabaseConnection';
import { useContentFetch } from './useContentFetch';
import { useTopicsFetch } from './useTopicsFetch';
import { useContentActions } from './useContentActions';
import { useContentPagination } from './useContentPagination';
import { mockContents, mockTopics } from '@/data/mockData';
import { Content } from '@/types';
import { toast } from 'sonner';
import { apiClient } from '@/api/apiClient';

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
    viewMode,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange,
    handleViewModeChange
  } = useContentPagination();
  
  // Get content actions with the selected content state
  const {
    selectedContent,
    setSelectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    handleApprove,
    handleDelete,
    handleView,
    handleCreateNew
  } = useContentActions(useLocalData, topics);

  // Editor dialog state
  const [isEditorDialogOpen, setIsEditorDialogOpen] = useState(false);

  // Handle content edit
  const handleEdit = (content: Content) => {
    setSelectedContent(content);
    setIsEditorDialogOpen(true);
  };

  // Handle content save after editing
  const handleSaveContent = (updatedContent: Content) => {
    if (useLocalData) {
      toast.success('Nội dung đã được lưu (Chế độ mẫu)');
      return;
    }

    toast.promise(
      async () => {
        await apiClient.put(`/content/${updatedContent.id}`, updatedContent);
        return updatedContent;
      },
      {
        loading: 'Đang lưu nội dung...',
        success: 'Đã lưu nội dung thành công',
        error: (err) => `Lỗi: ${err.message || 'Không thể lưu nội dung'}`
      }
    );
  };

  // Batch selection state
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isBatchApprovalDialogOpen, setIsBatchApprovalDialogOpen] = useState(false);
  
  // Removed duplicate declaration of selectedContent

  // Handle batch selection
  const toggleItemSelection = (contentId: string) => {
    setSelectedItems(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId) 
        : [...prev, contentId]
    );
  };

  const selectAll = (contentIds: string[]) => {
    setSelectedItems(contentIds);
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const handleBatchApprove = () => {
    if (selectedItems.length > 0) {
      setIsBatchApprovalDialogOpen(true);
    }
  };

  // Handle errors
  useEffect(() => {
    if (contentError || topicsError) {
      console.error('Error fetching data:', contentError || topicsError);
      setUseLocalData(true);
    }
  }, [contentError, topicsError, setUseLocalData]);

  // Clean up selection when filter changes
  useEffect(() => {
    clearSelection();
  }, [selectedPlatform, currentPage, rowsPerPage]);

  // Combine it all
  const isLoading = isContentLoading || isTopicsLoading;
  const contentData = useLocalData ? mockContents : content;
  const topicsData = useLocalData ? mockTopics : topics;

  return {
    selectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    isEditorDialogOpen,
    setIsEditorDialogOpen,
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
    handleEdit,
    handleSaveContent,
    handleCreateNew,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange,
    handleViewModeChange,
    // Batch selection
    selectedItems,
    toggleItemSelection,
    selectAll,
    clearSelection,
    handleBatchApprove,
    isBatchApprovalDialogOpen,
    setIsBatchApprovalDialogOpen
  };
};
