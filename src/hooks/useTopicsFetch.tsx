
import { Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { mockTopics } from '@/data/mockData';

export const useTopicsFetch = (useLocalData: boolean) => {
  // Fetch topics from API
  const { data: topics = [], isLoading: isTopicsLoading, error: topicsError } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('Fetching topics data...');
      if (useLocalData) {
        console.log('Using mock topics data');
        return mockTopics;
      }
      
      try {
        const data = await apiClient.get<Topic[]>('/topics');
        console.log('Topics data fetched:', data?.length || 0, 'items');
        return data;
      } catch (err) {
        console.error('Error in topics fetch:', err);
        toast.error('Lỗi khi tải dữ liệu chủ đề');
        throw err;
      }
    },
    enabled: !useLocalData
  });

  return { topics, isTopicsLoading, topicsError };
};
