
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TopicRequestForm } from '@/components/topic/TopicRequestForm';
import { mockTopics } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Check, CheckCheck, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const Topics = () => {
  const { currentLanguage } = useLanguage();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
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
    }
  };

  const getTranslation = (key) => {
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
    if (selectedTopics.length === mockTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(mockTopics.map(topic => topic.id));
    }
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving topics:', selectedTopics);
    setSelectedTopics([]);
  };

  const statusBadge = (status: string) => {
    const statusClasses = {
      draft: "bg-gray-100 text-gray-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      generating: "bg-blue-100 text-blue-800",
      completed: "bg-purple-100 text-purple-800",
    };
    
    return (
      <Badge variant="outline" className={statusClasses[status]}>
        {status}
      </Badge>
    );
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Topic Management Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{getTranslation('title')}</h1>
              <p className="text-muted-foreground">{getTranslation('subtitle')}</p>
            </div>
            <div className="flex gap-2">
              {selectedTopics.length > 0 && (
                <Button onClick={handleBulkApprove} variant="default">
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Approve Selected ({selectedTopics.length})
                </Button>
              )}
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tạo chủ đề mới
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedTopics.length === mockTopics.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Chủ đề</TableHead>
                  <TableHead>{getTranslation('product')}</TableHead>
                  <TableHead>Phân loại</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTopics.map((topic, index) => (
                  <TableRow key={topic.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedTopics.includes(topic.id)}
                        onCheckedChange={() => handleSelectTopic(topic.id)}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium">{topic.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
                        {topic.productTypeId || 'Không có'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {topic.themeTypeId || 'General'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(topic.createdAt, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{statusBadge(topic.status)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        {topic.status === 'draft' && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => console.log('Approve topic:', topic.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Topic Request Form Section */}
        <div className="max-w-xl">
          <TopicRequestForm />
        </div>
      </div>
    </Layout>
  );
};

export default Topics;
