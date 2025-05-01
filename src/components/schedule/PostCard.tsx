
import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, Image, Video } from 'lucide-react';
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
  const hasImage = Boolean(content.imageUrl);
  const hasVideo = content.text?.includes('video') || false; // Example condition, adjust based on your data model
  
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
      className={`mb-1 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow 
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
            
            {/* Content type indicators */}
            <div className="flex gap-1">
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
