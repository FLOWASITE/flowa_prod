
import { useState } from 'react';
import { Content } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { mockContents } from '@/data/mockData';

export const useContentFetch = (useLocalData: boolean) => {
  // Fetch content from Supabase
  const { data: content = [], isLoading: isContentLoading, error: contentError } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      console.log('Fetching content data...');
      if (useLocalData || !supabase) {
        console.log('Using mock content data');
        return mockContents;
      }
      
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching content:', error);
          toast.error('Lỗi khi tải dữ liệu nội dung', {
            description: error.message
          });
          return mockContents;
        }
        
        console.log('Content data fetched:', data?.length || 0, 'items');
        
        return data.map(item => ({
          id: item.id,
          topicId: item.topic_id,
          topicTitle: item.topic_title,
          platform: item.platform,
          text: item.text,
          imageUrl: item.image_url,
          videoUrl: item.video_url,
          videoThumbnail: item.video_thumbnail,
          status: item.status,
          scheduledAt: item.scheduled_at ? new Date(item.scheduled_at) : undefined,
          publishedAt: item.published_at ? new Date(item.published_at) : undefined,
          approvedAt: item.approved_at ? new Date(item.approved_at) : undefined,
          engagementLikes: item.engagement_likes,
          engagementComments: item.engagement_comments,
          engagementShares: item.engagement_shares,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at),
        })) as Content[];
      } catch (err) {
        console.error('Error in content fetch:', err);
        toast.error('Lỗi khi tải dữ liệu nội dung');
        return mockContents;
      }
    },
    enabled: !useLocalData
  });

  return { content, isContentLoading, contentError };
};
