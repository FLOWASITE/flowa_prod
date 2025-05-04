
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Content, Topic } from '@/types';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

interface ContentCardBodyProps {
  content: Content;
  topic?: Topic;
  compact?: boolean;
}

export const ContentCardBody: React.FC<ContentCardBodyProps> = ({ 
  content, 
  topic, 
  compact = false 
}) => {
  const getFormattedDate = (date: Date | undefined) => {
    if (!date) return null;
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  return (
    <CardContent className="flex-grow pt-0">
      <div className="mb-2">
        <p className="text-sm text-muted-foreground">
          {topic ? topic.title : 'Không có chủ đề'}
        </p>
      </div>
      
      <p className={`text-sm ${compact ? 'line-clamp-2' : 'line-clamp-3'} mb-2`}>{content.text}</p>
      
      {content.imageUrl && (
        <div className={`mb-2 aspect-video relative overflow-hidden rounded-md ${compact ? 'h-20' : ''}`}>
          <img 
            src={content.imageUrl} 
            alt="Content" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Tạo: {getFormattedDate(content.createdAt)}</span>
        </div>
        
        {content.approvedAt && (
          <div className="flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3 text-blue-600" />
            <span>Duyệt: {getFormattedDate(content.approvedAt)}</span>
          </div>
        )}
        
        {content.scheduledAt && (
          <div className="flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3" />
            <span>Dự kiến: {getFormattedDate(content.scheduledAt)}</span>
          </div>
        )}
        
        {content.publishedAt && (
          <div className="flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>Đăng: {getFormattedDate(content.publishedAt)}</span>
          </div>
        )}
      </div>
    </CardContent>
  );
};
