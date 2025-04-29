
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Content, Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ContentApprovalDialog } from '@/components/content/ContentApprovalDialog';
import { toast } from 'sonner';
import { ContentHeader } from '@/components/content/ContentHeader';
import { ContentTabs } from '@/components/content/ContentTabs';

const ContentPage = () => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Fetch content from Supabase
  const { data: content = [], isLoading: isContentLoading, error: contentError } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      console.log('Fetching content data...');
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching content:', error);
        toast.error('Lỗi khi tải dữ liệu nội dung', {
          description: error.message
        });
        throw error;
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
    }
  });

  // Fetch topics from Supabase
  const { data: topics = [], isLoading: isTopicsLoading, error: topicsError } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      console.log('Fetching topics data...');
      const { data, error } = await supabase
        .from('content_topics')
        .select('*');
      
      if (error) {
        console.error('Error fetching topics:', error);
        toast.error('Lỗi khi tải dữ liệu chủ đề', {
          description: error.message
        });
        throw error;
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
    }
  });

  // Handle errors
  React.useEffect(() => {
    if (contentError || topicsError) {
      console.error('Error fetching data:', contentError || topicsError);
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
    // You can expand this functionality later to show a detailed view
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

  return (
    <Layout>
      <ContentHeader 
        title="Danh sách Nội dung"
        description="Tạo, duyệt và quản lý nội dung trên các nền tảng"
        onCreateNew={handleCreateNew}
      />
      
      <ContentTabs
        content={content}
        isLoading={isLoading}
        onApprove={handleApprove}
        onDelete={handleDelete}
        onView={handleView}
        topics={topics}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        selectedPlatform={selectedPlatform}
        onPlatformChange={handlePlatformChange}
      />
      
      <ContentApprovalDialog 
        open={isApprovalDialogOpen}
        onOpenChange={setIsApprovalDialogOpen}
        content={selectedContent}
        topic={selectedTopic}
      />
    </Layout>
  );
};

export default ContentPage;
