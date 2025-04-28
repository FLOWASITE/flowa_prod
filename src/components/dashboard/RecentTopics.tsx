
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Topic } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface RecentTopicsProps {
  topics: Topic[];
}

export function RecentTopics({ topics }: RecentTopicsProps) {
  const { currentLanguage } = useLanguage();
  
  const statusColors = {
    draft: "bg-gray-200 text-gray-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    generating: "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };
  
  const translations = {
    recentTopics: {
      vi: "Chủ đề gần đây",
      en: "Recent Topics",
      fr: "Sujets récents",
      es: "Temas recientes",
      th: "หัวข้อล่าสุด",
      id: "Topik Terbaru"
    },
    title: {
      vi: "Tiêu đề",
      en: "Title",
      fr: "Titre",
      es: "Título",
      th: "หัวข้อ",
      id: "Judul"
    },
    status: {
      vi: "Trạng thái",
      en: "Status",
      fr: "Statut",
      es: "Estado",
      th: "สถานะ",
      id: "Status"
    },
    created: {
      vi: "Đã tạo",
      en: "Created",
      fr: "Créé",
      es: "Creado",
      th: "สร้าง",
      id: "Dibuat"
    },
    source: {
      vi: "Nguồn",
      en: "Source",
      fr: "Source",
      es: "Fuente",
      th: "แหล่งที่มา",
      id: "Sumber"
    },
    manual: {
      vi: "Thủ công",
      en: "Manual",
      fr: "Manuel",
      es: "Manual",
      th: "ด้วยตนเอง",
      id: "Manual"
    },
    aiGenerated: {
      vi: "Tạo bởi AI",
      en: "AI Generated",
      fr: "Généré par IA",
      es: "Generado por IA",
      th: "สร้างโดย AI",
      id: "Dibuat oleh AI"
    }
  };
  
  const getTranslation = (key) => {
    const lang = currentLanguage.code;
    return translations[key][lang] || translations[key]['en']; // Fallback to English
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">{getTranslation('recentTopics')}</h3>
      </div>
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getTranslation('title')}</TableHead>
              <TableHead>{getTranslation('status')}</TableHead>
              <TableHead>{getTranslation('created')}</TableHead>
              <TableHead>{getTranslation('source')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((topic) => (
              <TableRow key={topic.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{topic.title}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={statusColors[topic.status]}
                  >
                    {topic.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(topic.createdAt, { addSuffix: true })}
                </TableCell>
                <TableCell>
                  {topic.createdBy === 'user' ? getTranslation('manual') : getTranslation('aiGenerated')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
