
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
export function countDraftItems(activeTab: 'all' | 'draft' | 'approved' | 'scheduled', allContent: Content[], draftContent: Content[]): number {
  if (activeTab === 'all') {
    return allContent.filter(item => item.status === 'draft').length;
  }
  if (activeTab === 'draft') {
    return draftContent.length;
  }
  return 0;
}
