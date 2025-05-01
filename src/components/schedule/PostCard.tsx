
import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, FileText, Image, Video, Circle, CircleDot, CircleCheck } from 'lucide-react';
import { Content } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from './PlatformIcon';

interface PostCardProps {
  content: Content;
  index: number;
  topicTitle?: string;
  isInGroup?: boolean; 
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  content, 
  index, 
  topicTitle,
  isInGroup = false,
  onEdit,
  onDelete 
}) => {
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
  
  // Choose status indicator and background color
  let StatusIcon = Circle;
  let statusColor = "text-amber-500"; // Empty (default)
  let bgColor = "bg-white";

  if (isEmpty) {
    StatusIcon = Circle;
    statusColor = "text-amber-500";
    bgColor = "bg-amber-50";
  } else if (isPartial) {
    StatusIcon = CircleDot;  // Using CircleDot instead of CircleHalf
    statusColor = "text-blue-500";
    bgColor = "bg-blue-50";
  } else if (isFull) {
    StatusIcon = CircleCheck;
    statusColor = "text-green-500";
    bgColor = "bg-green-50";
  }
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  // Title to display - showing only topic title, not platform name
  const displayTitle = isInGroup ? "" : (topicTitle || content.text?.substring(0, 20) + '...');

  return (
    <div 
      key={index} 
      className={`mb-1 ${bgColor} border rounded-md shadow-sm hover:shadow-md transition-shadow 
        ${isInGroup ? 'border-l-2' : 'border-l-4'} ${borderColor}`}
    >
      <div className="p-1.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 shrink-0">
              <PlatformIcon platform={content.platform} size="small" />
            </div>
            {displayTitle && (
              <div className="text-xs font-medium truncate max-w-[100px]">
                {displayTitle}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-xs py-0 h-5">
              {format(new Date(content.scheduledAt!), 'HH:mm')}
            </Badge>
            
            {/* Status indicator */}
            <StatusIcon className={`h-3.5 w-3.5 ${statusColor}`} />
            
            {/* Content type indicators */}
            <div className="flex gap-1">
              {hasText && <FileText className="h-3 w-3 text-gray-500" />}
              {hasImage && <Image className="h-3 w-3 text-blue-500" />}
              {hasVideo && <Video className="h-3 w-3 text-red-500" />}
            </div>
            
            {/* Action buttons */}
            <button 
              onClick={handleEdit}
              className="p-0.5 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Edit size={12} />
            </button>
            <button 
              onClick={handleDelete}
              className="p-0.5 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
