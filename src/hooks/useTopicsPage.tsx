
import { useState, useEffect, useCallback } from 'react';
import { Topic } from '@/types';
import { useTopicsData } from './useTopicsData';
import { useSupabaseConnection } from './useSupabaseConnection';
import { useTopicStatusUpdate } from './useTopicStatusUpdate';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const useTopicsPage = () => {
  const { topics, filteredTopics, isLoading, refetchTopics } = useTopicsData();
  const { useLocalData } = useSupabaseConnection();
  const { approveTopic, rejectTopic } = useTopicStatusUpdate();
  const queryClient = useQueryClient();
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Filtering
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  
  // Selection
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  // Calculate paginated data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTopics = filteredTopics.slice(startIndex, startIndex + rowsPerPage);
  
  // Get unique product IDs for filtering
  const uniqueProductIds = [...new Set(topics.map(topic => topic.productTypeId).filter(Boolean))] as string[];
  
  // Selection handlers
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  const handleSelectAll = useCallback(() => {
    if (selectedTopics.length === paginatedTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(paginatedTopics.map(topic => topic.id));
    }
  }, [paginatedTopics, selectedTopics.length]);
  
  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  
  // Bulk actions
  const handleBulkApprove = async () => {
    if (selectedTopics.length === 0) return;
    
    const success = await Promise.all(
      selectedTopics.map(async (topicId) => {
        const topic = topics.find(t => t.id === topicId);
        if (topic && topic.status === 'draft') {
          return await approveTopic(topic);
        }
        return false;
      })
    );
    
    if (success.every(Boolean)) {
      toast.success(`${selectedTopics.length} chủ đề đã được duyệt`);
      setSelectedTopics([]);
      refetchTopics();
    }
  };
  
  // Create new topic
  const handleCreateNew = () => {
    // This would open a modal to create a new topic
    // For now just show a toast message
    toast.info('Tính năng đang phát triển');
  };
  
  // Individual topic actions
  const handleViewTopic = (topic: Topic) => {
    // This would navigate to topic detail view
    // For now just show a toast message
    toast.info(`Xem chi tiết: ${topic.title}`);
  };
  
  const handleApproveTopic = async (topic: Topic) => {
    if (topic.status !== 'draft') {
      toast.info('Chỉ có thể duyệt các chủ đề đang ở trạng thái chờ duyệt');
      return;
    }
    
    const success = await approveTopic(topic);
    if (success) {
      // If the topic is in the selected topics list, remove it
      if (selectedTopics.includes(topic.id)) {
        setSelectedTopics(prev => prev.filter(id => id !== topic.id));
      }
      
      // Refresh both topics and content data
      refetchTopics();
      queryClient.invalidateQueries({ queryKey: ['content'] });
    }
  };
  
  const handleEditTopic = (topic: Topic) => {
    // This would open a modal to edit the topic
    // For now just show a toast message
    toast.info(`Sửa chủ đề: ${topic.title}`);
  };
  
  const handleRejectTopic = async (topic: Topic) => {
    if (topic.status !== 'draft') {
      toast.info('Chỉ có thể từ chối các chủ đề đang ở trạng thái chờ duyệt');
      return;
    }
    
    const success = await rejectTopic(topic);
    if (success) {
      // If the topic is in the selected topics list, remove it
      if (selectedTopics.includes(topic.id)) {
        setSelectedTopics(prev => prev.filter(id => id !== topic.id));
      }
      refetchTopics();
    }
  };
  
  // Reset selected topics when filtered topics change
  useEffect(() => {
    setSelectedTopics([]);
  }, [filteredTopics.length]);
  
  // Translation
  const getTranslation = (key: string) => {
    const translations = {
      title: 'Quản lý chủ đề',
      subtitle: 'Quản lý và duyệt các chủ đề được tạo bởi AI',
      product: 'Sản phẩm',
      noProduct: 'Không có',
      noData: 'Không có dữ liệu',
      loading: 'Đang tải...',
      all: 'Tất cả'
    };
    
    return translations[key] || key;
  };

  return {
    selectedTopics,
    currentPage,
    rowsPerPage,
    selectedPlatform,
    topics,
    filteredTopics,
    paginatedTopics,
    uniqueProductIds,
    isLoading,
    getTranslation,
    handleSelectTopic,
    handleSelectAll,
    handleBulkApprove,
    handleCreateNew,
    handlePageChange,
    handleRowsPerPageChange,
    setSelectedPlatform,
    handleViewTopic,
    handleApproveTopic,
    handleEditTopic,
    handleRejectTopic
  };
};
