import { useState, useMemo } from 'react';
import { mockTopics } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Topic } from '@/types';
import { toast } from 'sonner';
import { useTopicStatusUpdate } from './useTopicStatusUpdate';

export const useTopicsPage = () => {
  const { currentLanguage } = useLanguage();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Filter topics by product type
  const filteredTopics = useMemo(() => {
    return selectedPlatform === 'all'
      ? mockTopics
      : mockTopics.filter(topic => topic.productTypeId === selectedPlatform);
  }, [selectedPlatform]);

  // Get paginated topics
  const paginatedTopics = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredTopics.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredTopics, currentPage, rowsPerPage]);

  // Get unique product types for filtering
  const uniqueProductIds = useMemo(() => {
    return [...new Set(mockTopics.map(topic => topic.productTypeId))].filter(Boolean) as string[];
  }, []);

  const { approveTopic, rejectTopic, isLoading: statusUpdateLoading } = useTopicStatusUpdate();

  // Add new action handlers for topic actions
  const handleViewTopic = (topic: Topic) => {
    // Navigate to topic details or open a modal
    toast.info(`Xem chi tiết: ${topic.title}`);
  };

  const handleApproveTopic = async (topic: Topic) => {
    const result = await approveTopic(topic);
    if (result) {
      // Refresh topics if needed
    }
  };

  const handleEditTopic = (topic: Topic) => {
    // Open edit modal or navigate to edit page
    toast.info(`Chỉnh sửa: ${topic.title}`);
  };

  const handleRejectTopic = async (topic: Topic) => {
    const result = await rejectTopic(topic);
    if (result) {
      // Refresh topics if needed
    }
  };

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
    product: {
      vi: 'Sản phẩm',
      en: 'Product',
      fr: 'Produit',
      es: 'Producto',
      th: 'สินค้า',
      id: 'Produk'
    },
    drafts: {
      vi: 'Bản nháp',
      en: 'Drafts',
      fr: 'Brouillons',
      es: 'Borradores',
      th: 'ฉบับร่าง',
      id: 'Draf'
    },
    approved: {
      vi: 'Đã phê duyệt',
      en: 'Approved',
      fr: 'Approuvé',
      es: 'Aprobado',
      th: 'ได้รับการอนุมัติ',
      id: 'Disetujui'
    },
    completed: {
      vi: 'Đã hoàn thành',
      en: 'Completed',
      fr: 'Terminé',
      es: 'Completado',
      th: 'เสร็จสมบูรณ์',
      id: 'Selesai'
    },
    noDrafts: {
      vi: 'Không tìm thấy chủ đề bản nháp',
      en: 'No draft topics found',
      fr: 'Aucun sujet en brouillon trouvé',
      es: 'No se encontraron temas en borrador',
      th: 'ไม่พบหัวข้อฉบับร่าง',
      id: 'Tidak ada topik draf ditemukan'
    },
    noApproved: {
      vi: 'Không tìm thấy chủ đề đã phê duyệt',
      en: 'No approved topics found',
      fr: 'Aucun sujet approuvé trouvé',
      es: 'No se encontraron temas aprobados',
      th: 'ไม่พบหัวข้อที่ได้รับการอนุมัติ',
      id: 'Tidak ada topik yang disetujui ditemukan'
    },
    noCompleted: {
      vi: 'Không tìm thấy chủ đề đã hoàn thành',
      en: 'No completed topics found',
      fr: 'Aucun sujet terminé trouvé',
      es: 'No se encontraron temas completados',
      th: 'ไม่พบหัวข้อที่เสร็จสมบูรณ์',
      id: 'Tidak ada topik yang selesai ditemukan'
    },
    noProduct: {
      vi: 'Không có sản phẩm',
      en: 'No product',
      fr: 'Aucun produit',
      es: 'No hay producto',
      th: 'ไม่มีสินค้า',
      id: 'Tidak ada produk'
    }
  };

  const getTranslation = (key: string) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en'];
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      }
      return [...prev, topicId];
    });
  };

  const handleSelectAll = () => {
    if (selectedTopics.length === paginatedTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(paginatedTopics.map(topic => topic.id));
    }
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving topics:', selectedTopics);
    toast.success(`Approved ${selectedTopics.length} topics`);
    setSelectedTopics([]);
  };

  const handleCreateNew = () => {
    console.log('Create new topic');
    toast.info('Creating new topic');
  };

  return {
    selectedTopics,
    currentPage,
    rowsPerPage,
    selectedPlatform,
    filteredTopics,
    paginatedTopics,
    uniqueProductIds,
    getTranslation,
    handleSelectTopic,
    handleSelectAll,
    handleBulkApprove,
    handleCreateNew,
    handlePageChange,
    handleRowsPerPageChange,
    setSelectedPlatform,
    // New action handlers
    handleViewTopic,
    handleApproveTopic,
    handleEditTopic,
    handleRejectTopic,
    statusUpdateLoading
  };
};
