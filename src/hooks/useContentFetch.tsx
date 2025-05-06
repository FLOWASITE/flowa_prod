
import { useState } from 'react';
import { Content } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { mockContents } from '@/data/mockData';

interface ContentResponse {
  data: Content[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const useContentFetch = (useLocalData: boolean) => {
  // Fetch content from API
  const { data: contentResponse, isLoading: isContentLoading, error: contentError } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      console.log('Fetching content data...');
      if (useLocalData) {
        console.log('Using mock content data');
        return { 
          data: mockContents,
          pagination: { page: 1, limit: 100, total: mockContents.length }
        };
      }
      
      try {
        const response = await apiClient.get<ContentResponse>('/content');
        console.log('Content data fetched:', response.data?.length || 0, 'items');
        return response;
      } catch (err) {
        console.error('Error in content fetch:', err);
        toast.error('Lỗi khi tải dữ liệu nội dung');
        throw err;
      }
    },
    enabled: !useLocalData
  });

  // Extract content from response
  const content = contentResponse?.data || [];

  return { content, isContentLoading, contentError };
};
