
import { useState } from 'react';
import { Topic } from '@/types';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const useTopicStatusUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const approveTopic = async (topic: Topic) => {
    if (!topic) {
      toast.error('Chủ đề không hợp lệ');
      return;
    }

    setIsLoading(true);

    try {
      // Call API to approve topic
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
      return;
    }

    setIsLoading(true);

    try {
      // Call API to reject topic
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
