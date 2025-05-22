import { Content } from '@/types';

// Extended Content type to handle API response which might include additional fields
interface ContentWithBase64 extends Content {
  content?: string;
  embedding?: string | null;
  preview_image?: string | null;
}

/**
 * Filters out base64 content from API responses to reduce payload size
 * @param content - The content object or array from the API
 * @returns The same content with base64 data removed
 */
export function filterBase64Content<T extends ContentWithBase64 | ContentWithBase64[]>(content: T): T {
  if (Array.isArray(content)) {
    // If it's an array of content, process each item
    return content.map(item => filterBase64FromContentItem(item)) as T;
  } else if (content && typeof content === 'object') {
    // If it's a single content item
    return filterBase64FromContentItem(content as Content) as T;
  }
  
  // Return as is if it's neither an array nor an object
  return content;
}

/**
 * Filters out base64 content from a single content item
 * @param content - The content object
 * @returns The same content with base64 data removed
 */
function filterBase64FromContentItem(content: ContentWithBase64): ContentWithBase64 {
  if (!content) return content;
  
  // Create a copy of the content object
  const filteredContent = { ...content };
  
  // Check if content property exists and might contain base64 data
  if (filteredContent.content && typeof filteredContent.content === 'string' && filteredContent.content.length > 1000) {
    // Replace base64 content with a placeholder
    filteredContent.content = '[BASE64_CONTENT_REMOVED]';
  }
  
  // Check if embedding property exists and might contain base64 data
  if (filteredContent.embedding && typeof filteredContent.embedding === 'string' && filteredContent.embedding.length > 1000) {
    filteredContent.embedding = null;
  }
  
  // Check if preview_image property exists and might contain base64 data
  if (filteredContent.preview_image && typeof filteredContent.preview_image === 'string' && filteredContent.preview_image.length > 1000) {
    filteredContent.preview_image = null;
  }
  
  return filteredContent;
}
