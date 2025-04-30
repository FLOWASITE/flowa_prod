import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Content } from '@/types/content';
import { ScheduledPost } from './ScheduledPost';
import { SchedulePostDialog } from './SchedulePostDialog';
import { useToast } from '@/hooks/use-toast';

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
      description: `${format(post.scheduledAt!, 'HH:mm dd/MM/yyyy')} - ${post.text?.substring(0, 30)}...`,
    });
    setDialogOpen(false);
  };

  // Get topic title by topic ID or use the directly attached topic title
  const getTopicTitle = (content: Content) => {
    // First check if the content has a topicTitle field directly
    if (content.topicTitle) {
      return content.topicTitle;
    }
    
    // Otherwise try to find the topic in the topics list
    console.log("Looking for topic with ID:", content.topicId);
    console.log("Available topics:", topics);
    
    const topic = topics.find(t => t.id === content.topicId);
    if (topic) {
      console.log("Found topic:", topic.title);
      return topic.title;
    } else {
      console.log("Topic not found for ID:", content.topicId);
      return "Không có chủ đề";
    }
  };

  // Get day names in Vietnamese
  const getDayName = (date: Date) => {
    const dayMap: Record<number, string> = {
      0: "Chủ Nhật",
      1: "Thứ Hai",
      2: "Thứ Ba", 
      3: "Thứ Tư",
      4: "Thứ Năm",
      5: "Thứ Sáu",
      6: "Thứ Bảy"
    };
    return dayMap[date.getDay()];
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[800px] border border-gray-200 rounded-md">
          {/* Calendar header with days */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)]">
            <div className="p-2 border-b border-r"></div>
            {weekDates.map((date, index) => {
              const isCurrentDay = isToday(date);
              return (
                <div 
                  key={index} 
                  className={`p-3 text-center border-b ${
                    isCurrentDay ? 'bg-rose-50' : 'bg-white'
                  } ${index < 6 ? 'border-r' : ''}`}
                >
                  <div className="text-sm text-gray-500">{getDayName(date)}</div>
                  <div className="font-medium">{format(date, 'd')}</div>
                </div>
              );
            })}
          </div>
          
          {/* Time slots and content */}
          {timeSlots.map((timeSlot, slotIndex) => (
            <div key={slotIndex} className="grid grid-cols-[60px_repeat(7,1fr)] border-b last:border-b-0">
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
                    {contentForSlot.length > 0 ? (
                      contentForSlot.map((content, contentIndex) => (
                        <ScheduledPost 
                          key={contentIndex} 
                          content={content} 
                          onEdit={() => handleOpenEditDialog(content)}
                          topicTitle={getTopicTitle(content)}
                        />
                      ))
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity"
                        onClick={() => handleOpenNewPostDialog(date, timeSlot)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm bài viết
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
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
