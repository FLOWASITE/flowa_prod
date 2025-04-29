
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Content, Topic } from '@/types';
import { format } from 'date-fns';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Edit, 
  Eye, 
  Facebook, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  Share2, 
  Trash2, 
  Video 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ContentCardProps {
  content: Content;
  topic?: Topic;
  onApprove?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
  compact?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({ 
  content, 
  topic, 
  onApprove, 
  onDelete, 
  onView,
  onEdit,
  compact = false 
}) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'tiktok':
        return <Video className="h-5 w-5 text-black" />;
      case 'threads':
        return <MessageCircle className="h-5 w-5 text-black" />;
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
        return <Badge className="bg-green-500 text-white">Đã đăng</Badge>;
      default:
        return null;
    }
  };

  const getFormattedDate = (date: Date | undefined) => {
    if (!date) return null;
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  return (
    <Card className={`h-full flex flex-col ${compact ? 'shadow-sm' : 'shadow'}`}>
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
      
      <CardFooter className="pt-2 border-t flex justify-between">
        <div className="flex gap-1">
          {onEdit && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={onEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chỉnh sửa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {onView && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={onView}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xem chi tiết</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {content.status === 'approved' || content.status === 'scheduled' ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chia sẻ</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
          
          {onDelete && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xóa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {content.status === 'draft' && onApprove && (
          <Button variant="default" size="sm" onClick={onApprove}>
            <CheckCircle2 className="h-4 w-4 mr-1" /> Duyệt
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
