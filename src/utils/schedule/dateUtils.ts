
import { format, addDays, startOfWeek } from 'date-fns';

// Format date range for header (e.g., "thg 4 28 - thg 5 4, 2025")
export const formatDateRange = (weekStartDate: Date) => {
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

// Create week dates array from start date
export const createWeekDates = (weekStartDate: Date) => {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
};
