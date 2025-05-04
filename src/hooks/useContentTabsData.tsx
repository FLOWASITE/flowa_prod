
import { useMemo } from 'react';
import { Content } from '@/types';
import { useTabFiltering } from '@/components/content/hooks/useTabFiltering';
import { getPaginatedContent } from '@/components/content/utils/contentFilters';

type TabValue = 'all' | 'draft' | 'approved' | 'scheduled' | 'rejected' | 'published';

interface UseContentTabsDataProps {
  content: Content[];
  selectedPlatform: string;
  currentPage: number;
  rowsPerPage: number;
  activeTab: TabValue;
}

export const useContentTabsData = ({
  content,
  selectedPlatform,
  currentPage,
  rowsPerPage,
  activeTab
}: UseContentTabsDataProps) => {
  // Use our new filtering hook for each tab
  const allContent = useTabFiltering(content, 'all', selectedPlatform);
  const draftContent = useTabFiltering(content, 'draft', selectedPlatform);
  const approvedContent = useTabFiltering(content, 'approved', selectedPlatform);
  const scheduledContent = useTabFiltering(content, 'scheduled', selectedPlatform);
  const rejectedContent = useTabFiltering(content, 'rejected', selectedPlatform);
  const publishedContent = useTabFiltering(content, 'published', selectedPlatform);

  // Get the current active content based on the selected tab
  const activeContent = useMemo(() => {
    switch (activeTab) {
      case 'draft':
        return draftContent;
      case 'approved':
        return approvedContent;
      case 'scheduled':
        return scheduledContent;
      case 'rejected':
        return rejectedContent;
      case 'published':
        return publishedContent;
      case 'all':
      default:
        return allContent;
    }
  }, [activeTab, allContent, draftContent, approvedContent, scheduledContent, rejectedContent, publishedContent]);

  // Get paginated content for the current tab
  const paginatedContent = useMemo(() => {
    return getPaginatedContent(activeContent, currentPage, rowsPerPage);
  }, [activeContent, currentPage, rowsPerPage]);

  // Determine if batch selection should be shown
  const showBatchSelection = activeTab === 'all' || activeTab === 'draft';
  
  // Determine if approve actions should be shown
  const showApproveActions = activeTab !== 'approved' && activeTab !== 'scheduled' && activeTab !== 'published';

  return {
    allContent,
    draftContent,
    approvedContent,
    scheduledContent,
    rejectedContent,
    publishedContent,
    activeContent,
    paginatedContent,
    showBatchSelection,
    showApproveActions
  };
};
