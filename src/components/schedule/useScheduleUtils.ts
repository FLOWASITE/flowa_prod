
import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { Content } from '@/types/content';

export const useScheduleUtils = (scheduledContent: Content[]) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  
  // Create an array of dates for the current week
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
  
  // Time slots from 9:00 to 18:00
  const timeSlots = [
    "09:00", 
    "10:00", 
    "11:00", 
    "12:00", 
    "13:00", 
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
  ];
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newStartDate = addDays(weekStartDate, -7);
    setWeekStartDate(newStartDate);
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    const newStartDate = addDays(weekStartDate, 7);
    setWeekStartDate(newStartDate);
  };
  
  // Get scheduled content for a specific date and time slot
  const getScheduledContent = (date: Date, timeSlot: string): Content[] => {
    // Parse the time from the timeSlot string
    const [hours] = timeSlot.split(':').map(Number);

    // Tạo dữ liệu mẫu theo ngày
    const day = date.getDay();
    
    // Nếu là ngày hôm nay và giờ hiện tại (để hiển thị một số dữ liệu mẫu)
    if (isSameDay(date, new Date()) && hours >= 9 && hours <= 11) {
      // Tạo mẫu dữ liệu cho ngày hiện tại
      return [{
        id: `sample-${date}-${timeSlot}-1`,
        topicId: "topic-1",
        platform: hours % 2 === 0 ? 'facebook' : 'instagram',
        text: `Bài đăng mẫu cho ${timeSlot} ngày ${format(date, 'dd/MM')}`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(hours, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
    }
    
    // Tạo mẫu dữ liệu cho thứ 3 và thứ 5
    if ((day === 2 || day === 4) && (hours === 13 || hours === 15)) {
      const platform = day === 2 ? 'facebook' : 'linkedin';
      return [{
        id: `sample-${date}-${timeSlot}-2`,
        topicId: "topic-2",
        platform,
        text: `Nội dung ${platform} lúc ${timeSlot} ngày ${format(date, 'dd/MM')}`,
        imageUrl: platform === 'linkedin' ? 'image.jpg' : undefined,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(hours, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
    }
    
    // Kết hợp dữ liệu mẫu với dữ liệu thực từ cơ sở dữ liệu
    const realContent = scheduledContent.filter(content => {
      if (!content.scheduledAt) return false;
      const scheduledDate = new Date(content.scheduledAt);
      return (
        isSameDay(scheduledDate, date) && 
        scheduledDate.getHours() === hours
      );
    });
    
    return realContent;
  };
  
  // Format date range for header (e.g., "thg 4 28 - thg 5 4, 2025")
  const formatDateRange = () => {
    const endDate = addDays(weekStartDate, 6);
    
    // Format in Vietnamese style
    const startDay = format(weekStartDate, 'd');
    const startMonth = `thg ${format(weekStartDate, 'M')}`;
    
    const endDay = format(endDate, 'd');
    const endMonth = `thg ${format(endDate, 'M')}`;
    
    const year = format(endDate, 'yyyy');
    
    if (format(weekStartDate, 'M') === format(endDate, 'M')) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  return {
    weekStartDate,
    weekDates,
    timeSlots,
    goToPreviousWeek,
    goToNextWeek,
    getScheduledContent,
    formatDateRange
  };
};
