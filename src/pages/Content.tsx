
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ContentCard } from '@/components/content/ContentCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle2, Loader2, Plus } from 'lucide-react';
import { Content, Topic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ContentApprovalDialog } from '@/components/content/ContentApprovalDialog';
import { BatchApprovalDialog } from '@/components/content/BatchApprovalDialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { PlatformIcon } from '@/components/content/PlatformIcon';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'draft':
        return <div className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">Chờ duyệt</div>;
      case 'approved':
        return <div className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Đã duyệt</div>;
      case 'scheduled':
        return <div className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md">Đã lên lịch</div>;
      case 'published':
        return <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">Đã đăng</div>;
      case 'rejected':
        return <div className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">Từ chối</div>;
      default:
        return null;
    }
  };

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

  const isAllSelected = (contentList: Content[]) => {
    return contentList.length > 0 && 
      contentList.every(item => selectedContentIds.includes(item.id));
  };

  // Pagination logic
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const getPaginatedData = (data: Content[]) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = (dataLength: number) => Math.ceil(dataLength / rowsPerPage);

  const renderPagination = (dataLength: number) => {
    const pages = totalPages(dataLength);
    if (pages <= 1) return null;

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {[...Array(pages)].map((_, i) => {
            const pageNumber = i + 1;
            // Show first page, current page, last page, and one page before and after current
            if (
              pageNumber === 1 || 
              pageNumber === pages || 
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    isActive={currentPage === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              (pageNumber === currentPage - 2 && currentPage > 3) || 
              (pageNumber === currentPage + 2 && currentPage < pages - 2)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < pages && handlePageChange(currentPage + 1)} 
              className={currentPage === pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  // Get paginated data for each tab
  const paginatedAllContent = getPaginatedData(content);
  const paginatedDraftContent = getPaginatedData(draftContent);
  const paginatedApprovedContent = getPaginatedData([...approvedContent, ...scheduledContent, ...publishedContent]);

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'dd/MM/yyyy') : '-';
  };

  // Selected draft contents for batch approval
  const selectedDraftContents = content.filter(
    item => selectedContentIds.includes(item.id) && item.status === 'draft'
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Danh sách Nội dung</h1>
          <p className="text-muted-foreground">Tạo, duyệt và quản lý nội dung trên các nền tảng</p>
        </div>
        
        <div className="flex gap-2">
          {selectedContentIds.length > 0 && (
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={handleBatchApprove}
            >
              <CheckCircle2 className="h-4 w-4" />
              Duyệt ({selectedContentIds.length})
            </Button>
          )}
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Tạo nội dung mới
          </Button>
        </div>
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
                <select 
                  className="ml-2 p-1 border rounded text-sm"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox 
                      checked={isAllSelected(paginatedAllContent)}
                      onCheckedChange={(checked) => 
                        toggleSelectAll(checked === true, paginatedAllContent)
                      }
                      aria-label="Chọn tất cả"
                    />
                  </TableHead>
                  <TableHead className="w-60">Chủ đề gốc</TableHead>
                  <TableHead className="w-20">Nền tảng</TableHead>
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
                    <TableCell colSpan={10} className="text-center py-4">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Đang tải...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedAllContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">Không có nội dung nào.</TableCell>
                  </TableRow>
                ) : (
                  paginatedAllContent.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedContentIds.includes(item.id)}
                            onCheckedChange={(checked) => 
                              toggleSelectItem(checked === true, item.id)
                            }
                            aria-label={`Chọn nội dung ${displayIndex}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="line-clamp-2">
                            {topic?.title || 'Không có chủ đề'}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <PlatformIcon platform={item.platform} />
                        </TableCell>
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
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                        <TableCell>AI Assistant</TableCell>
                        <TableCell>{formatDate(item.approvedAt)}</TableCell>
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
                            {item.status === 'draft' && (
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
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-blue-500"
                              onClick={() => handleView(item)}
                            >
                              <span className="sr-only">Xem</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDelete(item.id)}
                            >
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
                Trang {currentPage} - Hiển thị {paginatedAllContent.length} / {content.length} nội dung
              </div>
              {renderPagination(content.length)}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="draft" className="space-y-4">
          <div className="rounded-md border">
            <div className="flex items-center p-4 justify-between">
              <div>
                <label className="text-sm font-medium">Số dòng/trang:</label>
                <select 
                  className="ml-2 p-1 border rounded text-sm"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              {selectedContentIds.filter(id => 
                draftContent.some(item => item.id === id)
              ).length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBatchApprove}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Duyệt hàng loạt ({selectedContentIds.filter(id => 
                    draftContent.some(item => item.id === id)
                  ).length})
                </Button>
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox 
                      checked={isAllSelected(paginatedDraftContent)}
                      onCheckedChange={(checked) => 
                        toggleSelectAll(checked === true, paginatedDraftContent)
                      }
                      aria-label="Chọn tất cả"
                    />
                  </TableHead>
                  <TableHead className="w-60">Chủ đề gốc</TableHead>
                  <TableHead className="w-20">Nền tảng</TableHead>
                  <TableHead>Nội dung (Preview)</TableHead>
                  <TableHead className="w-28">Hình ảnh</TableHead>
                  <TableHead className="w-28">Ngày tạo</TableHead>
                  <TableHead className="w-28">Trạng thái</TableHead>
                  <TableHead className="w-28">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Đang tải...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedDraftContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">Không có bản nháp nào.</TableCell>
                  </TableRow>
                ) : (
                  paginatedDraftContent.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedContentIds.includes(item.id)}
                            onCheckedChange={(checked) => 
                              toggleSelectItem(checked === true, item.id)
                            }
                            aria-label={`Chọn nội dung ${displayIndex}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="line-clamp-2">
                            {topic?.title || 'Không có chủ đề'}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <PlatformIcon platform={item.platform} />
                        </TableCell>
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
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
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
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDelete(item.id)}
                            >
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
                Trang {currentPage} - Hiển thị {paginatedDraftContent.length} / {draftContent.length} nội dung
              </div>
              {renderPagination(draftContent.length)}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          <div className="rounded-md border">
            <div className="flex items-center p-4">
              <div className="flex-1">
                <label className="text-sm font-medium">Số dòng/trang:</label>
                <select 
                  className="ml-2 p-1 border rounded text-sm"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox 
                      checked={isAllSelected(paginatedApprovedContent)}
                      onCheckedChange={(checked) => 
                        toggleSelectAll(checked === true, paginatedApprovedContent)
                      }
                      aria-label="Chọn tất cả"
                    />
                  </TableHead>
                  <TableHead className="w-60">Chủ đề gốc</TableHead>
                  <TableHead className="w-20">Nền tảng</TableHead>
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
                    <TableCell colSpan={10} className="text-center py-4">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Đang tải...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedApprovedContent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">Không có nội dung đã duyệt nào.</TableCell>
                  </TableRow>
                ) : (
                  paginatedApprovedContent.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedContentIds.includes(item.id)}
                            onCheckedChange={(checked) => 
                              toggleSelectItem(checked === true, item.id)
                            }
                            aria-label={`Chọn nội dung ${displayIndex}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="line-clamp-2">
                            {topic?.title || 'Không có chủ đề'}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <PlatformIcon platform={item.platform} />
                        </TableCell>
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
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                        <TableCell>AI Assistant</TableCell>
                        <TableCell>{formatDate(item.approvedAt)}</TableCell>
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
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-blue-500"
                              onClick={() => handleView(item)}
                            >
                              <span className="sr-only">Xem</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDelete(item.id)}
                            >
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
                Trang {currentPage} - Hiển thị {paginatedApprovedContent.length} / {approvedContent.length + scheduledContent.length + publishedContent.length} nội dung
              </div>
              {renderPagination(approvedContent.length + scheduledContent.length + publishedContent.length)}
            </div>
          </div>
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
