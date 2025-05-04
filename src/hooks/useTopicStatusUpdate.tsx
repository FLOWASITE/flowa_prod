
import { useState } from 'react';
import { Topic } from '@/types';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useTopicStatusUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const approveTopic = async (topic: Topic) => {
    if (!topic) {
      toast.error('Chủ đề không hợp lệ');
      return false;
    }

    setIsLoading(true);

    try {
      // Try with Supabase first
      if (supabase) {
        console.log('Approving topic via Supabase:', topic.id);
        
        const { data, error } = await supabase
          .from('content_topics')
          .update({
            status: 'approved',
            updated_at: new Date().toISOString()
          })
          .eq('id', topic.id);
        
        if (error) {
          console.error('Error approving topic with Supabase:', error);
          throw error;
        }
        
        // Refresh topics data
        queryClient.invalidateQueries({ queryKey: ['topics'] });
        // Also refresh content data since the trigger should create new content
        queryClient.invalidateQueries({ queryKey: ['content'] });
        
        toast.success('Chủ đề đã được duyệt và nội dung đã được tạo');
        return true;
      }

      // Fallback to API if Supabase is not available
      await apiClient.post(`/topics/${topic.id}/approve`);
      
      // Refresh topics data
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      
      toast.success('Chủ đề đã được duyệt');
      return true;
    } catch (error) {
      console.error('Error approving topic:', error);
      toast.error('Có lỗi xảy ra khi duyệt chủ đề');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const rejectTopic = async (topic: Topic, reason?: string) => {
    if (!topic) {
      toast.error('Chủ đề không hợp lệ');
      return false;
    }

    setIsLoading(true);

    try {
      // Try with Supabase first
      if (supabase) {
        console.log('Rejecting topic via Supabase:', topic.id);
        
        const { data, error } = await supabase
          .from('content_topics')
          .update({
            status: 'rejected',
            updated_at: new Date().toISOString()
          })
          .eq('id', topic.id);
        
        if (error) {
          console.error('Error rejecting topic with Supabase:', error);
          throw error;
        }
        
        // Refresh topics data
        queryClient.invalidateQueries({ queryKey: ['topics'] });
        
        toast.success('Chủ đề đã bị từ chối');
        return true;
      }

      // Fallback to API if Supabase is not available
      await apiClient.post(`/topics/${topic.id}/reject`, { reason });
      
      // Refresh topics data
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      
      toast.success('Chủ đề đã bị từ chối');
      return true;
    } catch (error) {
      console.error('Error rejecting topic:', error);
      toast.error('Có lỗi xảy ra khi từ chối chủ đề');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    approveTopic,
    rejectTopic,
    isLoading
  };
};
