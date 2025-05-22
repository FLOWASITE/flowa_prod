import { Topic } from '@/types';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';

export const useApprovedTopicsFetch = () => {
  // Fetch approved topics from API
  const { data: topicsResponse, isLoading: isTopicsLoading, error: topicsError, refetch } = useQuery({
    queryKey: ['approvedTopics'],
    queryFn: async (): Promise<Topic[]> => {
      console.log('Fetching approved topics data...');
      
      try {
        // Fetch topics with status=approved filter
        // Lưu ý: apiClient.get() đã tự động trả về response.data
        const response = await apiClient.get('/api/topics', {
          params: {
            status: 'approved'
          }
        });
        
        console.log('Approved topics API raw response:', response);
        
        // Check the structure of the response
        let data;
        
        // First possibility: the response itself is the array of topics
        if (Array.isArray(response)) {
          data = response;
          console.log('Response is an array of topics');
        }
        // Second possibility: response has a data property that contains the array
        else if (response && typeof response === 'object') {
          if ('data' in response && Array.isArray(response.data)) {
            data = response.data;
            console.log('Found data array in response');
          } else if ('topics' in response && Array.isArray(response.topics)) {
            data = response.topics;
            console.log('Found topics array in response');
          } else if ('items' in response && Array.isArray(response.items)) {
            data = response.items;
            console.log('Found items array in response');
          } else {
            // Try to find any array property in the response
            const arrayProps = Object.keys(response).filter(key => 
              Array.isArray(response[key as keyof typeof response])
            );
            
            if (arrayProps.length > 0) {
              const firstArrayProp = arrayProps[0];
              data = response[firstArrayProp as keyof typeof response];
              console.log(`Found array in response at property '${firstArrayProp}'`, data);
            } else {
              console.log('No array found in response, response structure:', response);
              data = [];
            }
          }
        } else {
          console.log('Unexpected response format', response);
          data = [];
        }
        
        // Kiểm tra nếu dữ liệu trả về không phải là mảng
        if (!Array.isArray(data)) {
          console.error('Invalid data format from API');
          return [];
        }
        
        return data;
      } catch (err) {
        console.error('Error in approved topics fetch:', err);
        toast.error('Lỗi khi tải dữ liệu chủ đề đã duyệt');
        return [];
      }
    },
    enabled: true,
    retry: 1
  });

  // Generate content from selected topic
  const generateContentMutation = useMutation({
    mutationFn: async (topicId: string) => {
      try {
        // Define proper interface for the response type
        interface ContentGenerationResponse {
          success: boolean;
          content?: {
            id: string;
            title: string;
            social_media?: {
              facebook: string;
              instagram: string;
              linkedin: string;
              tiktok: string;
              hashtags: string[];
              image?: string;
            };
            topic_id: string;
            created_at: string;
            status: string;
            message?: string;
            text?: string; // Keep for backward compatibility
            image_url?: string; // Keep for backward compatibility
          };
          error?: string;
          technical_error?: string;
        }
        
        // Add retry logic for API calls
        const MAX_RETRIES = 2;
        let retryCount = 0;
        let lastError: any = null;
        
        while (retryCount <= MAX_RETRIES) {
          try {
            // Include all required parameters for the API
            const response = await apiClient.post<ContentGenerationResponse>(`/api/content/generate-from-approved`, { 
              topic_id: topicId,
              with_related: true,
              save_to_db: true
            });
            
            console.log('Content generation response:', response);
            
            // Check if the response indicates an error
            if (!response.success && response.error) {
              throw new Error(response.error);
            }
            
            return response;
          } catch (error: any) {
            lastError = error;
            retryCount++;
            
            // Check if this is a rate limit error (status code 429 or 500 with quota message)
            const isRateLimitError = 
              (error.response?.status === 429) || 
              (error.response?.status === 500 && 
               (error.response?.data?.error?.includes('quota') || 
                error.response?.data?.error?.includes('rate limit')));
            
            if (isRateLimitError && retryCount <= MAX_RETRIES) {
              // Wait before retrying (exponential backoff: 2s, then 4s)
              const delay = Math.pow(2, retryCount) * 1000;
              console.log(`Rate limit error. Retrying in ${delay/1000}s... (${retryCount}/${MAX_RETRIES})`);
              await new Promise(resolve => setTimeout(resolve, delay));
              continue;
            }
            
            // If we've exhausted retries or it's not a rate limit error, throw
            break;
          }
        }
        
        // If we get here, all retries failed
        console.error('Error generating content from topic after retries:', lastError);
        
        // Create a more user-friendly error message
        if (lastError?.response?.status === 429 || 
            (lastError?.response?.status === 500 && lastError?.response?.data?.error?.includes('quota'))) {
          throw new Error('Hệ thống đang tạm thời quá tải. Vui lòng thử lại sau ít phút.');
        }
        
        throw lastError || new Error('Lỗi không xác định khi tạo nội dung');
      } catch (error) {
        console.error('Error generating content from topic:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success('Đã tạo nội dung từ chủ đề thành công');
      return data;
    },
    onError: () => {
      toast.error('Lỗi khi tạo nội dung từ chủ đề');
    }
  });

  // topicsResponse đã là mảng Topic[] hoặc undefined
  const approvedTopics = topicsResponse || [];

  console.log('Final approved topics before filtering:', approvedTopics);
  console.log('Approved topics count:', approvedTopics.length);
  
  // Check if topics have the expected structure
  if (approvedTopics.length > 0) {
    console.log('Sample topic object:', approvedTopics[0]);
    console.log('Topic status values:', approvedTopics.map(t => t.status));
    console.log('Topics with approved status:', approvedTopics.filter(t => t.status === 'approved').length);
  }
  
  // Make sure we have properly formatted topic objects
  const validTopics = approvedTopics.filter(topic => 
    topic && typeof topic === 'object' && 'id' in topic && 'title' in topic
  );
  
  // Check if we need to filter by status or if the API already filtered
  const filteredTopics = validTopics.length > 0 && validTopics.some(t => 'status' in t) 
    ? validTopics.filter(topic => topic.status === 'approved')
    : validTopics;
    
  console.log('Valid topics count:', validTopics.length);
  console.log('Final filtered topics returned:', filteredTopics.length);
  
  if (filteredTopics.length === 0 && validTopics.length > 0) {
    console.log('Warning: No topics with approved status found, but there are valid topics.');
    console.log('First valid topic example:', validTopics[0]);
  }
  
  return { 
    approvedTopics: filteredTopics, 
    isTopicsLoading, 
    topicsError,
    refetch,
    generateContentFromTopic: generateContentMutation.mutateAsync,
    isGenerating: generateContentMutation.isPending
  };
};