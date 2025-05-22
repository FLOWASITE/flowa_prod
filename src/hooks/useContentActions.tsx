
import { useState } from 'react';
import { Content, Topic } from '@/types';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export const useContentActions = (useLocalData: boolean, topics: Topic[]) => {
  const queryClient = useQueryClient();
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleApprove = (content: Content) => {
    const topic = topics.find(t => t.id === content.topicId);
    if (topic) {
      setSelectedContent(content);
      setSelectedTopic(topic);
      setIsApprovalDialogOpen(true);
    } else {
      toast.error('Không tìm thấy chủ đề cho nội dung này');
    }
  };

  const handleDelete = (contentId: string) => {
    if (useLocalData) {
      toast.success('Đã xóa nội dung thành công (Chế độ mẫu)');
      return;
    }
    
    toast.promise(
      async () => {
        await apiClient.delete(`/content/${contentId}`);
        return true;
      },
      {
        loading: 'Đang xóa nội dung...',
        success: 'Đã xóa nội dung thành công',
        error: (err) => `Lỗi: ${err.message || 'Không thể xóa nội dung'}`
      }
    );
  };

  const handleView = (content: Content) => {
    setSelectedContent(content);
    toast.info(`Xem chi tiết: ${content.text.substring(0, 30)}...`);
  };

  const handleCreateNew = () => {
    // Open the create content dialog
    setIsCreateDialogOpen(true);
  };
  
  const handleCreateSuccess = (newContent: Content) => {
    // Invalidate content query to refresh the content list
    queryClient.invalidateQueries({ queryKey: ['content'] });
  };

  return {
    selectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleApprove,
    handleDelete,
    handleView,
    handleCreateNew,
    handleCreateSuccess
  };
};
