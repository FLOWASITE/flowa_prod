
import React, { useMemo } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Content, Topic } from '@/types';
import { format } from 'date-fns';
import { StatusBadge } from './table/StatusBadge';
import { PlatformIcon } from './table/PlatformIcon';
import { TableActions } from './table/TableActions';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableEmptyState } from './table/TableEmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface ContentAccordionViewProps {
  items: Content[];
  allItems: Content[];
  isLoading: boolean;
  topics: Topic[];
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  showApproveColumn?: boolean;
}

interface GroupedContent {
  [topicId: string]: Content[];
}

// Create a loading state component
const AccordionLoadingState = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="pl-8">
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

export const ContentAccordionView: React.FC<ContentAccordionViewProps> = ({
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
  selectedPlatform,
  onPlatformChange,
  showApproveColumn = true
}) => {
  // Format date helper
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'dd/MM/yyyy') : '-';
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

  // Helper function to get platform icon
  const getPlatformIcon = (platform: string) => {
    return <PlatformIcon platform={platform} />;
  };

  // Group content items by topic
  const groupedContent = useMemo(() => {
    const grouped: GroupedContent = {};
    
    items.forEach(content => {
      if (!grouped[content.topicId]) {
        grouped[content.topicId] = [];
      }
      grouped[content.topicId].push(content);
    });
    
    return grouped;
  }, [items]);

  // Get topic name by ID
  const getTopicName = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    return topic?.title || 'Không có chủ đề';
  };

  // Count number of items for each topic
  const getTopicItemsCount = (topicId: string) => {
    return groupedContent[topicId]?.length || 0;
  };

  return (
    <div className="rounded-xl shadow-lg overflow-hidden border border-gray-100 bg-white">
      <TableFilters
        rowsPerPage={rowsPerPage}
        selectedPlatform={selectedPlatform}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPlatformChange={onPlatformChange}
        uniquePlatforms={uniquePlatforms}
        getPlatformIcon={getPlatformIcon}
      />
      
      <div className="p-4 min-h-[400px]">
        {isLoading ? (
          <AccordionLoadingState />
        ) : Object.keys(groupedContent).length === 0 ? (
          <TableEmptyState colSpan={1} />
        ) : (
          <Accordion type="multiple" className="w-full">
            {Object.keys(groupedContent).map((topicId) => (
              <AccordionItem key={topicId} value={topicId} className="border-b border-gray-100">
                <AccordionTrigger className="hover:bg-gray-50 px-4 py-3 text-left">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-800">{getTopicName(topicId)}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                        {getTopicItemsCount(topicId)} nội dung
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                  <div className="space-y-4">
                    {groupedContent[topicId].map((content) => (
                      <div 
                        key={content.id} 
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors"
                      >
                        <div className="w-12 flex justify-center">
                          <PlatformIcon platform={content.platform} />
                        </div>
                        <div className="flex-grow">
                          <div className="truncate text-sm">
                            {content.text.length > 80 
                              ? `${content.text.substring(0, 80)}...` 
                              : content.text
                            }
                          </div>
                          <div className="flex gap-3 mt-1 text-xs text-gray-500">
                            <span>Tạo: {formatDate(content.createdAt)}</span>
                            {content.approvedAt && (
                              <span>Duyệt: {formatDate(content.approvedAt)}</span>
                            )}
                            <StatusBadge status={content.status} />
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {content.imageUrl && (
                            <div className="h-12 w-12 relative rounded-lg overflow-hidden shadow-sm">
                              <img 
                                src={content.imageUrl} 
                                alt="Nội dung" 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <TableActions 
                            item={content} 
                            onApprove={onApprove}
                            onView={onView}
                            onDelete={onDelete}
                            showApproveColumn={showApproveColumn}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
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
