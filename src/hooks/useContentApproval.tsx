
import { useState } from 'react';
import { Content, Topic as ContentTopic, Platform } from '@/types';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

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
      // 1. Update content status to approved
      const { error: contentError } = await supabase
        .from('content')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', content.id);

      if (contentError) throw contentError;

      // 2. Check if the topic already exists in the file manager
      const { data: existingTopics, error: topicsError } = await supabase
        .from('topics')
        .select('*')
        .eq('name', topic.title);

      if (topicsError) throw topicsError;

      let fileTopicId;

      // If topic doesn't exist, create it
      if (existingTopics.length === 0) {
        const { data: newTopicData, error: newTopicError } = await supabase
          .from('topics')
          .insert({
            name: topic.title,
            description: topic.description || '',
          })
          .select();

        if (newTopicError) throw newTopicError;

        fileTopicId = newTopicData[0].id;
        console.log('Created new file topic:', fileTopicId);
      } else {
        fileTopicId = existingTopics[0].id;
        console.log('Using existing file topic:', fileTopicId);
      }

      // 3. Check if platform exists for this topic
      const { data: existingPlatforms, error: platformsError } = await supabase
        .from('platforms')
        .select('*')
        .eq('topic_id', fileTopicId)
        .eq('platform_type', content.platform);

      if (platformsError) throw platformsError;

      // If platform doesn't exist, create it
      if (existingPlatforms.length === 0) {
        const platformName = `${topic.title} - ${content.platform}`;
        
        const { error: newPlatformError } = await supabase
          .from('platforms')
          .insert({
            topic_id: fileTopicId,
            platform_type: content.platform,
            name: platformName,
            description: `Auto-generated platform for ${topic.title} on ${content.platform}`
          });

        if (newPlatformError) throw newPlatformError;
        
        console.log('Created new platform for topic', fileTopicId);
      }

      // 4. If content has image, create file entry
      if (content.imageUrl) {
        const { data: platformData } = await supabase
          .from('platforms')
          .select('id')
          .eq('topic_id', fileTopicId)
          .eq('platform_type', content.platform)
          .single();

        if (platformData) {
          const platformId = platformData.id;
          const fileName = `Content-${content.id}-${new Date().getTime()}`;
          
          // Create file entry
          const { error: fileError } = await supabase
            .from('files')
            .insert({
              platform_id: platformId,
              name: fileName,
              file_type: 'image/jpeg', // Assuming JPEG, adjust if needed
              file_path: content.imageUrl,
              tags: ['content', content.platform, 'auto-generated']
            });

          if (fileError) {
            console.error('Error creating file entry:', fileError);
          } else {
            console.log('Created file entry for content image');
          }
        }
      }

      // 5. Refresh the relevant data
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

  return { approveContent, isLoading };
};
