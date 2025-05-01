
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Content } from '@/types/content';
import { TableRow } from '@/components/ui/table';
import { ListViewContentRow } from './ListViewContentRow';

interface ListViewDayGroupProps {
  date: Date;
  dayContent: Content[];
  getTopicTitle: (content: Content) => string;
  getTopicColor: (content: Content) => string;
}

export const ListViewDayGroup: React.FC<ListViewDayGroupProps> = ({
  date,
  dayContent,
  getTopicTitle,
  getTopicColor
}) => {
  // Helper function to get day of month and day name from date
  const formatDayInfo = (date: Date) => {
    const day = date.getDate();
    const dayName = format(date, 'EEE').toUpperCase();
    return { day, dayName };
  };

  const { day, dayName } = formatDayInfo(date);
  const monthName = format(date, 'MMM').toUpperCase();

  return (
    <>
      {dayContent.map((content, contentIdx) => {
        const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
        const topicTitle = getTopicTitle(content);
        const topicColor = getTopicColor(content);
        
        // Check if this is the first item of its time slot
        const isFirstOfTime = contentIdx === 0 || 
          time !== format(new Date(dayContent[contentIdx - 1].scheduledAt!), 'HH:mm');
        
        // Check if this is the first item of the day
        const isFirstOfDay = contentIdx === 0 || 
          !isSameDay(new Date(content.scheduledAt!), new Date(dayContent[contentIdx - 1].scheduledAt!));
        
        // Check if content has image or video
        const hasImage = content.imageUrl ? true : false;
        const hasVideo = content.text?.includes('video') || false; // Simple example, adjust based on your actual data
        
        return (
          <ListViewContentRow
            key={content.id}
            content={content}
            time={time}
            isFirstOfDay={isFirstOfDay}
            isFirstOfTime={isFirstOfTime}
            day={day}
            monthName={monthName}
            dayName={dayName}
            topicTitle={topicTitle}
            topicColor={topicColor}
            hasImage={hasImage}
            hasVideo={hasVideo}
          />
        );
      })}
    </>
  );
};
