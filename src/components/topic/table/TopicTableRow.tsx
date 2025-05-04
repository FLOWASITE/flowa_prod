
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { TableRow, TableCell } from '@/components/ui/table';
import { Topic } from '@/types';
import { TopicStatusBadge } from '../TopicStatusBadge';
import { TopicActions } from './TopicActions';
import { TopicProductBadge } from './TopicProductBadge';

interface TopicTableRowProps {
  topic: Topic;
  index: number;
  currentPage: number;
  rowsPerPage: number;
  selectedTopics: string[];
  handleSelectTopic: (topicId: string) => void;
  handleViewTopic?: (topic: Topic) => void;
  handleApproveTopic?: (topic: Topic) => void;
  handleEditTopic?: (topic: Topic) => void;
  handleRejectTopic?: (topic: Topic) => void;
}

export const TopicTableRow: React.FC<TopicTableRowProps> = ({
  topic,
  index,
  currentPage,
  rowsPerPage,
  selectedTopics,
  handleSelectTopic,
  handleViewTopic,
  handleApproveTopic,
  handleEditTopic,
  handleRejectTopic
}) => {
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
        <TopicProductBadge productTypeId={topic.productTypeId} />
      </TableCell>
      <TableCell>
        <Badge variant="secondary">
          {topic.themeTypeId || 'General'}
        </Badge>
      </TableCell>
      <TableCell>{format(topic.createdAt, 'dd/MM/yyyy')}</TableCell>
      <TableCell>
        <TopicStatusBadge status={topic.status} />
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-1">
          <TopicActions 
            topic={topic} 
            isMobile={false} 
            handleViewTopic={handleViewTopic} 
            handleApproveTopic={handleApproveTopic} 
            handleEditTopic={handleEditTopic} 
            handleRejectTopic={handleRejectTopic} 
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
