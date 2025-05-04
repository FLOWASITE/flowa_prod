
import { useMemo } from 'react';
import { Content } from '@/types';
import { format } from 'date-fns';
import { platformIcons } from '@/components/chat/PlatformIcons';

export const usePlatformUtils = (items: Content[]) => {
  // Format date helper function
  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'dd/MM/yyyy') : '-';
  };

  // Get platform icon helper function
  const getPlatformIcon = (platform: string) => {
    return platformIcons[platform as keyof typeof platformIcons] || null;
  };

  // Get unique platforms for filter
  const getUniquePlatforms = () => {
    const platforms = new Set<string>();
    items.forEach(item => {
      if (item.platform) {
        platforms.add(item.platform);
      }
    });
    return Array.from(platforms);
  };

  return {
    formatDate,
    getPlatformIcon,
    getUniquePlatforms
  };
};
