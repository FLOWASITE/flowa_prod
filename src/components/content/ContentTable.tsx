
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Content } from '@/types';
import { format } from 'date-fns';
import { platformIcons } from '../chat/PlatformIcons';

// Import our new components
import { StatusBadge } from './table/StatusBadge';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableActions } from './table/TableActions';
import { TableEmptyState } from './table/TableEmptyState';
import { TableLoadingState } from './table/TableLoadingState';
import { PlatformIcon } from './table/PlatformIcon';

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
  const columnsCount = showApprovalColumns ? 10 : 8;

  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-border bg-white">
      <TableFilters
        rowsPerPage={rowsPerPage}
        selectedPlatform={selectedPlatform}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPlatformChange={onPlatformChange}
        uniquePlatforms={uniquePlatforms}
        getPlatformIcon={getPlatformIcon}
      />
      
      <div className="relative">
        <div className="w-full overflow-auto custom-scrollbar">
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
                  <TableLoadingState colSpan={columnsCount} />
                ) : items.length === 0 ? (
                  <TableEmptyState colSpan={columnsCount} />
                ) : (
                  items.map((item, index) => {
                    const topic = topics.find(t => t.id === item.topicId);
                    const displayIndex = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <TableRow key={item.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <TableCell className="font-medium text-center">{displayIndex}</TableCell>
                        <TableCell className="font-medium">{topic?.title || 'Không có chủ đề'}</TableCell>
                        <TableCell className="text-center">
                          <PlatformIcon platform={item.platform} />
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
                        <TableCell>
                          <StatusBadge status={item.status} />
                        </TableCell>
                        <TableCell>
                          <TableActions
                            item={item}
                            onApprove={onApprove}
                            onView={onView}
                            onDelete={onDelete}
                            showApproveColumn={showApproveColumn}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-5 border-t bg-gradient-to-r from-gray-50 to-white">
        <div className="text-sm text-muted-foreground">
          Trang {currentPage} - Hiển thị {items.length} / {allItems.length} nội dung
        </div>
        <TablePagination
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalItems={allItems.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
