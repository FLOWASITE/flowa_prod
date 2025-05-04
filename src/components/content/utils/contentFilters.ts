
import { Content } from '@/types';

/**
 * Filter content by platform
 */
export function filterByPlatform(content: Content[], platform: string): Content[] {
  if (platform === 'all') {
    return content;
  }
  return content.filter(item => item.platform === platform);
}

/**
 * Get paginated content
 */
export function getPaginatedContent(content: Content[], currentPage: number, rowsPerPage: number): Content[] {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return content.slice(startIndex, endIndex);
}

/**
 * Count draft items
 */
export function countDraftItems(activeTab: 'all' | 'draft' | 'approved' | 'scheduled' | 'rejected' | 'published', allContent: Content[], draftContent: Content[]): number {
  if (activeTab === 'all') {
    return allContent.filter(item => item.status === 'draft').length;
  }
  if (activeTab === 'draft') {
    return draftContent.length;
  }
  return 0;
}

/**
 * Count approved items
 */
export function countApprovedItems(allContent: Content[]): number {
  return allContent.filter(item => item.status === 'approved').length;
}

/**
 * Count scheduled items
 */
export function countScheduledItems(allContent: Content[]): number {
  return allContent.filter(item => item.status === 'scheduled').length;
}

/**
 * Group content by topic
 */
export function groupContentByTopic(contents: Content[]): { [topicId: string]: Content[] } {
  return contents.reduce((grouped: { [topicId: string]: Content[] }, content) => {
    if (!grouped[content.topicId]) {
      grouped[content.topicId] = [];
    }
    grouped[content.topicId].push(content);
    return grouped;
  }, {});
}

/**
 * Get unique platforms from content
 */
export function getUniquePlatforms(content: Content[]): string[] {
  const platforms = new Set<string>();
  content.forEach(item => {
    if (item.platform) {
      platforms.add(item.platform);
    }
  });
  return Array.from(platforms);
}
