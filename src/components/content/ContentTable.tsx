
import React from 'react';
import { Content, Topic } from '@/types';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PlatformIcon } from './PlatformIcon';

interface ContentTableProps {
  contents: Content[];
  topics: Topic[];
  isLoading: boolean;
  currentPage: number;
  rowsPerPage: number;
  selectedContentIds: string[];
  toggleSelectAll: (checked: boolean, contentList: Content[]) => void;
  toggleSelectItem: (checked: boolean, contentId: string) => void;
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  customColumns?: React.ReactNode;
  emptyMessage?: string;
}

export const ContentTable: React.FC<ContentTableProps> = ({
  contents,
  topics,
  isLoading,
  currentPage,
  rowsPerPage,
  selectedContentIds,
  toggleSelectAll,
  toggleSelectItem,
  onApprove,
  onDelete,
  onView,
  customColumns,
  emptyMessage = 'Không có nội dung nào.'
}) => {
  const isAllSelected = contents.length > 0 && 
    contents.every(item => selectedContentIds.includes(item.id));
  
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
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox 
              checked={isAllSelected}
              onCheckedChange={(checked) => 
                toggleSelectAll(checked === true, contents)
              }
              aria-label="Chọn tất cả"
            />
          </TableHead>
          <TableHead className="w-[75%]">Chủ đề gốc</TableHead>
          <TableHead className="w-16">Nền tảng</TableHead>
          <TableHead className="w-32">Nội dung (Preview)</TableHead>
          <TableHead className="w-24">Hình ảnh</TableHead>
          <TableHead className="w-24">Ngày tạo</TableHead>
          {customColumns}
          <TableHead className="w-24">Trạng thái</TableHead>
          <TableHead className="w-20">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={customColumns ? 10 : 8} className="text-center py-4">
              <div className="flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                Đang tải...
              </div>
            </TableCell>
          </TableRow>
        ) : contents.length === 0 ? (
          <TableRow>
            <TableCell colSpan={customColumns ? 10 : 8} className="text-center py-4">{emptyMessage}</TableCell>
          </TableRow>
        ) : (
          contents.map((item, index) => {
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
                {item.status !== 'draft' && (
                  <>
                    <TableCell>AI Assistant</TableCell>
                    <TableCell>{formatDate(item.approvedAt)}</TableCell>
                  </>
                )}
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
                      className="h-8 w-8 p-0 text-blue-500"
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
                      className="h-8 w-8 p-0 text-red-500"
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
  );
};
