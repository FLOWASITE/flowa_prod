
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
import { groupContentByDay, getTopicTitle, getTopicColor, topicColorMap } from './list/ListViewUtils';

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
  
  // Generate the content data for the week using the same data source as CalendarView
  const allContent: Content[] = [];
  
  // Loop through each day of the week
  let currentDate = new Date(weekStartDate);
  while (currentDate <= weekEndDate) {
    // Loop through each time slot
    timeSlots.forEach(timeSlot => {
      const contentForSlot = getScheduledContent(new Date(currentDate), timeSlot);
      if (contentForSlot.length > 0) {
        allContent.push(...contentForSlot);
      }
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Group content by day using our utility function
  const contentByDay = groupContentByDay(allContent);

  // Create helper functions for topic title and color
  const getTopicTitleForContent = (content: Content): string => {
    return getTopicTitle(content, topics);
  };

  const getTopicColorForContent = (content: Content): string => {
    return getTopicColor(content, topics, topicColorMap);
  };

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
              getTopicTitle={getTopicTitleForContent}
              getTopicColor={getTopicColorForContent}
            />
          ))}
          
          {Object.keys(contentByDay).length === 0 && <ListViewEmpty />}
        </TableBody>
      </Table>
    </div>
  );
};
