
import { Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { mockTopics } from '@/data/mockData';

export const useTopicsFetch = (useLocalData: boolean) => {
  // Fetch topics from API
  const { data: topicsResponse, isLoading: isTopicsLoading, error: topicsError } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('Fetching topics data...');
      if (useLocalData) {
        console.log('Using mock topics data');
        return mockTopics;
      }
      
      try {
        const response = await apiClient.get('/api/topics');
        // Log the full response structure to debug
        console.log('Topics API response:', response);
        if (response && typeof response === 'object' && 'data' in response) {
          console.log('Topics data structure:', response.data);
        }
        return response;
      } catch (err) {
        console.error('Error in topics fetch:', err);
        toast.error('Lỗi khi tải dữ liệu chủ đề');
        throw err;
      }
    },
    enabled: !useLocalData
  });

  // Extract topics from response
  let topics: Topic[] = [];
  
  if (topicsResponse) {
    console.log('Topics response structure:', topicsResponse);
    
    try {
      // Handle different response structures
      if (Array.isArray(topicsResponse)) {
        // If the response is directly an array
        topics = topicsResponse as Topic[];
      } else if (typeof topicsResponse === 'object' && topicsResponse !== null) {
        const responseObj = topicsResponse as unknown as { data?: unknown };
        
        if (responseObj.data) {
          if (Array.isArray(responseObj.data)) {
            // If response.data is an array
            topics = responseObj.data as Topic[];
          } else if (typeof responseObj.data === 'object' && responseObj.data !== null) {
            const nestedData = responseObj.data as { data?: unknown };
            if (nestedData.data && Array.isArray(nestedData.data)) {
              // If response.data.data is an array (nested structure)
              topics = nestedData.data as Topic[];
            }
          }
        }
      }
    } catch (error) {
      console.error('Error extracting topics from response:', error);
    }
  }
  
  console.log('Final extracted topics:', topics);
  
  return { topics, isTopicsLoading, topicsError };
};
