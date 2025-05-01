
import { useState, useEffect } from 'react';
import { Content } from '@/types/content';
import { Topic } from '@/types';
import { format } from 'date-fns';
import { groupContentByDay, getTopicTitle, getTopicColor, topicColorMap } from '@/components/schedule/list/ListViewUtils';

interface UseListViewDataProps {
  weekStartDate: Date;
  weekEndDate: Date;
  getScheduledContent: (date: Date, timeSlot: string) => Content[];
  timeSlots: string[];
  topics: Topic[];
}

interface ListViewDataItem {
  date: Date;
  content: Content[];
}

export const useListViewData = ({
  weekStartDate,
  weekEndDate,
  getScheduledContent,
  timeSlots,
  topics
}: UseListViewDataProps) => {
  const [contentByDay, setContentByDay] = useState<Record<string, ListViewDataItem>>({});
  
  // Generate the content data for the week
  useEffect(() => {
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
    setContentByDay(groupContentByDay(allContent));
  }, [weekStartDate, weekEndDate, getScheduledContent, timeSlots]);

  // Create helper functions for topic title and color
  const getTopicTitleForContent = (content: Content): string => {
    return getTopicTitle(content, topics);
  };

  const getTopicColorForContent = (content: Content): string => {
    return getTopicColor(content, topics, topicColorMap);
  };

  return {
    contentByDay,
    getTopicTitle: getTopicTitleForContent,
    getTopicColor: getTopicColorForContent,
    isEmpty: Object.keys(contentByDay).length === 0
  };
};
