
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content, Topic } from '@/types';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, Clock, Edit, Facebook, Instagram, Linkedin, Threads, Video } from 'lucide-react';

interface ContentCardProps {
  content: Content;
  topic?: Topic;
  onApprove?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content, topic, onApprove }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'tiktok':
        return <Video className="h-5 w-5 text-black" />;
      case 'threads':
        return <Threads className="h-5 w-5 text-black" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Bản nháp</Badge>;
      case 'approved':
        return <Badge variant="secondary">Đã duyệt</Badge>;
      case 'scheduled':
        return <Badge variant="default">Đã lên lịch</Badge>;
      case 'published':
        return <Badge variant="success">Đã đăng</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getPlatformIcon(content.platform)}
            <span className="font-medium capitalize">{content.platform}</span>
          </div>
          {getStatusBadge(content.status)}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow pt-0">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">
            {topic ? topic.title : 'Không có chủ đề'}
          </p>
        </div>
        
        <p className="text-sm line-clamp-3 mb-2">{content.text}</p>
        
        {content.imageUrl && (
          <div className="mb-2 aspect-video relative overflow-hidden rounded-md">
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
            <span>Tạo: {format(content.createdAt, 'dd/MM/yyyy HH:mm')}</span>
          </div>
          
          {content.scheduledAt && (
            <div className="flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              <span>Dự kiến: {format(content.scheduledAt, 'dd/MM/yyyy HH:mm')}</span>
            </div>
          )}
          
          {content.publishedAt && (
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Đăng: {format(content.publishedAt, 'dd/MM/yyyy HH:mm')}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-between">
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" /> Sửa
        </Button>
        {content.status === 'draft' && onApprove && (
          <Button variant="default" size="sm" onClick={onApprove}>
            <CheckCircle2 className="h-4 w-4 mr-1" /> Duyệt
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
