
import { useState, useEffect } from 'react';
import { Content, Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { mockContents, mockTopics } from '@/data/mockData';
import { isSupabaseConnected } from '@/lib/supabase';

export const useContentData = () => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [useLocalData, setUseLocalData] = useState(false);

  // Check if Supabase is connected
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isSupabaseConnected();
      if (!connected) {
        setUseLocalData(true);
        toast.warning('Sử dụng dữ liệu mẫu', {
          description: 'Không thể kết nối với cơ sở dữ liệu, đang sử dụng dữ liệu mẫu.'
        });
      }
    };
    
    checkConnection();
  }, []);

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
          setUseLocalData(true);
          return mockContents;
        }
        
        console.log('Content data fetched:', data?.length || 0, 'items');
        
        return data.map(item => ({
          id: item.id,
          topicId: item.topic_id,
          platform: item.platform,
          text: item.text,
          imageUrl: item.image_url,
          status: item.status,
          scheduledAt: item.scheduled_at ? new Date(item.scheduled_at) : undefined,
          publishedAt: item.published_at ? new Date(item.published_at) : undefined,
          approvedAt: item.approved_at ? new Date(item.approved_at) : undefined,
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at),
        })) as Content[];
      } catch (err) {
        console.error('Error in content fetch:', err);
        toast.error('Lỗi khi tải dữ liệu nội dung');
        setUseLocalData(true);
        return mockContents;
      }
    },
    enabled: !useLocalData
  });

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
          setUseLocalData(true);
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
        setUseLocalData(true);
        return mockTopics;
      }
    },
    enabled: !useLocalData
  });

  // Handle errors
  useEffect(() => {
    if (contentError || topicsError) {
      console.error('Error fetching data:', contentError || topicsError);
      setUseLocalData(true);
    }
  }, [contentError, topicsError]);

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
        const { error } = await supabase
          .from('content')
          .delete()
          .eq('id', contentId);
        
        if (error) throw error;
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
    toast.info('Tính năng đang phát triển');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    setCurrentPage(1); // Reset to first page when changing platform filter
  };

  const isLoading = isContentLoading || isTopicsLoading;
  const contentData = useLocalData ? mockContents : content;
  const topicsData = useLocalData ? mockTopics : topics;

  return {
    selectedContent,
    selectedTopic,
    isApprovalDialogOpen,
    setIsApprovalDialogOpen,
    currentPage,
    rowsPerPage,
    selectedPlatform,
    useLocalData,
    contentData,
    topicsData,
    isLoading,
    handleApprove,
    handleDelete,
    handleView,
    handleCreateNew,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange
  };
};
