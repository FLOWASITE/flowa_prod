
import { useState } from 'react';
import { Content } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { mockContents } from '@/data/mockData';
import { filterBase64Content } from '@/lib/contentUtils';

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
        const response = await apiClient.get<ContentResponse>('/api/content');
        // Log the full response structure to debug
        console.log('Content API response:', response);
        console.log('Content data structure:', response.data);
        
        // Filter out base64 content to reduce payload size
        if (response && typeof response === 'object') {
          // Use a more specific type for the response object
          const responseObj = response as { data?: unknown };
          if (responseObj.data) {
            // Use proper type assertions to handle different response structures
            if (Array.isArray(responseObj.data)) {
              // Type the data as Content[] for filtering
              const typedData = responseObj.data as Content[];
              (responseObj as { data: Content[] }).data = filterBase64Content(typedData);
            } else if (typeof responseObj.data === 'object' && responseObj.data !== null) {
              const nestedData = responseObj.data as { data?: unknown };
              if (nestedData.data && Array.isArray(nestedData.data)) {
                // Type the nested data as Content[] for filtering
                const typedNestedData = nestedData.data as Content[];
                (nestedData as { data: Content[] }).data = filterBase64Content(typedNestedData);
              }
            }
          }
        }
        
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
  let content: Content[] = [];
  
  if (contentResponse) {
    console.log('Content response structure:', contentResponse);
    
    try {
      // Handle different response structures
      if (Array.isArray(contentResponse)) {
        // If the response is directly an array
        content = contentResponse as Content[];
      } else if (typeof contentResponse === 'object' && contentResponse !== null) {
        const responseObj = contentResponse as unknown as { data?: unknown };
        
        if (responseObj.data) {
          if (Array.isArray(responseObj.data)) {
            // If response.data is an array
            content = responseObj.data as Content[];
          } else if (typeof responseObj.data === 'object' && responseObj.data !== null) {
            const nestedData = responseObj.data as { data?: unknown };
            if (nestedData.data && Array.isArray(nestedData.data)) {
              // If response.data.data is an array (nested structure)
              content = nestedData.data as Content[];
            }
          }
        }
      }
    } catch (error) {
      console.error('Error extracting content from response:', error);
    }
  }
  
  console.log('Final extracted content:', content);

  return { content, isContentLoading, contentError };
};
