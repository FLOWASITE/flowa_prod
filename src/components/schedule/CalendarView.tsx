
import React, { useState } from 'react';
import { format, isSameDay, addDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Content } from '@/types/content';
import { ScheduledPost } from './ScheduledPost';
import { SchedulePostDialog } from './SchedulePostDialog';
import { useToast } from '@/hooks/use-toast';

interface CalendarViewProps {
  weekDates: Date[];
  timeSlots: string[];
  getScheduledContent: (date: Date, timeSlot: string) => Content[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  weekDates,
  timeSlots,
  getScheduledContent
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
      description: `${format(post.scheduledAt!, 'HH:mm dd/MM/yyyy', { locale: vi })} - ${post.text?.substring(0, 30)}...`,
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Calendar header with days */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
            <div className="p-2"></div>
            {weekDates.map((date, index) => (
              <div 
                key={index} 
                className={`p-3 text-center border-l ${isSameDay(date, new Date()) ? 'bg-primary/5' : ''}`}
              >
                <div className="text-sm text-gray-500">{format(date, 'EEEE', { locale: vi })}</div>
                <div className="font-medium">{format(date, 'd', { locale: vi })}</div>
              </div>
            ))}
          </div>
          
          {/* Time slots and content */}
          {timeSlots.map((timeSlot, slotIndex) => (
            <div key={slotIndex} className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
              {/* Time indicator */}
              <div className="p-2 text-sm text-gray-500 text-right pr-3 pt-3 border-r">
                {timeSlot}
              </div>
              
              {/* Days content */}
              {weekDates.map((date, dateIndex) => {
                const contentForSlot = getScheduledContent(date, timeSlot);
                return (
                  <div 
                    key={`${slotIndex}-${dateIndex}`} 
                    className={`p-2 min-h-[100px] border-l relative ${
                      isSameDay(date, new Date()) ? 'bg-primary/5' : ''
                    }`}
                  >
                    {contentForSlot.length > 0 ? (
                      contentForSlot.map((content, contentIndex) => 
                        <ScheduledPost 
                          key={contentIndex} 
                          content={content} 
                          onEdit={() => handleOpenEditDialog(content)}
                        />
                      )
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
