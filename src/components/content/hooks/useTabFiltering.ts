
import { useMemo } from 'react';
import { Content } from '@/types';

export const useTabFiltering = (
  content: Content[], 
  status: 'all' | 'draft' | 'approved' | 'rejected' | 'scheduled' | 'published',
  selectedPlatform: string
) => {
  return useMemo(() => {
    // First filter by platform if not 'all'
    const platformFiltered = selectedPlatform === 'all'
      ? content
      : content.filter(item => item.platform === selectedPlatform);
    
    // Then filter by status if not 'all'
    if (status === 'all') {
      return platformFiltered;
    }
    
    // Return content filtered by both platform and status
    return platformFiltered.filter(item => item.status === status);
  }, [content, status, selectedPlatform]);
};
