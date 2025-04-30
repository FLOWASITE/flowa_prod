
import { useState } from 'react';
import { addDays, startOfWeek } from 'date-fns';
import { Content } from '@/types/content';
import { DEFAULT_TIME_SLOTS } from '@/utils/schedule/constants';
import { formatDateRange, createWeekDates } from '@/utils/schedule/dateUtils';
import { getScheduledContent } from '@/utils/schedule/contentUtils';

export const useScheduleUtils = (scheduledContent: Content[]) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  
  // Create an array of dates for the current week
  const weekDates = createWeekDates(weekStartDate);
  
  // Time slots
  const timeSlots = DEFAULT_TIME_SLOTS;
  
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
  
  // Get scheduled content wrapper
  const getScheduledContentForSlot = (date: Date, timeSlot: string): Content[] => {
    return getScheduledContent(date, timeSlot, scheduledContent);
  };

  // Format date range for header wrapper
  const formatDateRangeForHeader = () => {
    return formatDateRange(weekStartDate);
  };

  return {
    weekStartDate,
    weekDates,
    timeSlots,
    goToPreviousWeek,
    goToNextWeek,
    getScheduledContent: getScheduledContentForSlot,
    formatDateRange: formatDateRangeForHeader
  };
};
