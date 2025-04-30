
import React, { useState } from 'react';
import { Content } from '@/types/content';
import { Button } from "@/components/ui/button";
import { SchedulePostDialog } from '../SchedulePostDialog';
import { useToast } from '@/hooks/use-toast';
import { CalendarHeader } from './CalendarHeader';
import { TimeSlotRow } from './TimeSlotRow';
import { getDayName, isToday, getTopicTitle } from './CalendarUtils';

interface CalendarViewProps {
  weekDates: Date[];
  timeSlots: string[];
  getScheduledContent: (date: Date, timeSlot: string) => Content[];
  topics: any[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  weekDates,
  timeSlots,
  getScheduledContent,
  topics
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [editingPost, setEditingPost] = useState<Content | undefined>();
  const { toast } = useToast();

  const handleOpenNewPostDialog = (date: Date, timeSlot: string) => {
    setSelectedDate(date);
    setSelectedTime(timeSlot);
    setEditingPost(undefined);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (post: Content) => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setEditingPost(post);
    setDialogOpen(true);
  };

  const handleSavePost = (post: Partial<Content>) => {
    // In a real app, this would save to the database
    // For now, we'll just show a toast notification
    toast({
      title: editingPost ? "Bài viết đã được cập nhật" : "Bài viết đã được tạo",
      description: `${post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : ''} - ${post.text?.substring(0, 30)}...`,
    });
    setDialogOpen(false);
  };

  // Function to get topic title that works with the topics array
  const getTopicTitleWithTopics = (content: Content) => {
    return getTopicTitle(content, topics);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[800px] border border-gray-200 rounded-md">
          {/* Calendar header with days */}
          <CalendarHeader 
            weekDates={weekDates}
            getDayName={getDayName}
            isToday={isToday}
          />
          
          {/* Time slots and content */}
          {timeSlots.map((timeSlot, slotIndex) => (
            <TimeSlotRow
              key={slotIndex}
              timeSlot={timeSlot}
              weekDates={weekDates}
              getScheduledContent={getScheduledContent}
              handleOpenNewPostDialog={handleOpenNewPostDialog}
              handleOpenEditDialog={handleOpenEditDialog}
              getTopicTitle={getTopicTitleWithTopics}
              isToday={isToday}
              slotIndex={slotIndex}
            />
          ))}
        </div>
      </div>

      {/* Post Dialog */}
      <SchedulePostDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSavePost}
        initialData={editingPost}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </>
  );
};
