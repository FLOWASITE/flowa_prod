import { useState } from 'react';
import { Topic } from '@/types';
import { apiClient } from '@/api/apiClient';
import { toast } from 'sonner';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { topicService, PendingTopicPayload as TopicPayload } from '@/services/topicService';

// Instantiate QueryClient once at the module level
const queryClientInstance = new QueryClient();

// Cập nhật/mở rộng kiểu Topic để bao gồm các trường có thể có từ LocalStorage
// và các trường mà PendingTopicData ở backend mong đợi
export interface PendingTopicPayload {
  title: string;
  description?: string | null;
  brand_id: string; 
  product_id?: string | null; 
  themeTypeId?: string | null;
  prompt?: string | null; 
  target_audience?: string | null;
  keywords?: string[];
  status?: string; 
  tone_of_voice?: string; 
  content_goals?: string[]; 
  notes?: string; 
}

// Helper function to validate UUID format or numeric ID
const isValidID = (id: string): boolean => {
  // Chấp nhận cả UUID và số nguyên
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const numericRegex = /^\d+$/; // Regex cho số nguyên
  return uuidRegex.test(id) || numericRegex.test(id);
};

export const approveTopic = async (topicId: string): Promise<Topic> => {
  if (!topicId) {
    throw new Error('Topic ID is required.');
  }
  if (typeof topicId !== 'string' || !isValidID(topicId)) {
    throw new Error(`Invalid topic ID format: ${topicId}. Must be a valid UUID or numeric ID.`);
  }

  const token = localStorage.getItem('auth_token') || localStorage.getItem('api_key') || 'dev-api-key';
  // apiClient.setApiKey(token); // Assuming apiClient handles auth internally or through interceptors

  try {
    const response = await apiClient.post<Topic>(`/api/topics/${topicId}/approve`, {}, {
        headers: { 'Authorization': `Bearer ${token}` } // Pass token if not handled by interceptor
    });
    queryClientInstance.invalidateQueries({ queryKey: ['topics'] });
    toast.success('Chủ đề đã được duyệt');
    return response; // FastAPI typically returns the updated/created object
  } catch (error) {
    console.error('Error approving topic:', error);
    let errorMessage = 'Có lỗi xảy ra khi duyệt chủ đề.';
    if (error instanceof Error && error.message) {
        errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error; // Re-throw to be caught by calling function
  }
};

export const approvePendingTopic = async (pendingTopicData: TopicPayload): Promise<Topic> => {
  if (!pendingTopicData) {
    throw new Error('Dữ liệu chủ đề đang chờ không hợp lệ');
  }

  console.log('Sending data to /api/topics/approve_pending:', pendingTopicData);

  try {
    const apiResponse = await topicService.approvePendingTopic(pendingTopicData);
    queryClientInstance.invalidateQueries({ queryKey: ['topics'] });
    toast.success(`Chủ đề "${apiResponse.title}" đã được duyệt và lưu.`);
    
    // Convert the API response to the expected Topic type format
    const response: Topic = {
      id: apiResponse.id,
      title: apiResponse.title,
      description: apiResponse.description || '',
      brandId: apiResponse.brand_id,
      themeTypeId: apiResponse.category || '',
      productTypeId: apiResponse.product_id,
      status: apiResponse.status === 'approved' ? 'approved' : 
              apiResponse.status === 'rejected' ? 'rejected' : 'draft',
      createdBy: apiResponse.user_id,
      createdAt: new Date(apiResponse.created_at),
      updatedAt: new Date(apiResponse.updated_at),
      // Optional fields that may exist in the Topic interface
      target_audience: apiResponse.target_audience
    };
    
    // Add any additional properties that might be available from the API
    if (apiResponse.keywords) {
      (response as any).keywords = apiResponse.keywords;
    }
    
    if (apiResponse.prompt) {
      (response as any).prompt = apiResponse.prompt;
    }
    
    return response;
  } catch (error) {
    console.error('Error approving pending topic:', error);
    let errorMessage = 'Có lỗi xảy ra khi duyệt chủ đề đang chờ.';
    if (error instanceof Error && error.message) {
        errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const rejectTopic = async (topicId: string, reason?: string): Promise<void> => {
  if (!topicId) {
    throw new Error('Topic ID is required.');
  }
  if (typeof topicId !== 'string' || !isValidID(topicId)) {
    throw new Error(`Invalid topic ID format: ${topicId}. Must be a valid UUID or numeric ID.`);
  }

  const token = localStorage.getItem('auth_token') || localStorage.getItem('api_key') || 'dev-api-key';
  // apiClient.setApiKey(token);

  try {
    await apiClient.post(`/api/topics/${topicId}/reject`, { reason }, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    queryClientInstance.invalidateQueries({ queryKey: ['topics'] });
    toast.success('Chủ đề đã bị từ chối');
  } catch (error) {
    console.error('Error rejecting topic:', error);
    let errorMessage = 'Có lỗi xảy ra khi từ chối chủ đề.';
    if (error instanceof Error && error.message) {
        errorMessage = error.message;
    }
    toast.error(errorMessage);
    throw error;
  }
};

export const useTopicStatusUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  return {
    isLoading
  };
};
