
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Topic } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { topicTranslations } from './topicTranslations';

interface TopicCardProps {
  topic: Topic;
  onApprove?: (topic: Topic) => void;
  onReject?: (topic: Topic) => void;
  onView?: (topic: Topic) => void;
  onEdit?: (topic: Topic) => void;
}

export function TopicCard({ topic, onApprove, onReject, onView, onEdit }: TopicCardProps) {
  const { currentLanguage } = useLanguage();

  const getStatusTranslation = (status: string) => {
    const lang = currentLanguage.code;
    return topicTranslations.topicStatus[status]?.[lang] || status;
  };

  const statusColors = {
    draft: "bg-gray-200 text-gray-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    generating: "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };

  const renderActionButtons = () => {
    if (topic.status === 'draft') {
      return (
        <>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex-1"
            onClick={() => onReject && onReject(topic)}
          >
            Từ chối
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onApprove && onApprove(topic)}
          >
            Duyệt
          </Button>
        </>
      );
    }
    
    if (topic.status === 'completed') {
      return (
        <Button 
          className="w-full"
          onClick={() => onView && onView(topic)}
        >
          Xem nội dung
        </Button>
      );
    }
    
    return (
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => onView && onView(topic)}
      >
        Xem chi tiết
      </Button>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant="outline" className={statusColors[topic.status]}>
            {getStatusTranslation(topic.status)}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(topic.createdAt, { addSuffix: true })}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{topic.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">{topic.description}</p>
        
        <div className="mt-4 flex items-center">
          <Badge variant="outline" className="mr-2">
            {topic.createdBy === 'user' ? 'Manual' : 'AI Generated'}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex gap-2">
        {renderActionButtons()}
      </CardFooter>
    </Card>
  );
}
