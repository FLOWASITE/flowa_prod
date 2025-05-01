
import { apiClient } from './apiClient';
import { FileTopic, Platform, FileItem } from '@/types';

export const fileManagerApi = {
  // Topics
  getTopics: async () => {
    return apiClient.get<FileTopic[]>('/files/topics');
  },
  
  createTopic: async (data: { name: string; description?: string }) => {
    return apiClient.post<FileTopic>('/files/topics', data);
  },
  
  updateTopic: async (id: string, data: { name: string; description?: string }) => {
    return apiClient.put<FileTopic>(`/files/topics/${id}`, data);
  },
  
  deleteTopic: async (id: string) => {
    return apiClient.delete(`/files/topics/${id}`);
  },
  
  // Platforms
  getPlatforms: async (topicId?: string) => {
    const url = topicId ? `/files/platforms?topic_id=${topicId}` : '/files/platforms';
    return apiClient.get<Platform[]>(url);
  },
  
  createPlatform: async (data: { topic_id: string; platform_type: string; name: string; description?: string }) => {
    return apiClient.post<Platform>('/files/platforms', data);
  },
  
  updatePlatform: async (id: string, data: { name: string; description?: string }) => {
    return apiClient.put<Platform>(`/files/platforms/${id}`, data);
  },
  
  deletePlatform: async (id: string) => {
    return apiClient.delete(`/files/platforms/${id}`);
  },
  
  // Files
  getFiles: async (platformId?: string) => {
    const url = platformId ? `/files?platform_id=${platformId}` : '/files';
    return apiClient.get<FileItem[]>(url);
  },
  
  getFileById: async (id: string) => {
    return apiClient.get<FileItem>(`/files/${id}`);
  },
  
  searchFiles: async (params: { query?: string; tag?: string; date?: Date | null }) => {
    let url = '/files/search';
    const queryParams: string[] = [];
    
    if (params.query) {
      queryParams.push(`query=${encodeURIComponent(params.query)}`);
    }
    
    if (params.tag) {
      queryParams.push(`tag=${encodeURIComponent(params.tag)}`);
    }
    
    if (params.date) {
      queryParams.push(`date=${params.date.toISOString()}`);
    }
    
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    
    return apiClient.get<FileItem[]>(url);
  },
  
  uploadFile: async (data: { platform_id: string; name: string; file_type: string; content?: string; file_path?: string; file_size?: number; tags?: string[] }) => {
    return apiClient.post<FileItem>('/files', data);
  },
  
  updateFile: async (id: string, data: { name?: string; content?: string; tags?: string[] }) => {
    return apiClient.put<FileItem>(`/files/${id}`, data);
  },
  
  deleteFile: async (id: string) => {
    return apiClient.delete(`/files/${id}`);
  }
};
