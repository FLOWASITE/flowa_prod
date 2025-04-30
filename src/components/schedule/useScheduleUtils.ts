
import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Content } from '@/types/content';

export const useScheduleUtils = (scheduledContent: Content[]) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  
  // Create an array of dates for the current week
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
  
  // Time slots from 9:00 to 18:00
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
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
    
    return scheduledContent.filter(content => {
      if (!content.scheduledAt) return false;
      const scheduledDate = new Date(content.scheduledAt);
      return (
        isSameDay(scheduledDate, date) && 
        scheduledDate.getHours() === hours
      );
    });
  };
  
  // Format date range for header
  const formatDateRange = () => {
    const endDate = addDays(weekStartDate, 6);
    const startMonth = format(weekStartDate, 'MMM', { locale: vi });
    const startDay = format(weekStartDate, 'd', { locale: vi });
    const endMonth = format(endDate, 'MMM', { locale: vi });
    const endDay = format(endDate, 'd', { locale: vi });
    const year = format(endDate, 'yyyy', { locale: vi });
    
    if (startMonth === endMonth) {
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

// Add missing isSameDay function from date-fns
import { isSameDay } from 'date-fns';
