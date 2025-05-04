
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { TablePagination } from '@/components/content/table/TablePagination';
import { TableFilters } from '@/components/content/table/TableFilters';
import { Topic } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { TopicMobileCard } from './table/TopicMobileCard';
import { TopicTableRow } from './table/TopicTableRow';
import { getProductIcon } from './table/TopicTableUtils';

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
  // Action handlers
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
  // Action handlers
  handleViewTopic,
  handleApproveTopic,
  handleEditTopic,
  handleRejectTopic
}: TopicsTableProps) {
  const isMobile = useIsMobile();
  
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
            paginatedTopics.map((topic, index) => (
              <TopicMobileCard
                key={topic.id}
                topic={topic}
                index={index}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                selectedTopics={selectedTopics}
                handleSelectTopic={handleSelectTopic}
                getTranslation={getTranslation}
                handleViewTopic={handleViewTopic}
                handleApproveTopic={handleApproveTopic}
                handleEditTopic={handleEditTopic}
                handleRejectTopic={handleRejectTopic}
              />
            ))
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
              {paginatedTopics.map((topic, index) => (
                <TopicTableRow
                  key={topic.id}
                  topic={topic}
                  index={index}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  selectedTopics={selectedTopics}
                  handleSelectTopic={handleSelectTopic}
                  handleViewTopic={handleViewTopic}
                  handleApproveTopic={handleApproveTopic}
                  handleEditTopic={handleEditTopic}
                  handleRejectTopic={handleRejectTopic}
                />
              ))}
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
