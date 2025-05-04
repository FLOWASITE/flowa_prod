
import { useState } from 'react';
import { Content } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { mockContents } from '@/data/mock/content';
import { supabase } from '@/lib/supabase';

interface ContentResponse {
  data: Content[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const useContentFetch = (useLocalData: boolean) => {
  // Fetch content from API or Supabase
  const { data: contentResponse, isLoading: isContentLoading, error: contentError, refetch } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      console.log('Fetching content data...');
      
      if (useLocalData) {
        console.log('Using mock content data');
        return { 
          data: mockContents,
          pagination: { page: 1, limit: 100, total: mockContents.length }
        };
      }
      
      try {
        // Try to fetch from Supabase first
        if (supabase) {
          console.log('Fetching content from Supabase');
          
          const { data, error } = await supabase
            .from('content')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) {
            console.error('Error in Supabase content fetch:', error);
            throw error;
          }
          
          // Transform the data to match our Content interface
          const transformedData: Content[] = data.map(item => ({
            id: item.id,
            topicId: item.topic_id,
            topicTitle: item.topic_title,
            platform: item.platform as any,
            text: item.text,
            imageUrl: item.image_url,
            videoUrl: item.video_url,
            videoThumbnail: item.video_thumbnail,
            status: item.status as any,
            scheduledAt: item.scheduled_at ? new Date(item.scheduled_at) : undefined,
            publishedAt: item.published_at ? new Date(item.published_at) : undefined,
            approvedAt: item.approved_at ? new Date(item.approved_at) : undefined,
            engagementLikes: item.engagement_likes,
            engagementComments: item.engagement_comments,
            engagementShares: item.engagement_shares,
            createdAt: new Date(item.created_at),
            updatedAt: new Date(item.updated_at)
          }));
          
          console.log('Content fetched from Supabase:', transformedData.length);
          return { 
            data: transformedData,
            pagination: { page: 1, limit: 100, total: transformedData.length }
          };
        }
        
        // Fallback to API if Supabase is not available
        console.log('Fetching content from API');
        const response = await apiClient.get<ContentResponse>('/content');
        console.log('Content data fetched:', response.data?.length || 0, 'items');
        return response;
      } catch (err) {
        console.error('Error in content fetch:', err);
        toast.error('Lỗi khi tải dữ liệu nội dung');
        throw err;
      }
    }
  });

  // Extract content from response
  const content = contentResponse?.data || [];

  return { content, isContentLoading, contentError, refetchContent: refetch };
};
