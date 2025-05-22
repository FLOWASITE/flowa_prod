import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isValid } from "date-fns"
import { Topic } from "@/types/content"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures that date fields in a topic are actual Date objects
 * This is needed when retrieving topics from localStorage where dates are stored as strings
 */
export function ensureTopicDates(topic: Topic): Topic {
  return {
    ...topic,
    createdAt: topic.createdAt instanceof Date ? topic.createdAt : new Date(topic.createdAt || new Date()),
    updatedAt: topic.updatedAt instanceof Date ? topic.updatedAt : new Date(topic.updatedAt || new Date())
  }
}

/**
 * Ensures that date fields in an array of topics are actual Date objects
 */
export function ensureTopicsDates(topics: Topic[]): Topic[] {
  return topics.map(ensureTopicDates)
}

/**
 * Safely formats a date with error handling
 * @param date - The date to format (can be Date object or string)
 * @param formatString - The format string to use (default: 'dd/MM/yyyy')
 * @param fallback - The fallback string to use if date is invalid (default: 'Invalid date')
 * @returns Formatted date string or fallback string if date is invalid
 */
export function formatDateSafely(date: Date | string | undefined, formatString: string = 'dd/MM/yyyy', fallback: string = 'Invalid date'): string {
  try {
    if (!date) return fallback;
    
    // Convert to Date object if it's a string
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if the date is valid before formatting
    return isValid(dateObj) ? format(dateObj, formatString) : fallback;
  } catch (error) {
    console.error('Error formatting date:', error);
    return fallback;
  }
}
