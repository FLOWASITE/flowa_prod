
import React, { useMemo } from 'react';
import { Accordion } from "@/components/ui/accordion";
import { Content, Topic } from '@/types';
import { format } from 'date-fns';
import { TableFilters } from './table/TableFilters';
import { TablePagination } from './table/TablePagination';
import { TableEmptyState } from './table/TableEmptyState';
import { AccordionLoadingState } from './accordion/AccordionLoadingState';
import { AccordionGroup } from './accordion/AccordionGroup';

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
    return platform;
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
              <AccordionGroup
                key={topicId}
                topicId={topicId}
                contents={groupedContent[topicId]}
                topics={topics}
                onApprove={onApprove}
                onView={onView}
                onDelete={onDelete}
                showApproveColumn={showApproveColumn}
                formatDate={formatDate}
              />
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
