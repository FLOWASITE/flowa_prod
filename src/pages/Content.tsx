
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ContentCard } from '@/components/content/ContentCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { Content, Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ContentApprovalDialog } from '@/components/content/ContentApprovalDialog';

const ContentPage = () => {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);

  // Fetch content from Supabase
  const { data: content = [], isLoading } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        topicId: item.topic_id,
        platform: item.platform,
        text: item.text,
        imageUrl: item.image_url,
        status: item.status,
        scheduledAt: item.scheduled_at ? new Date(item.scheduled_at) : undefined,
        publishedAt: item.published_at ? new Date(item.published_at) : undefined,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      })) as Content[];
    }
  });

  // Fetch topics from Supabase
  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_topics')
        .select('*');
      
      if (error) throw error;
      
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

  const handleApprove = (content: Content) => {
    const topic = topics.find(t => t.id === content.topicId);
    if (topic) {
      setSelectedContent(content);
      setSelectedTopic(topic);
      setIsApprovalDialogOpen(true);
    }
  };

  // Filter content by status
  const draftContent = content.filter(item => item.status === 'draft');
  const approvedContent = content.filter(item => item.status === 'approved');
  const scheduledContent = content.filter(item => item.status === 'scheduled');
  const publishedContent = content.filter(item => item.status === 'published');

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nội dung</h1>
          <p className="text-muted-foreground">Tạo, duyệt và quản lý nội dung trên các nền tảng</p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Tạo nội dung mới
        </Button>
      </div>
      
      <Tabs defaultValue="draft" className="space-y-4">
        <TabsList>
          <TabsTrigger value="draft">
            Bản nháp ({draftContent.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Đã duyệt ({approvedContent.length})
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Đã lên lịch ({scheduledContent.length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Đã đăng ({publishedContent.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="draft" className="space-y-4">
          {isLoading ? (
            <p>Đang tải...</p>
          ) : draftContent.length === 0 ? (
            <p>Không có bản nháp nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draftContent.map(item => (
                <ContentCard 
                  key={item.id}
                  content={item}
                  topic={topics.find(t => t.id === item.topicId)}
                  onApprove={() => handleApprove(item)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {approvedContent.length === 0 ? (
            <p>Không có nội dung đã duyệt nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedContent.map(item => (
                <ContentCard 
                  key={item.id}
                  content={item}
                  topic={topics.find(t => t.id === item.topicId)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          {scheduledContent.length === 0 ? (
            <p>Không có nội dung đã lên lịch nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledContent.map(item => (
                <ContentCard 
                  key={item.id}
                  content={item}
                  topic={topics.find(t => t.id === item.topicId)}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="published" className="space-y-4">
          {publishedContent.length === 0 ? (
            <p>Không có nội dung đã đăng nào.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publishedContent.map(item => (
                <ContentCard 
                  key={item.id}
                  content={item}
                  topic={topics.find(t => t.id === item.topicId)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
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
