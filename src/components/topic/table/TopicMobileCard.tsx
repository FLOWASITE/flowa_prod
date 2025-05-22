
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Topic } from '@/types';
import { formatDateSafely } from '@/lib/utils';
import { TopicStatusBadge } from '../TopicStatusBadge';
import { TopicActions } from './TopicActions';
import { TopicProductBadge } from './TopicProductBadge';

interface TopicMobileCardProps {
  topic: Topic;
  index: number;
  currentPage: number;
  rowsPerPage: number;
  selectedTopics: string[];
  handleSelectTopic: (topicId: string) => void;
  getTranslation: (key: string) => string;
  handleViewTopic?: (topic: Topic) => void;
  handleApproveTopic?: (topic: Topic) => void;
  handleEditTopic?: (topic: Topic) => void;
  handleRejectTopic?: (topic: Topic) => void;
}

export const TopicMobileCard: React.FC<TopicMobileCardProps> = ({
  topic,
  index,
  currentPage,
  rowsPerPage,
  selectedTopics,
  handleSelectTopic,
  getTranslation,
  handleViewTopic,
  handleApproveTopic,
  handleEditTopic,
  handleRejectTopic
}) => {
  const rowIndex = (currentPage - 1) * rowsPerPage + index + 1;
  
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4 border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={selectedTopics.includes(topic.id)}
            onCheckedChange={() => handleSelectTopic(topic.id)}
          />
          <span className="text-sm text-gray-500">#{rowIndex}</span>
        </div>
        <TopicStatusBadge status={topic.status} />
      </div>
      
      <h3 className="font-medium text-lg mb-2">{topic.title}</h3>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-gray-500">Product</p>
          <div className="mt-1">
            <TopicProductBadge productTypeId={topic.productTypeId} getTranslation={getTranslation} />
          </div>
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
        <p className="text-sm">{formatDateSafely(topic.createdAt)}</p>
      </div>
      
      <div className="flex justify-end gap-2 border-t pt-3">
        <TopicActions 
          topic={topic} 
          isMobile={true} 
          handleViewTopic={handleViewTopic} 
          handleApproveTopic={handleApproveTopic} 
          handleEditTopic={handleEditTopic} 
          handleRejectTopic={handleRejectTopic} 
        />
      </div>
    </div>
  );
};
