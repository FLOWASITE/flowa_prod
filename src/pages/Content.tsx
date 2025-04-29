
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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';

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

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'draft':
        return <div className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">Chờ duyệt</div>;
      case 'approved':
        return <div className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">Chờ duyệt</div>;
      case 'scheduled':
        return <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">Đã duyệt</div>;
      case 'published':
        return <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">Đã duyệt</div>;
      case 'rejected':
        return <div className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">Từ chối</div>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Danh sách Nội dung</h1>
          <p className="text-muted-foreground">Tạo, duyệt và quản lý nội dung trên các nền tảng</p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Tạo nội dung mới
        </Button>
      </div>
      
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
          <div className="rounded-md border">
            <div className="flex items-center p-4">
              <div className="flex-1">
                <label className="text-sm font-medium">Số dòng/trang:</label>
                <select className="ml-2 p-1 border rounded text-sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead className="w-44">Chủ đề gốc</TableHead>
                  <TableHead className="w-28">Nền tảng</TableHead>
                  <TableHead>Nội dung (Preview)</TableHead>
                  <TableHead className="w-28">Hình ảnh</TableHead>
                  <TableHead className="w-28">Ngày tạo</TableHead>
                  <TableHead className="w-28">Người duyệt</TableHead>
                  <TableHead className="w-28">Ngày duyệt</TableHead>
                  <TableHead className="w-28">Trạng thái</TableHead>
                  <TableHead className="w-28">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">Đang tải...</TableCell>
                  </TableRow>
                ) : content.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">Không có nội dung nào.</TableCell>
                  </TableRow>
                ) : (
                  content.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                        <TableCell>{topic?.title || 'Không có chủ đề'}</TableCell>
                        <TableCell className="capitalize">{item.platform}</TableCell>
                        <TableCell>
                          <div className="truncate max-w-xs" title={item.text}>
                            {item.text.substring(0, 60)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.imageUrl && (
                            <div className="h-10 w-10 relative rounded overflow-hidden">
                              <img 
                                src={item.imageUrl} 
                                alt="Nội dung" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{format(item.createdAt, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>AI Assistant</TableCell>
                        <TableCell>
                          {item.publishedAt ? format(item.publishedAt, 'dd/MM/yyyy') : '-'}
                        </TableCell>
                        <TableCell>{getStatusDisplay(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Chỉnh sửa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                <path d="m15 5 4 4"/>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500">
                              <span className="sr-only">Phê duyệt</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M20 6 9 17l-5-5"/>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <span className="sr-only">Xóa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-between p-4">
              <div className="text-sm text-muted-foreground">
                Trang 1 - Hiển thị {content.length} / {content.length} nội dung
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="draft" className="space-y-4">
          {/* Similar table structure for drafts */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead>Chủ đề gốc</TableHead>
                  <TableHead>Nền tảng</TableHead>
                  <TableHead>Nội dung (Preview)</TableHead>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Draft content rows */}
                {draftContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">Không có bản nháp nào.</TableCell>
                  </TableRow>
                ) : (
                  draftContent.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                        <TableCell>{topic?.title || 'Không có chủ đề'}</TableCell>
                        <TableCell className="capitalize">{item.platform}</TableCell>
                        <TableCell>
                          <div className="truncate max-w-xs" title={item.text}>
                            {item.text.substring(0, 60)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.imageUrl && (
                            <div className="h-10 w-10 relative rounded overflow-hidden">
                              <img 
                                src={item.imageUrl} 
                                alt="Nội dung" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{format(item.createdAt, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          <div className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">
                            Chờ duyệt
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Chỉnh sửa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                <path d="m15 5 4 4"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-green-500"
                              onClick={() => handleApprove(item)}
                            >
                              <span className="sr-only">Phê duyệt</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M20 6 9 17l-5-5"/>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <span className="sr-only">Xóa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {/* Similar table structure for approved content */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead>Chủ đề gốc</TableHead>
                  <TableHead>Nền tảng</TableHead>
                  <TableHead>Nội dung (Preview)</TableHead>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Người duyệt</TableHead>
                  <TableHead>Ngày duyệt</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Approved content rows */}
                {approvedContent.length + scheduledContent.length + publishedContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">Không có nội dung đã duyệt nào.</TableCell>
                  </TableRow>
                ) : (
                  [...approvedContent, ...scheduledContent, ...publishedContent].map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                        <TableCell>{topic?.title || 'Không có chủ đề'}</TableCell>
                        <TableCell className="capitalize">{item.platform}</TableCell>
                        <TableCell>
                          <div className="truncate max-w-xs" title={item.text}>
                            {item.text.substring(0, 60)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.imageUrl && (
                            <div className="h-10 w-10 relative rounded overflow-hidden">
                              <img 
                                src={item.imageUrl} 
                                alt="Nội dung" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{format(item.createdAt, 'dd/MM/yyyy')}</TableCell>
                        <TableCell>AI Assistant</TableCell>
                        <TableCell>
                          {item.publishedAt ? format(item.publishedAt, 'dd/MM/yyyy') : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                            Đã duyệt
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Chỉnh sửa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                <path d="m15 5 4 4"/>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500">
                              <span className="sr-only">Xem</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <span className="sr-only">Xóa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
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
