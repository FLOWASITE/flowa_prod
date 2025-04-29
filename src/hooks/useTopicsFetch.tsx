
import { Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { mockTopics } from '@/data/mockData';

export const useTopicsFetch = (useLocalData: boolean) => {
  // Fetch topics from Supabase
  const { data: topics = [], isLoading: isTopicsLoading, error: topicsError } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('Fetching topics data...');
      if (useLocalData || !supabase) {
        console.log('Using mock topics data');
        return mockTopics;
      }
      
      try {
        const { data, error } = await supabase
          .from('content_topics')
          .select('*');
        
        if (error) {
          console.error('Error fetching topics:', error);
          toast.error('Lỗi khi tải dữ liệu chủ đề', {
            description: error.message
          });
          return mockTopics;
        }
        
        console.log('Topics data fetched:', data?.length || 0, 'items');
        
        return data.map(topic => ({
          id: topic.id,
          brandId: topic.brand_id,
          themeTypeId: topic.theme_type_id,
          productTypeId: topic.product_type_id,
          title: topic.title,
          description: topic.description,
          status: topic.status,
          createdBy: topic.created_by,
          createdAt: new Date(topic.created_at),
          updatedAt: new Date(topic.updated_at),
        })) as Topic[];
      } catch (err) {
        console.error('Error in topics fetch:', err);
        toast.error('Lỗi khi tải dữ liệu chủ đề');
        return mockTopics;
      }
    },
    enabled: !useLocalData
  });

  return { topics, isTopicsLoading, topicsError };
};
