
import { useState } from 'react';
import { Content, Topic as ContentTopic } from '@/types';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface FileTopic {
  id: string;
  name: string;
  description?: string;
}

interface Platform {
  id: string;
  name: string;
  platform_type: string;
}

export const useContentApproval = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const approveContent = async (content: Content, topic: ContentTopic) => {
    if (!content || !topic) {
      toast.error('Nội dung hoặc chủ đề không hợp lệ');
      return;
    }

    setIsLoading(true);

    try {
      // Call API to approve content
      await apiClient.post<Content>(`/content/${content.id}/approve`);
      
      // Check if the topic already exists in the file manager
      const fileTopics = await apiClient.get<FileTopic[]>('/files/topics');
      
      let fileTopicId;
      
      // If topic doesn't exist, create it
      const existingTopic = fileTopics.find(t => t.name === topic.title);
      if (!existingTopic) {
        const newTopic = await apiClient.post<FileTopic>('/files/topics', {
          name: topic.title,
          description: topic.description || '',
        });
        
        fileTopicId = newTopic.id;
        console.log('Created new file topic:', fileTopicId);
      } else {
        fileTopicId = existingTopic.id;
        console.log('Using existing file topic:', fileTopicId);
      }
      
      // Check if platform exists for this topic
      const platforms = await apiClient.get<Platform[]>(`/files/platforms?topic_id=${fileTopicId}`);
      
      // If platform doesn't exist, create it
      const existingPlatform = platforms.find(p => p.platform_type === content.platform);
      if (!existingPlatform) {
        const platformName = `${topic.title} - ${content.platform}`;
        
        await apiClient.post<Platform>('/files/platforms', {
          topic_id: fileTopicId,
          platform_type: content.platform,
          name: platformName,
          description: `Auto-generated platform for ${topic.title} on ${content.platform}`
        });
        
        console.log('Created new platform for topic', fileTopicId);
      }
      
      // If content has image, create file entry
      if (content.imageUrl) {
        const platformData = await apiClient.get<Platform[]>(`/files/platforms?topic_id=${fileTopicId}&platform_type=${content.platform}`);
        
        if (platformData.length > 0) {
          const platformId = platformData[0].id;
          const fileName = `Content-${content.id}-${new Date().getTime()}`;
          
          // Create file entry
          await apiClient.post('/files', {
            platform_id: platformId,
            name: fileName,
            file_type: 'image/jpeg', // Assuming JPEG, adjust if needed
            file_path: content.imageUrl,
            tags: ['content', content.platform, 'auto-generated']
          });
          
          console.log('Created file entry for content image');
        }
      }
      
      // Refresh the relevant data
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['fileTopics'] });
      queryClient.invalidateQueries({ queryKey: ['filePlatforms'] });
      queryClient.invalidateQueries({ queryKey: ['files'] });
      
      toast.success('Nội dung đã được duyệt và dữ liệu đã được tạo');
      return true;
    } catch (error) {
      console.error('Error approving content:', error);
      toast.error('Có lỗi xảy ra khi duyệt nội dung');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Thêm hàm mới để từ chối nội dung
  const rejectContent = async (contentId: string, reason?: string) => {
    if (!contentId) {
      toast.error('ID nội dung không hợp lệ');
      return;
    }

    setIsLoading(true);

    try {
      // Call API to reject content
      await apiClient.post(`/content/${contentId}/reject`, { reason });
      
      // Refresh content data
      queryClient.invalidateQueries({ queryKey: ['content'] });
      
      toast.success('Nội dung đã bị từ chối');
      return true;
    } catch (error) {
      console.error('Error rejecting content:', error);
      toast.error('Có lỗi xảy ra khi từ chối nội dung');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { approveContent, rejectContent, isLoading };
};
