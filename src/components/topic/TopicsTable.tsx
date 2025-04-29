
import React from 'react';
import { format } from 'date-fns';
import { Check, Eye, Pencil, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { TablePagination } from '@/components/content/table/TablePagination';
import { TableFilters } from '@/components/content/table/TableFilters';
import { Topic } from '@/types';
import { mockProductTypes } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

interface TopicsTableProps {
  topics: Topic[];
  filteredTopics: Topic[];
  paginatedTopics: Topic[];
  selectedTopics: string[];
  currentPage: number;
  rowsPerPage: number;
  selectedPlatform: string;
  uniqueProductIds: string[];
  handleSelectTopic: (topicId: string) => void;
  handleSelectAll: () => void;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedPlatform: (platform: string) => void;
  getTranslation: (key: string) => string;
  // New action handlers
  handleViewTopic?: (topic: Topic) => void;
  handleApproveTopic?: (topic: Topic) => void;
  handleEditTopic?: (topic: Topic) => void;
  handleRejectTopic?: (topic: Topic) => void;
}

export function TopicsTable({
  topics,
  filteredTopics,
  paginatedTopics,
  selectedTopics,
  currentPage,
  rowsPerPage,
  selectedPlatform,
  uniqueProductIds,
  handleSelectTopic,
  handleSelectAll,
  handlePageChange,
  handleRowsPerPageChange,
  setSelectedPlatform,
  getTranslation,
  // New action handlers
  handleViewTopic,
  handleApproveTopic,
  handleEditTopic,
  handleRejectTopic
}: TopicsTableProps) {
  const isMobile = useIsMobile();
  
  // Function to get product name from product ID
  const getProductNameById = (productId: string | undefined) => {
    if (!productId) return null;
    
    const product = mockProductTypes.find(product => product.id === productId);
    return product ? product.name : productId;
  };

  // Product badge function to show the product name
  const productBadge = (productTypeId: string | undefined) => {
    const productName = getProductNameById(productTypeId);
    
    if (!productName) {
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
          {getTranslation('noProduct') || 'Không có'}
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
        {productName}
      </Badge>
    );
  };

  // Status badge for visualizing topic status
  const statusBadge = (status: string) => {
    const statusClasses = {
      draft: "bg-gray-100 text-gray-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      generating: "bg-blue-100 text-blue-800",
      completed: "bg-purple-100 text-purple-800",
    };
    
    return (
      <Badge variant="outline" className={statusClasses[status]}>
        {status}
      </Badge>
    );
  };

  // Get product icon (placeholder function)
  const getProductIcon = (productId: string) => {
    return null; // In a real app, you'd return an icon component here
  };
  
  // Mobile card view for topics
  const renderMobileTopicCard = (topic: Topic, index: number) => {
    const rowIndex = (currentPage - 1) * rowsPerPage + index + 1;
    
    return (
      <div key={topic.id} className="p-4 bg-white rounded-lg shadow mb-4 border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedTopics.includes(topic.id)}
              onCheckedChange={() => handleSelectTopic(topic.id)}
            />
            <span className="text-sm text-gray-500">#{rowIndex}</span>
          </div>
          {statusBadge(topic.status)}
        </div>
        
        <h3 className="font-medium text-lg mb-2">{topic.title}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-xs text-gray-500">Product</p>
            <div className="mt-1">{productBadge(topic.productTypeId)}</div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Category</p>
            <Badge variant="secondary" className="mt-1">
              {topic.themeTypeId || 'General'}
            </Badge>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500">Created</p>
          <p className="text-sm">{format(topic.createdAt, 'dd/MM/yyyy')}</p>
        </div>
        
        <div className="flex justify-end gap-2 border-t pt-3">
          {/* View Button */}
          {handleViewTopic && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-full"
              onClick={() => handleViewTopic(topic)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Xem
            </Button>
          )}
          
          {/* Approve Button - only show for draft topics */}
          {topic.status === 'draft' && handleApproveTopic && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-green-500 hover:bg-green-50 hover:text-green-700 rounded-full"
              onClick={() => handleApproveTopic(topic)}
            >
              <Check className="h-4 w-4 mr-1" />
              Duyệt
            </Button>
          )}
          
          {/* Edit Button */}
          {handleEditTopic && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-amber-500 hover:bg-amber-50 hover:text-amber-700 rounded-full"
              onClick={() => handleEditTopic(topic)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Sửa
            </Button>
          )}
          
          {/* Reject Button - only show for draft topics */}
          {topic.status === 'draft' && handleRejectTopic && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full"
              onClick={() => handleRejectTopic(topic)}
            >
              <X className="h-4 w-4 mr-1" />
              Từ chối
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg border bg-card">
      {/* Table Filters */}
      <TableFilters
        rowsPerPage={rowsPerPage}
        selectedPlatform={selectedPlatform}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPlatformChange={setSelectedPlatform}
        uniquePlatforms={uniqueProductIds}
        getPlatformIcon={getProductIcon}
      />
      
      {/* Mobile View */}
      {isMobile ? (
        <div className="p-3">
          {paginatedTopics.length > 0 ? (
            paginatedTopics.map((topic, index) => renderMobileTopicCard(topic, index))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No topics found
            </div>
          )}
        </div>
      ) : (
        /* Desktop Table View */
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedTopics.length === paginatedTopics.length && paginatedTopics.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Chủ đề</TableHead>
                <TableHead>{getTranslation('product')}</TableHead>
                <TableHead>Phân loại</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTopics.map((topic, index) => {
                const rowIndex = (currentPage - 1) * rowsPerPage + index + 1;
                return (
                  <TableRow key={topic.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedTopics.includes(topic.id)}
                        onCheckedChange={() => handleSelectTopic(topic.id)}
                      />
                    </TableCell>
                    <TableCell>{rowIndex}</TableCell>
                    <TableCell>
                      <div className="font-medium">{topic.title}</div>
                    </TableCell>
                    <TableCell>
                      {productBadge(topic.productTypeId)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {topic.themeTypeId || 'General'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(topic.createdAt, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{statusBadge(topic.status)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        {/* View Button */}
                        {handleViewTopic && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 p-1 text-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-full"
                            onClick={() => handleViewTopic(topic)}
                            title="Xem"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Approve Button - only show for draft topics */}
                        {topic.status === 'draft' && handleApproveTopic && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 p-1 text-green-500 hover:bg-green-50 hover:text-green-700 rounded-full"
                            onClick={() => handleApproveTopic(topic)}
                            title="Duyệt"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Edit Button */}
                        {handleEditTopic && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 p-1 text-amber-500 hover:bg-amber-50 hover:text-amber-700 rounded-full"
                            onClick={() => handleEditTopic(topic)}
                            title="Sửa"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {/* Reject Button - only show for draft topics */}
                        {topic.status === 'draft' && handleRejectTopic && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 p-1 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full"
                            onClick={() => handleRejectTopic(topic)}
                            title="Từ chối"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Pagination */}
      <div className="p-4 border-t">
        <TablePagination 
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalItems={filteredTopics.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
