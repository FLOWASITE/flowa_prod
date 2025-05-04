
import { useMemo, useState } from 'react';
import { Topic } from '@/types';
import { useTopicsFetch } from './useTopicsFetch';
import { useSupabaseConnection } from './useSupabaseConnection';

export const useTopicsData = () => {
  // Get topics data
  const { useLocalData } = useSupabaseConnection();
  const { topics: allTopics, isTopicsLoading, topicsError, refetchTopics } = useTopicsFetch(useLocalData);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [productFilter, setProductFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Apply filters
  const filteredTopics = useMemo(() => {
    return allTopics.filter(topic => {
      // Apply status filter
      if (statusFilter && topic.status !== statusFilter) {
        return false;
      }
      
      // Apply product filter
      if (productFilter && topic.productTypeId !== productFilter) {
        return false;
      }
      
      // Apply search query
      if (searchQuery && !topic.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [allTopics, statusFilter, productFilter, searchQuery]);
  
  return {
    topics: allTopics,
    filteredTopics,
    isLoading: isTopicsLoading,
    error: topicsError,
    statusFilter,
    productFilter,
    searchQuery,
    setStatusFilter,
    setProductFilter,
    setSearchQuery,
    refetchTopics
  };
};
