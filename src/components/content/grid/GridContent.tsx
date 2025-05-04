
import React from 'react';
import { Content, Topic } from '@/types';
import { GridItem } from './GridItem';
import { GridLoadingState } from './GridLoadingState';
import { TableEmptyState } from '../table/TableEmptyState';

interface GridContentProps {
  items: Content[];
  topics: Topic[];
  isLoading: boolean;
  onApprove: (content: Content) => void;
  onDelete: (contentId: string) => void;
  onView: (content: Content) => void;
  selectedItems: string[];
  onToggleSelection?: (contentId: string) => void;
  showBatchSelection: boolean;
  showApproveActions: boolean;
}

export const GridContent: React.FC<GridContentProps> = ({
  items,
  topics,
  isLoading,
  onApprove,
  onDelete,
  onView,
  selectedItems,
  onToggleSelection,
  showBatchSelection,
  showApproveActions
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <GridLoadingState />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <TableEmptyState colSpan={1} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        const topic = topics.find(t => t.id === item.topicId);
        return (
          <GridItem
            key={item.id}
            item={item}
            topic={topic}
            onApprove={showApproveActions && item.status === 'draft' ? () => onApprove(item) : undefined}
            onDelete={() => onDelete(item.id)}
            onView={() => onView(item)}
            showBatchSelection={showBatchSelection}
            isSelected={selectedItems.includes(item.id)}
            onToggleSelection={onToggleSelection ? () => onToggleSelection(item.id) : undefined}
          />
        );
      })}
    </div>
  );
};
