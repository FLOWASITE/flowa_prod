
import { Content } from '@/types/content';
import { isSameDay } from 'date-fns';
import { 
  generateSharedTopicPosts, 
  generateWednesdaySamples, 
  generateTuesdaySamples, 
  generateFridaySamples,
  generateMultipleTopicsForTimeSlot
} from './generateSampleContent';

// Get scheduled content for a specific date and time slot
export const getScheduledContent = (
  date: Date, 
  timeSlot: string,
  scheduledContent: Content[]
): Content[] => {
  // Parse the time from the timeSlot string
  const [hours] = timeSlot.split(':').map(Number);
  
  // Check for multiple topics in the same time slot (new)
  const multipleTopicsContent = generateMultipleTopicsForTimeSlot(date, timeSlot);
  if (multipleTopicsContent.length > 0) return multipleTopicsContent;
  
  // Check for sample content based on date
  // First check for shared topic content
  if (timeSlot === '15:00') {
    const sharedContent = generateSharedTopicPosts(date);
    if (sharedContent.length > 0) return sharedContent;
  }
  
  // Check for specific day samples
  const wednesdaySamples = generateWednesdaySamples(date, timeSlot);
  if (wednesdaySamples.length > 0) return wednesdaySamples;
  
  const tuesdaySamples = generateTuesdaySamples(date, timeSlot);
  if (tuesdaySamples.length > 0) return tuesdaySamples;
  
  const fridaySamples = generateFridaySamples(date, timeSlot);
  if (fridaySamples.length > 0) return fridaySamples;
  
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
