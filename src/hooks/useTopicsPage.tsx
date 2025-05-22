import React, { useState, useEffect, useCallback } from 'react';
import { Topic } from '@/types';
import { 
  approveTopic as approveTopicDirectly, 
  approvePendingTopic as approvePendingTopicDirectly, 
  rejectTopic as rejectTopicDirectly 
} from '@/hooks/useTopicStatusUpdate'; 
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase'; 
import { apiClient } from '@/api/apiClient';

const ITEMS_PER_PAGE = 10;

interface PendingTopicPayload {
  title: string;
  description: string;
  brand_id: string;
  product_id: string | null;
  status: string;
  tone_of_voice?: string;
  target_audience?: string;
  keywords?: string[];
  content_goals?: string[];
  notes?: string;
  prompt?: string;
}

interface ApiErrorData {
  detail?: string;
}

const translations = {
  title: {
    vi: 'Chủ đề',
    en: 'Topics',
    fr: 'Sujets',
    es: 'Temas',
    th: 'หัวข้อ',
    id: 'Topik'
  },
  subtitle: {
    vi: 'Tạo và quản lý chủ đề nội dung',
    en: 'Create and manage content topics',
    fr: 'Créer et gérer des sujets de contenu',
    es: 'Crear y gestionar temas de contenido',
    th: 'สร้างและจัดการหัวข้อเนื้อหา',
    id: 'Buat dan kelola topik konten'
  },
  product: { vi: 'Sản phẩm', en: 'Product' },
  drafts: { vi: 'Bản nháp', en: 'Drafts' },
  approved: { vi: 'Đã phê duyệt', en: 'Approved' },
  completed: { vi: 'Đã hoàn thành', en: 'Completed' },
  noDrafts: { vi: 'Không tìm thấy chủ đề bản nháp', en: 'No draft topics found' },
  noApproved: { vi: 'Không tìm thấy chủ đề đã phê duyệt', en: 'No approved topics found' },
  noCompleted: { vi: 'Không tìm thấy chủ đề đã hoàn thành', en: 'No completed topics found' },
  noProduct: { vi: 'Không có sản phẩm', en: 'No product' },
};

export const handleApproveTopicFromAPI = async (
  topic: Topic, 
  topics: Topic[], 
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>, 
  setSelectedTopicForApproval: React.Dispatch<React.SetStateAction<Topic | null>>
) => {
  if (setSelectedTopicForApproval) setSelectedTopicForApproval(topic);
  console.log("Attempting to approve topic from API:", topic);
  const isNumericId = /^\d+$/.test(topic.id);

  try {
    let approvedTopicResponse: Topic;
    if (isNumericId) {
      console.log(`Approving pending topic with numeric ID: ${topic.id}`);
      const payload: PendingTopicPayload = {
        title: topic.title,
        description: topic.description,
        brand_id: topic.brandId,
        product_id: topic.productTypeId || null,
        status: 'approved',
        tone_of_voice: topic.tone_of_voice,
        target_audience: topic.target_audience,
        keywords: Array.isArray(topic.keywords) ? topic.keywords : undefined,
        content_goals: Array.isArray(topic.content_goals) ? topic.content_goals : undefined,
        notes: topic.notes,
        prompt: topic.prompt,
      };
      console.log("Payload for approvePendingTopicDirectly:", payload);
      approvedTopicResponse = await approvePendingTopicDirectly(payload);
      console.log("Response from approvePendingTopicDirectly:", approvedTopicResponse);
    } else {
      console.log(`Approving existing topic with UUID: ${topic.id}`);
      approvedTopicResponse = await approveTopicDirectly(topic.id);
      console.log("Response from approveTopicDirectly (UUID):", approvedTopicResponse);
    }

    setTopics(prevTopics => 
      prevTopics.map(t => 
        t.id === topic.id || (isNumericId && approvedTopicResponse && t.id === approvedTopicResponse.id) 
          ? { ...approvedTopicResponse, status: 'approved' } 
          : t
      )
    );
    toast.success(`Chủ đề "${approvedTopicResponse.title}" đã được duyệt thành công.`);
  } catch (err: unknown) {
    console.error("Error approving topic:", err);
    let errorMessage = 'Đã có lỗi xảy ra khi duyệt chủ đề.';
    if (err instanceof AxiosError) {
      const errorData = err.response?.data as ApiErrorData | undefined;
      if (errorData?.detail) {
        errorMessage = errorData.detail;
      }
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }
  if (setSelectedTopicForApproval) setSelectedTopicForApproval(null);
};

export const useTopicsPage = () => {
  const { currentLanguage } = useLanguage();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTopicForApproval, setSelectedTopicForApproval] = useState<Topic | null>(null);
  const [isRejecting, setIsRejecting] = useState(false); 
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const getTranslation = useCallback((key: keyof typeof translations) => {
    const lang = currentLanguage.code as keyof typeof translations[keyof typeof translations];
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  }, [currentLanguage.code]);

  const fetchTopics = useCallback(async (page: number, search: string, status?: string, sort?: 'asc' | 'desc') => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('api_key') || 'dev-api-key';
      if (token) apiClient.setApiKey(token);

      const response = await apiClient.get<{ topics: Topic[]; total_count: number }>('/api/topics', {
        params: {
          skip: (page - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
          search_term: search,
          status: status,
          sort_order: sort,
        }
      });
      setTopics(response.topics);
      setFilteredTopics(response.topics);
      setTotalPages(Math.ceil(response.total_count / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Lỗi khi tải chủ đề:', error);
      toast.error('Không thể tải danh sách chủ đề.');
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as ApiErrorData | undefined;
        if (errorData?.detail) {
          toast.error(`Lỗi từ server: ${errorData.detail}`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics(currentPage, searchTerm, statusFilter, sortOrder);
  }, [currentPage, searchTerm, statusFilter, sortOrder, fetchTopics]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterByStatus = (status?: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApproveTopic = (topicToApprove: Topic) => {
    handleApproveTopicFromAPI(topicToApprove, topics, setTopics, setSelectedTopicForApproval);
  };
  
  const handleRejectTopic = async (topicId: string) => {
    setIsRejecting(true);
    try {
      await rejectTopicDirectly(topicId);
      setTopics(prevTopics => prevTopics.map(t => t.id === topicId ? { ...t, status: 'rejected' } : t));
      setFilteredTopics(prevTopics => prevTopics.map(t => t.id === topicId ? { ...t, status: 'rejected' } : t));
      toast.success("Chủ đề đã được từ chối.");
    } catch (err: unknown) {
      console.error("Error rejecting topic:", err);
      let errorMessage = 'Đã có lỗi xảy ra khi từ chối chủ đề.';
      if (err instanceof AxiosError) {
        const errorData = err.response?.data as ApiErrorData | undefined;
        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
    setIsRejecting(false);
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSelectAllTopics = () => {
    if (selectedTopics.length === filteredTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(filteredTopics.map(topic => topic.id));
    }
  };
  
  const handleCreateNewTopic = () => {
    console.log('Navigate to create new topic page or open modal');
    toast.info('Chức năng tạo chủ đề mới sẽ được thêm vào sau.');
  };

  const createTopic = async (topicData: Partial<Topic>): Promise<Topic | null> => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('api_key') || 'dev-api-key';
      if (token) apiClient.setApiKey(token);

      const response = await apiClient.post<Topic>('/api/topics', topicData);
      toast.success(getTranslation('subtitle')); // Example usage of getTranslation, adjust as needed
      fetchTopics(1, '', undefined, 'desc'); // Refetch topics after creation
      return response;
    } catch (error) {
      console.error('Error creating topic:', error);
      let errorMessage = 'Failed to create topic.';
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as ApiErrorData | undefined;
        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      }
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    topics,
    filteredTopics,
    currentPage,
    totalPages,
    isLoading,
    searchTerm,
    statusFilter,
    sortOrder,
    handleSearch,
    handleFilterByStatus,
    handleSort,
    handlePageChange,
    handleApproveTopic,
    handleRejectTopic,
    selectedTopicForApproval,
    setSelectedTopicForApproval,
    isRejecting,
    selectedTopics,
    handleSelectTopic,
    handleSelectAllTopics,
    handleCreateNewTopic,
    getTranslation,
    createTopic,
  };
};
