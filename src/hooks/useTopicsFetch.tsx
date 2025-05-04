
import { useState } from 'react';
import { Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { mockTopics } from '@/data/mock/topics';
import { supabase } from '@/lib/supabase';

interface TopicsResponse {
  data: Topic[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const useTopicsFetch = (useLocalData: boolean) => {
  // Fetch topics from API or Supabase
  const { data: topicsResponse, isLoading: isTopicsLoading, error: topicsError, refetch } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('Fetching topics data...');
      
      if (useLocalData) {
        console.log('Using mock topics data');
        return { 
          data: mockTopics,
          pagination: { page: 1, limit: 100, total: mockTopics.length }
        };
      }
      
      try {
        // Try to fetch from Supabase first
        if (supabase) {
          console.log('Fetching topics from Supabase');
          
          const { data, error } = await supabase
            .from('content_topics')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) {
            console.error('Error in Supabase topics fetch:', error);
            throw error;
          }
          
          // Transform the data to match our Topic interface
          const transformedData: Topic[] = data.map(topic => ({
            id: topic.id,
            brandId: topic.brand_id,
            themeTypeId: topic.theme_type_id,
            productTypeId: topic.product_type_id || undefined,
            title: topic.title,
            description: topic.description || '',
            status: topic.status as 'draft' | 'approved' | 'rejected',
            createdBy: topic.created_by,
            createdAt: new Date(topic.created_at),
            updatedAt: new Date(topic.updated_at)
          }));
          
          console.log('Topics fetched from Supabase:', transformedData.length);
          return { data: transformedData };
        }
        
        // Fallback to API if Supabase is not available
        console.log('Fetching topics from API');
        const response = await apiClient.get<TopicsResponse>('/topics');
        console.log('Topics fetched from API:', response.data?.length || 0);
        return response;
      } catch (err) {
        console.error('Error in topics fetch:', err);
        toast.error('Lỗi khi tải dữ liệu chủ đề');
        throw err;
      }
    }
  });

  // Extract topics from response
  const topics = topicsResponse?.data || [];

  return { topics, isTopicsLoading, topicsError, refetchTopics: refetch };
};
