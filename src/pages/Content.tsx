
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Content, Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ContentApprovalDialog } from '@/components/content/ContentApprovalDialog';
import { BatchApprovalDialog } from '@/components/content/BatchApprovalDialog';
import { toast } from 'sonner';
import { ContentHeader } from '@/components/content/ContentHeader';
import { ContentTabAll } from '@/components/content/ContentTabAll';
import { ContentTabDraft } from '@/components/content/ContentTabDraft';
import { ContentTabApproved } from '@/components/content/ContentTabApproved';

const ContentPage = () => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isBatchApprovalDialogOpen, setIsBatchApprovalDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>([]);

  // Fetch content from Supabase
  const { data: content = [], isLoading: isContentLoading, error: contentError, refetch: refetchContent } = useQuery({
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

  const handleBatchApprove = () => {
    if (selectedContentIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một nội dung để duyệt');
      return;
    }

    const contentsToApprove = content.filter(item => 
      selectedContentIds.includes(item.id) && item.status === 'draft'
    );

    if (contentsToApprove.length === 0) {
      toast.error('Không có nội dung nào có thể duyệt trong các mục đã chọn');
      return;
    }

    setIsBatchApprovalDialogOpen(true);
  };

  const handleDelete = (contentId: string) => {
    toast.promise(
      async () => {
        const { error } = await supabase
          .from('content')
          .delete()
          .eq('id', contentId);
        
        if (error) throw error;
        refetchContent();
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

  // Filter content by status
  const draftContent = content.filter(item => item.status === 'draft');
  const approvedContent = content.filter(item => item.status === 'approved');
  const scheduledContent = content.filter(item => item.status === 'scheduled');
  const publishedContent = content.filter(item => item.status === 'published');

  const isLoading = isContentLoading || isTopicsLoading;

  // Handle checkbox selection
  const toggleSelectAll = (checked: boolean, contentList: Content[]) => {
    if (checked) {
      const newSelectedIds = [...new Set([
        ...selectedContentIds,
        ...contentList.map(item => item.id)
      ])];
      setSelectedContentIds(newSelectedIds);
    } else {
      const contentIds = contentList.map(item => item.id);
      const newSelectedIds = selectedContentIds.filter(id => !contentIds.includes(id));
      setSelectedContentIds(newSelectedIds);
    }
  };

  const toggleSelectItem = (checked: boolean, contentId: string) => {
    if (checked) {
      setSelectedContentIds(prev => [...prev, contentId]);
    } else {
      setSelectedContentIds(prev => prev.filter(id => id !== contentId));
    }
  };

  // Pagination logic
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Selected draft contents for batch approval
  const selectedDraftContents = content.filter(
    item => selectedContentIds.includes(item.id) && item.status === 'draft'
  );

  return (
    <Layout>
      <ContentHeader 
        selectedContentCount={selectedContentIds.length}
        onBatchApprove={handleBatchApprove}
      />
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            Tất cả ({content.length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Bản nháp ({draftContent.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Đã duyệt ({approvedContent.length + scheduledContent.length + publishedContent.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <ContentTabAll
            content={content}
            topics={topics}
            isLoading={isLoading}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            selectedContentIds={selectedContentIds}
            toggleSelectAll={toggleSelectAll}
            toggleSelectItem={toggleSelectItem}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onView={handleView}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TabsContent>
        
        <TabsContent value="draft" className="space-y-4">
          <ContentTabDraft
            content={draftContent}
            topics={topics}
            isLoading={isLoading}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            selectedContentIds={selectedContentIds}
            toggleSelectAll={toggleSelectAll}
            toggleSelectItem={toggleSelectItem}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onView={handleView}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onBatchApprove={handleBatchApprove}
          />
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          <ContentTabApproved
            approvedContent={approvedContent}
            scheduledContent={scheduledContent}
            publishedContent={publishedContent}
            topics={topics}
            isLoading={isLoading}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            selectedContentIds={selectedContentIds}
            toggleSelectAll={toggleSelectAll}
            toggleSelectItem={toggleSelectItem}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onView={handleView}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TabsContent>
      </Tabs>
      
      <ContentApprovalDialog 
        open={isApprovalDialogOpen}
        onOpenChange={setIsApprovalDialogOpen}
        content={selectedContent}
        topic={selectedTopic}
        onApproved={() => refetchContent()}
      />
      
      <BatchApprovalDialog
        open={isBatchApprovalDialogOpen}
        onOpenChange={setIsBatchApprovalDialogOpen}
        contents={selectedDraftContents}
        topics={topics}
        onApproved={() => {
          refetchContent();
          setSelectedContentIds([]);
        }}
      />
    </Layout>
  );
};

export default ContentPage;
