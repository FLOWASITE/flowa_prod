
import React from 'react';
import { Content, Topic } from '@/types';
import { ContentCard } from '../ContentCard';
import { Checkbox } from '@/components/ui/checkbox';

interface GridItemProps {
  item: Content;
  topic?: Topic;
  onApprove?: () => void;
  onDelete: () => void;
  onView: () => void;
  showBatchSelection: boolean;
  isSelected: boolean;
  onToggleSelection?: () => void;
}

export const GridItem: React.FC<GridItemProps> = ({
  item,
  topic,
  onApprove,
  onDelete,
  onView,
  showBatchSelection,
  isSelected,
  onToggleSelection
}) => {
  return (
    <div className="relative">
      {showBatchSelection && (
        <div className="absolute top-2 left-2 z-10">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={onToggleSelection}
            disabled={item.status !== 'draft'}
            className="bg-white border-gray-300 rounded-full"
          />
        </div>
      )}
      <ContentCard
        content={item}
        topic={topic}
        onApprove={onApprove}
        onDelete={onDelete}
        onView={onView}
      />
    </div>
  );
};
