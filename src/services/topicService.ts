import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

export interface Topic {
  id: string;
  title: string;
  description?: string;
  brand_id: string;
  brand_name?: string;
  product_id?: string;
  product_name?: string;
  user_id: string;
  prompt?: string;
  category?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  keywords?: string[];
  relevance_score?: number;
  target_audience?: string;
  created_at: string;
  updated_at: string;
}

export interface GenerateTopicsRequest {
  brand_id: string;
  product_id?: string;
  prompt: string;
  count?: number;
}

export interface GenerateTopicsResponse {
  topics: Topic[];
}

const getTopics = async (
  status?: string,
  brandId?: string,
  productId?: string
): Promise<Topic[]> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    let url = `${API_BASE_URL}/topics`;
    const params = new URLSearchParams();
    
    if (status) params.append('status', status);
    if (brandId) params.append('brand_id', brandId);
    if (productId) params.append('product_id', productId);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

const generateTopics = async (
  request: GenerateTopicsRequest
): Promise<GenerateTopicsResponse> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    let url = `${API_BASE_URL}/topics/generate`;
    const params = new URLSearchParams();
    
    params.append('brand_id', request.brand_id);
    if (request.product_id) params.append('product_id', request.product_id);
    params.append('prompt', request.prompt);
    if (request.count) params.append('count', request.count.toString());
    
    url += `?${params.toString()}`;

    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error generating topics:', error);
    throw error;
  }
};

const approveTopic = async (topicId: string): Promise<Topic> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.post(
      `${API_BASE_URL}/topics/${topicId}/approve`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error approving topic ${topicId}:`, error);
    throw error;
  }
};

const rejectTopic = async (topicId: string): Promise<Topic> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.post(
      `${API_BASE_URL}/topics/${topicId}/reject`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error rejecting topic ${topicId}:`, error);
    throw error;
  }
};

export interface PendingTopicPayload {
  title: string;
  description?: string | null;
  brand_id: string;
  product_id?: string | null;
  prompt?: string | null;
  target_audience?: string | null;
  keywords?: string[];
  status?: string;
  tone_of_voice?: string;
  content_goals?: string[];
  notes?: string;
}

const approvePendingTopic = async (payload: PendingTopicPayload): Promise<Topic> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    console.log('Sending payload to API endpoint:', payload);
    
    const response = await axios.post(
      `${API_BASE_URL}/api/topics/approve_pending`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error approving pending topic:', error);
    throw error;
  }
};

export const topicService = {
  getTopics,
  generateTopics,
  approveTopic,
  rejectTopic,
  approvePendingTopic,
};
