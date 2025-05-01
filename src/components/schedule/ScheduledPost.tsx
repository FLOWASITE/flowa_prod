
import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, FileText, Image, Video, Circle, CircleHalf, CircleCheck } from 'lucide-react';
import { Content } from '@/types/content';
import { PlatformIcon } from './PlatformIcon';
import { Badge } from '@/components/ui/badge';

interface ScheduledPostProps {
  content: Content;
  onEdit?: () => void;
  onDelete?: () => void;
  topicTitle?: string;
}

export const ScheduledPost: React.FC<ScheduledPostProps> = ({ 
  content, 
  onEdit,
  onDelete,
  topicTitle 
}) => {
  const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
  
  const borderColors = {
    'facebook': 'border-[#1877F2]',
    'instagram': 'border-[#DD2A7B]',
    'tiktok': 'border-black',
    'threads': 'border-black',
    'linkedin': 'border-[#0A66C2]',
    'twitter': 'border-black',
    'youtube': 'border-[#FF0000]',
  };
  
  const borderColor = borderColors[content.platform as keyof typeof borderColors] || 'border-gray-300';
  
  // Determine content types
  const hasText = Boolean(content.text && content.text.trim().length > 0);
  const hasImage = Boolean(content.imageUrl);
  const hasVideo = Boolean(content.videoUrl) || content.text?.includes('video');
  
  // Define content status
  const isEmpty = !hasText && !hasImage && !hasVideo;
  const isPartial = (hasText && !hasImage && !hasVideo) || (!hasText && (hasImage || hasVideo));
  const isFull = hasText && (hasImage || hasVideo);
  
  // Choose status color and badge text
  let statusBadgeText = "Chưa có nội dung";
  let statusBadgeClass = "bg-amber-50 text-amber-600 border-amber-200";
  let StatusIcon = Circle;
  let bgColor = "bg-white";

  if (isEmpty) {
    statusBadgeText = "Chưa có nội dung";
    statusBadgeClass = "bg-amber-50 text-amber-600 border-amber-200";
    StatusIcon = Circle;
    bgColor = "bg-amber-50";
  } else if (isPartial) {
    statusBadgeText = "Đã có một phần nội dung";
    statusBadgeClass = "bg-blue-50 text-blue-600 border-blue-200";
    StatusIcon = CircleHalf;
    bgColor = "bg-blue-50";
  } else if (isFull) {
    statusBadgeText = "Đã có đầy đủ nội dung";
    statusBadgeClass = "bg-green-50 text-green-600 border-green-200";
    StatusIcon = CircleCheck;
    bgColor = "bg-green-50";
  }
  
  return (
    <div 
      className={`mb-2 ${bgColor} border rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 ${borderColor}`}
      onClick={() => onEdit && onEdit()}
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PlatformIcon platform={content.platform} />
            <span className="text-xs font-medium">{time}</span>
          </div>
          
          <div className="flex space-x-1">
            <button 
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit();
              }}
            >
              <Edit size={16} />
            </button>
            <button 
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Topic title instead of post content */}
        <div className="text-sm mt-2 line-clamp-2 font-medium">
          {topicTitle || content.text || "Chưa có nội dung"}
        </div>
        
        {/* Status badge */}
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline" className={`flex items-center gap-1 text-xs ${statusBadgeClass}`}>
            <StatusIcon className="h-3 w-3" />
            <span>{statusBadgeText}</span>
          </Badge>
          
          {/* Content type indicators */}
          <div className="flex gap-1">
            {hasText && (
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1 text-xs">
                <FileText className="h-3 w-3" />
                <span>Văn bản</span>
              </Badge>
            )}
            {hasImage && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1 text-xs">
                <Image className="h-3 w-3" />
                <span>Ảnh</span>
              </Badge>
            )}
            {hasVideo && (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1 text-xs">
                <Video className="h-3 w-3" />
                <span>Video</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
