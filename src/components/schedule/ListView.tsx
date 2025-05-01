
import React from 'react';
import { Content } from '@/types/content';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import { useTopicsFetch } from '@/hooks/useTopicsFetch';
import { ListViewHeader } from './list/ListViewHeader';
import { ListViewEmpty } from './list/ListViewEmpty';
import { ListViewDayGroup } from './list/ListViewDayGroup';
import { useListViewData } from '@/hooks/useListViewData';

interface ListViewProps {
  scheduledContent: Content[];
  weekStartDate: Date;
  weekEndDate: Date;
  getScheduledContent: (date: Date, timeSlot: string) => Content[];
  timeSlots: string[];
}

export const ListView: React.FC<ListViewProps> = ({ 
  weekStartDate,
  weekEndDate,
  getScheduledContent,
  timeSlots
}) => {
  const { topics } = useTopicsFetch(true);
  
  // Use our new hook to get the data
  const { 
    contentByDay, 
    getTopicTitle, 
    getTopicColor, 
    isEmpty 
  } = useListViewData({
    weekStartDate,
    weekEndDate,
    getScheduledContent,
    timeSlots,
    topics
  });

  return (
    <div className="rounded-md overflow-hidden border border-gray-200">
      <Table>
        <ListViewHeader />
        <TableBody>
          {Object.values(contentByDay).map(({ date, content: dayContent }) => (
            <ListViewDayGroup
              key={date.toISOString()}
              date={date}
              dayContent={dayContent}
              getTopicTitle={getTopicTitle}
              getTopicColor={getTopicColor}
            />
          ))}
          
          {isEmpty && <ListViewEmpty />}
        </TableBody>
      </Table>
    </div>
  );
};
