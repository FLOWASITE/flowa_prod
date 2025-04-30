
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
    
    // Current date parts for comparison
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    
    // Today's date - for highlighting current day posts
    const isToday = date.getDate() === currentDay && date.getMonth() === currentMonth;
    
    // Create sample topic titles that will be displayed directly
    // instead of relying on topic IDs that need to be looked up
    const sampleTopics = [
      "Khuyến mãi mùa hè",
      "Sản phẩm mới ra mắt",
      "Mẹo sử dụng sản phẩm",
      "Thông tin về thương hiệu",
      "Chiến dịch truyền thông"
    ];
    
    // Thursday posts (Thứ Tư - 30/04)
    if (date.getDate() === 30 && date.getMonth() === 3) {
      if (timeSlot === '09:00') {
        return [{
          id: `sample-09-${date}`,
          topicId: "sample-topic-1", // Sample topic ID
          topicTitle: sampleTopics[0], // Add topic title directly to the content
          platform: 'instagram',
          text: `Bài đăng mẫu cho 09:00 ngày 30/04`,
          status: 'scheduled',
          scheduledAt: new Date(date.setHours(9, 0, 0, 0)),
          createdAt: new Date(),
          updatedAt: new Date(),
        }];
      }
      
      if (timeSlot === '10:00') {
        return [{
          id: `sample-10-${date}`,
          topicId: "sample-topic-2",
          topicTitle: sampleTopics[1],
          platform: 'facebook',
          text: `Bài đăng mẫu cho 10:00 ngày 30/04`,
          status: 'scheduled',
          scheduledAt: new Date(date.setHours(10, 0, 0, 0)),
          createdAt: new Date(),
          updatedAt: new Date(),
        }];
      }
      
      if (timeSlot === '11:00') {
        return [{
          id: `sample-11-${date}`,
          topicId: "sample-topic-3",
          topicTitle: sampleTopics[2],
          platform: 'instagram',
          text: `Bài đăng mẫu cho 11:00 ngày 30/04`,
          status: 'scheduled',
          scheduledAt: new Date(date.setHours(11, 0, 0, 0)),
          createdAt: new Date(),
          updatedAt: new Date(),
        }];
      }
    }
    
    // Tuesday posts (Thứ Ba - 29/04)
    if (date.getDate() === 29 && date.getMonth() === 3 && timeSlot === '13:00') {
      return [{
        id: `sample-13-${date}`,
        topicId: "sample-topic-4",
        topicTitle: sampleTopics[3],
        platform: 'facebook',
        text: `Nội dung facebook lúc 13:00 ngày 29/04`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(13, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
    }
    
    // Friday posts (Thứ Năm - 01/05)
    if (date.getDate() === 1 && date.getMonth() === 4 && timeSlot === '13:00') {
      return [{
        id: `sample-13-${date}`,
        topicId: "sample-topic-5",
        topicTitle: sampleTopics[4],
        platform: 'linkedin',
        text: `Nội dung linkedin lúc 13:00 ngày 01/05`,
        imageUrl: 'image.jpg',
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(13, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
    }
    
    // Check real scheduled content from the database
    const realContent = scheduledContent.filter(content => {
      if (!content.scheduledAt) return false;
      const scheduledDate = new Date(content.scheduledAt);
      return (
        isSameDay(scheduledDate, date) && 
        scheduledDate.getHours() === hours
      );
    });
    
    return realContent.length ? realContent : [];
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
