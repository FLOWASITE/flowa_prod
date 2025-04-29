
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Content } from '@/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { platformIcons } from '../chat/PlatformIcons';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentTableProps {
  items: Content[];
  allItems: Content[];
  isLoading: boolean;
  topics: any[];
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showApprovalColumns?: boolean;
  showApproveColumn?: boolean;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

export const ContentTable: React.FC<ContentTableProps> = ({
  items,
  allItems,
  isLoading,
  topics,
  onApprove,
  onDelete,
  onView,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  showApprovalColumns = true,
  showApproveColumn = true,
  selectedPlatform,
  onPlatformChange
}) => {
  // Helper functions
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'dd/MM/yyyy') : '-';
  };

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

  const getPlatformIcon = (platform: string) => {
    return platformIcons[platform as keyof typeof platformIcons] || null;
  };

  // Get unique platforms for filter
  const getUniquePlatforms = () => {
    const platforms = new Set<string>();
    allItems.forEach(item => {
      if (item.platform) {
        platforms.add(item.platform);
      }
    });
    return Array.from(platforms);
  };

  const uniquePlatforms = getUniquePlatforms();

  const renderPagination = (dataLength: number) => {
    const pages = Math.ceil(dataLength / rowsPerPage);
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

  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-border bg-white">
      <div className="flex items-center p-5 justify-between bg-gradient-to-r from-gray-50 to-white border-b backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 w-full">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Số dòng/trang:</label>
            <select 
              className="px-3 py-1 border rounded-full text-sm bg-white shadow-sm hover:border-primary transition-colors"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Nền tảng:</label>
            <Select value={selectedPlatform} onValueChange={onPlatformChange}>
              <SelectTrigger className="w-[180px] rounded-full border shadow-sm hover:border-primary transition-colors">
                <SelectValue placeholder="Tất cả nền tảng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả nền tảng</SelectItem>
                {uniquePlatforms.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    <div className="flex items-center">
                      <span className="mr-2">{getPlatformIcon(platform)}</span>
                      <span className="capitalize">{platform}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <ScrollArea className="w-full overflow-auto">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="bg-gradient-to-r from-primary to-accent border-none">
                  <TableHead className="w-10 text-center text-white font-bold py-4">#</TableHead>
                  <TableHead className="w-[120%] text-white font-bold py-4">Chủ đề gốc</TableHead>
                  <TableHead className="w-16 text-center text-white font-bold py-4">Nền tảng</TableHead>
                  <TableHead className="max-w-[10%] text-white font-bold py-4">Nội dung (Preview)</TableHead>
                  <TableHead className="w-28 text-white font-bold py-4">Hình ảnh</TableHead>
                  <TableHead className="w-28 text-white font-bold py-4">Ngày tạo</TableHead>
                  {showApprovalColumns && (
                    <>
                      <TableHead className="w-28 text-white font-bold py-4">Người duyệt</TableHead>
                      <TableHead className="w-28 text-white font-bold py-4">Ngày duyệt</TableHead>
                    </>
                  )}
                  <TableHead className="w-28 text-white font-bold py-4">Trạng thái</TableHead>
                  <TableHead className="w-28 text-white font-bold py-4">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={showApprovalColumns ? 10 : 8} className="text-center py-8">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                        <span>Đang tải...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showApprovalColumns ? 10 : 8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50">
                          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <path d="M12 11h4" />
                          <path d="M12 16h4" />
                          <path d="M8 11h.01" />
                          <path d="M8 16h.01" />
                        </svg>
                        <p>Không có nội dung nào.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <TableRow key={item.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <TableCell className="font-medium text-center">{displayIndex}</TableCell>
                        <TableCell className="font-medium">{topic?.title || 'Không có chủ đề'}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {getPlatformIcon(item.platform)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="truncate max-w-xs" title={item.text}>
                            {item.text.substring(0, 40)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.imageUrl && (
                            <div className="h-12 w-12 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                              <img 
                                src={item.imageUrl} 
                                alt="Nội dung" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                        {showApprovalColumns && (
                          <>
                            <TableCell>AI Assistant</TableCell>
                            <TableCell>{formatDate(item.approvedAt)}</TableCell>
                          </>
                        )}
                        <TableCell>{getStatusDisplay(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 hover:text-primary rounded-full transition-colors">
                              <span className="sr-only">Chỉnh sửa</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                <path d="m15 5 4 4"/>
                              </svg>
                            </Button>
                            {item.status === 'draft' && showApproveColumn && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-green-500 hover:bg-green-50 rounded-full transition-colors"
                                onClick={() => onApprove(item)}
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
                              className="h-8 w-8 p-0 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                              onClick={() => onView(item)}
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
                              className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              onClick={() => onDelete(item.id)}
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
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex items-center justify-between p-5 border-t bg-gradient-to-r from-gray-50 to-white">
        <div className="text-sm text-muted-foreground">
          Trang {currentPage} - Hiển thị {items.length} / {allItems.length} nội dung
        </div>
        {renderPagination(allItems.length)}
      </div>
    </div>
  );
};
