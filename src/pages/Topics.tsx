import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicRequestForm } from '@/components/topic/TopicRequestForm';
import { TopicsTableHeader } from '@/components/topic/TopicsTableHeader';
import { TopicsTable } from '@/components/topic/TopicsTable';
import { useTopicsPage } from '@/hooks/useTopicsPage';
import {
  approveTopic, 
  approvePendingTopic, 
  rejectTopic,
  PendingTopicPayload
} from '@/hooks/useTopicStatusUpdate';
import { apiClient } from '@/api/apiClient';
import { Topic } from '@/types/content';
import { EditTopicDialog } from '@/components/topic/EditTopicDialog';
import { ViewTopicDialog } from '@/components/topic/ViewTopicDialog';
import { toast } from 'sonner';
import { ensureTopicsDates, ensureTopicDates } from '@/lib/utils';

const LOCAL_PENDING_TOPICS_KEY = 'pending_topics';
const ROWS_PER_PAGE = 10;

// Helper function to validate UUID format or numeric ID
const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const numericRegex = /^\d+$/;
  return uuidRegex.test(id) || numericRegex.test(id);
};

// Helper function to generate a valid UUID v4
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Helper function to ensure a topic has a valid UUID
const ensureValidUUID = (topic: Topic): Topic => {
  if (!topic.id || typeof topic.id !== 'string' || !isValidUUID(topic.id)) {
    return {
      ...topic,
      id: generateUUID()
    };
  }
  return topic;
};

const Topics = () => {
  const {
    topics: apiTopics,
    filteredTopics: apiFilteredTopics,
    isLoading: isHookLoading,
    getTranslation,
    handleApproveTopic: handleApproveTopicFromHook, 
    handleRejectTopic: handleRejectTopicFromHook,   
    selectedTopics: selectedApiTopics, 
    handleSelectTopic: handleSelectApiTopic, 
    handleCreateNewTopic, 
    createTopic,
    currentPage: hookCurrentPage, 
    handlePageChange: hookHandlePageChange, 
  } = useTopicsPage();

  const [pendingTopics, setPendingTopics] = useState<Topic[]>([]);
  const [combinedTopics, setCombinedTopics] = useState<Topic[]>([]);
  const [displayedTopics, setDisplayedTopics] = useState<Topic[]>([]);
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [localTotalPages, setLocalTotalPages] = useState(0);
  const [localSelectedTopics, setLocalSelectedTopics] = useState<string[]>([]); // New state for local selection
  
  const [viewTopic, setViewTopic] = useState<Topic | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editTopic, setEditTopic] = useState<Topic | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  useEffect(() => {
    const local = localStorage.getItem(LOCAL_PENDING_TOPICS_KEY);
    if (local) {
      try {
        const arr = JSON.parse(local);
        if (Array.isArray(arr)) {
          // Ensure both valid UUIDs and proper date objects
          const validTopics = ensureTopicsDates(arr.map(ensureValidUUID));
          setPendingTopics(validTopics);
        }
      } catch (error) {
        console.error('Error parsing pending topics:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_PENDING_TOPICS_KEY, JSON.stringify(pendingTopics));
  }, [pendingTopics]);

  useEffect(() => {
    const uniquePendingTopics = pendingTopics.filter(pt => !apiFilteredTopics.some(at => at.id === pt.id));
    const all = [...uniquePendingTopics, ...apiFilteredTopics];
    setCombinedTopics(all);
  }, [pendingTopics, apiFilteredTopics]);

  useEffect(() => {
    const total = Math.ceil(combinedTopics.length / ROWS_PER_PAGE);
    setLocalTotalPages(total);
    const startIndex = (localCurrentPage - 1) * ROWS_PER_PAGE;
    setDisplayedTopics(combinedTopics.slice(startIndex, startIndex + ROWS_PER_PAGE));
  }, [combinedTopics, localCurrentPage]);

  const handleSetTopicsFromForm = (newTopics: Topic[]) => {
    // Ensure both valid UUIDs and proper date objects
    const validTopics = ensureTopicsDates(newTopics.map(topic => ensureValidUUID(topic)));
    setPendingTopics(prev => [...prev, ...validTopics]);
  };

  const handleLocalPageChange = (page: number) => {
    setLocalCurrentPage(page);
    setLocalSelectedTopics([]); // Clear selection on page change
  };

  const handleLocalSelectTopic = (topicId: string) => {
    setLocalSelectedTopics(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleLocalSelectAllTopics = () => {
    if (localSelectedTopics.length === displayedTopics.length && displayedTopics.length > 0) {
      setLocalSelectedTopics([]);
    } else {
      setLocalSelectedTopics(displayedTopics.map(topic => topic.id));
    }
  };

  const handleApproveTopicClick = async (topic: Topic) => {
    // Ensure topic has proper date objects before processing
    topic = ensureTopicDates(topic);
    const toastId = `approve-${topic.id}`;
    toast.loading('Đang duyệt chủ đề...', { id: toastId });
    try {
      console.log('Approving topic in Topics.tsx:', topic);
      const isNumericId = /^\d+$/.test(topic.id);
      
      if (isNumericId || pendingTopics.some(pt => pt.id === topic.id)) {
        // Ensure we have a valid UUID for brand_id
        const brandId = topic.brandId;
        if (!brandId) {
          toast.error('Chủ đề không có thông tin thương hiệu (brand_id).', { id: toastId });
          return;
        }

        // Ensure product_id is properly formatted
        const productId = topic.productTypeId;
        
        const payload: PendingTopicPayload = {
          title: topic.title,
          description: topic.description,
          brand_id: brandId,
          product_id: productId || null,
          status: 'approved', 
          tone_of_voice: topic.tone_of_voice,
          target_audience: topic.target_audience,
          keywords: Array.isArray(topic.keywords) ? topic.keywords : undefined,
          content_goals: Array.isArray(topic.content_goals) ? topic.content_goals : undefined,
          notes: topic.notes,
          prompt: topic.prompt,
        };
        
        console.log('Product ID being sent:', productId);

        console.log('Sending payload for pending topic approval:', payload);
        const approvedTopicResponse = await approvePendingTopic(payload); 
        if (approvedTopicResponse) {
          setPendingTopics(prev => prev.filter(t => t.id !== topic.id && t.id !== approvedTopicResponse.id));
          toast.success(`Chủ đề "${approvedTopicResponse.title}" đã được duyệt và tạo mới.`, { id: toastId });
          hookHandlePageChange(hookCurrentPage); 
        } else {
          toast.error('Không nhận được phản hồi sau khi duyệt.', { id: toastId });
        }
      } else {
        await handleApproveTopicFromHook(topic); 
        // toast.success is handled within handleApproveTopicFromHook or its callees
      }
    } catch (error: unknown) {
      console.error('Error approving topic:', error);
      if (error instanceof Error) {
        toast.error(`Lỗi khi duyệt chủ đề: ${error.message}`, { id: toastId });
      } else {
        toast.error('Lỗi khi duyệt chủ đề: Một lỗi không xác định đã xảy ra.', { id: toastId });
      }
    }
  };

  const handleDeleteTopic = async (topic: Topic) => {
    const toastId = `delete-${topic.id}`;
    toast.loading('Đang xóa chủ đề...', { id: toastId });
    try {
      if (pendingTopics.some(t => t.id === topic.id)) {
        setPendingTopics(prev => prev.filter(t => t.id !== topic.id));
        toast.success('Đã xóa chủ đề nháp thành công.', { id: toastId });
      } else {
        await handleRejectTopicFromHook(topic.id); 
        // toast.success/error is handled within handleRejectTopicFromHook
      }
    } catch (error: unknown) {
      console.error('Error deleting topic:', error);
      if (error instanceof Error) {
        toast.error(`Lỗi khi xóa chủ đề: ${error.message}`, { id: toastId });
      } else {
        toast.error('Lỗi khi xóa chủ đề: Một lỗi không xác định đã xảy ra.', { id: toastId });
      }
    }
  };

  const handleEditTopicClick = (topic: Topic) => {
    setEditTopic(topic);
    setIsEditDialogOpen(true);
  };

  const handleSaveEditTopic = async (updatedTopic: Topic) => {
    setIsEditDialogOpen(false);
    // Ensure topic has proper date objects before saving
    updatedTopic = ensureTopicDates(updatedTopic);
    const toastId = `edit-${updatedTopic.id}`;
    toast.loading('Đang cập nhật chủ đề...', { id: toastId });
    try {
      if (pendingTopics.some(t => t.id === updatedTopic.id)) {
        setPendingTopics(prev => prev.map(t => t.id === updatedTopic.id ? updatedTopic : t));
        toast.success('Đã cập nhật chủ đề nháp.', { id: toastId });
      } else {
        await apiClient.put(`/api/topics/${updatedTopic.id}`, updatedTopic);
        toast.success('Đã cập nhật chủ đề trên hệ thống.', { id: toastId });
        hookHandlePageChange(hookCurrentPage); 
      }
    } catch (error: unknown) {
      console.error('Error saving topic:', error);
      if (error instanceof Error) {
        toast.error(`Lỗi khi lưu chủ đề: ${error.message}`, { id: toastId });
      } else {
        toast.error('Lỗi khi lưu chủ đề: Một lỗi không xác định đã xảy ra.', { id: toastId });
      }
    }
    setEditTopic(null);
  };

  const handleViewDetailsClick = (topic: Topic) => {
    // Ensure topic has proper date objects before viewing
    setViewTopic(ensureTopicDates(topic));
    setIsViewDialogOpen(true);
  };

  useEffect(() => {
  }, []);

  return (
    <Layout>
      <div className="space-y-8 overflow-y-auto">
        {/* Topic Request Form Section */}
        <div>
          <TopicRequestForm 
            setTopics={handleSetTopicsFromForm} 
          />
        </div>

        {/* Topic Management Section */}
        <div>
          <TopicsTableHeader
            title={getTranslation('title')}
            subtitle={getTranslation('subtitle')}
            selectedTopics={localSelectedTopics} // Use local selection
            onBulkApprove={() => {toast.info("Chức năng duyệt hàng loạt sẽ được thêm sau.")}} // Placeholder
            onCreateNew={handleCreateNewTopic} // Use from hook
          />

          <TopicsTable
            topics={combinedTopics} // The full list of combined topics
            filteredTopics={displayedTopics} // Paginated topics for display
            paginatedTopics={displayedTopics} // For clarity, same as filteredTopics here
            selectedTopics={localSelectedTopics} // Use local selection
            currentPage={localCurrentPage}
            rowsPerPage={ROWS_PER_PAGE}
            selectedPlatform={undefined} // Placeholder, selectedPlatform logic removed from hook
            uniqueProductIds={[]} // Placeholder, uniqueProductIds logic removed from hook
            handleSelectTopic={handleLocalSelectTopic} // Use local handler
            handleSelectAll={handleLocalSelectAllTopics} // Use local handler
            handlePageChange={handleLocalPageChange}
            handleRowsPerPageChange={() => {}} // Placeholder, fixed ROWS_PER_PAGE
            setSelectedPlatform={() => {}} // Placeholder
            getTranslation={getTranslation}
            handleViewTopic={handleViewDetailsClick}
            handleApproveTopic={handleApproveTopicClick} 
            handleEditTopic={handleEditTopicClick}
            handleRejectTopic={handleDeleteTopic} 
          />
        </div>
        
        {/* Dialog xem chi tiết topic */}
        {isViewDialogOpen && viewTopic && (
          <ViewTopicDialog
            topic={viewTopic}
            onClose={() => { setIsViewDialogOpen(false); setViewTopic(null); }}
          />
        )}
        
        {/* Dialog chỉnh sửa topic */}
        {isEditDialogOpen && editTopic && (
          <EditTopicDialog
            topic={editTopic}
            onSave={handleSaveEditTopic}
            onClose={() => { setIsEditDialogOpen(false); setEditTopic(null); }}
          />
        )}
      </div>
    </Layout>
  );
}

export default Topics;
