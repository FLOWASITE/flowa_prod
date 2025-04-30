
import React from 'react';
import { Content } from '@/types/content';
import { SlotContent } from './SlotContent';

interface TimeSlotRowProps {
  timeSlot: string;
  weekDates: Date[];
  getScheduledContent: (date: Date, timeSlot: string) => Content[];
  handleOpenNewPostDialog: (date: Date, timeSlot: string) => void;
  handleOpenEditDialog: (post: Content) => void;
  getTopicTitle: (content: Content) => string;
  isToday: (date: Date) => boolean;
  slotIndex: number;
}

export const TimeSlotRow: React.FC<TimeSlotRowProps> = ({
  timeSlot,
  weekDates,
  getScheduledContent,
  handleOpenNewPostDialog,
  handleOpenEditDialog,
  getTopicTitle,
  isToday,
  slotIndex
}) => {
  return (
    <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b last:border-b-0">
      {/* Time indicator */}
      <div className="p-2 text-sm text-gray-500 text-right pr-3 pt-3 border-r">
        {timeSlot}
      </div>
      
      {/* Days content */}
      {weekDates.map((date, dateIndex) => {
        const contentForSlot = getScheduledContent(date, timeSlot);
        const isCurrentDay = isToday(date);
        
        return (
          <div 
            key={`${slotIndex}-${dateIndex}`} 
            className={`p-2 min-h-[100px] relative ${
              isCurrentDay ? 'bg-rose-50' : 'bg-white'
            } ${dateIndex < 6 ? 'border-r' : ''}`}
          >
            <SlotContent
              contentForSlot={contentForSlot}
              date={date}
              timeSlot={timeSlot}
              handleOpenNewPostDialog={handleOpenNewPostDialog}
              handleOpenEditDialog={handleOpenEditDialog}
              getTopicTitle={getTopicTitle}
            />
          </div>
        );
      })}
    </div>
  );
};
