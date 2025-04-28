
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicCard } from '@/components/topic/TopicCard';
import { TopicRequestForm } from '@/components/topic/TopicRequestForm';
import { mockTopics } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const Topics = () => {
  const { currentLanguage } = useLanguage();
  
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
    }
  };

  const getTranslation = (key) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en']; // Fallback to English
  };
  
  const handleApproveTopic = (id: string) => {
    console.log(`Approving topic with id: ${id}`);
  };
  
  const handleRejectTopic = (id: string) => {
    console.log(`Rejecting topic with id: ${id}`);
  };
  
  const draftTopics = mockTopics.filter(topic => topic.status === 'draft');
  const approvedTopics = mockTopics.filter(topic => topic.status === 'approved' || topic.status === 'generating');
  const completedTopics = mockTopics.filter(topic => topic.status === 'completed');

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{getTranslation('title')}</h1>
        <p className="text-muted-foreground">{getTranslation('subtitle')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="drafts" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="drafts">
                {getTranslation('drafts')} ({draftTopics.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                {getTranslation('approved')} ({approvedTopics.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                {getTranslation('completed')} ({completedTopics.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="drafts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {draftTopics.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic}
                    onApprove={handleApproveTopic}
                    onReject={handleRejectTopic}
                  />
                ))}
                {draftTopics.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-muted-foreground">{getTranslation('noDrafts')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="approved">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedTopics.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic}
                  />
                ))}
                {approvedTopics.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-muted-foreground">{getTranslation('noApproved')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedTopics.map(topic => (
                  <TopicCard 
                    key={topic.id} 
                    topic={topic}
                  />
                ))}
                {completedTopics.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-muted-foreground">{getTranslation('noCompleted')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <TopicRequestForm />
        </div>
      </div>
    </Layout>
  );
};

export default Topics;
