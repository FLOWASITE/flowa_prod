
import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { Content } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from './PlatformIcon';

interface PostCardProps {
  content: Content;
  index: number;
  topicTitle?: string;
  isInGroup?: boolean; // New prop to indicate if this card is part of a group
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
  
  // Use content's topicTitle if available, fallback to passed topicTitle, then to content.text
  const displayTitle = content.topicTitle || topicTitle || content.text?.substring(0, 20) + '...';
  
  // Display platform name (replace 'twitter' with 'X')
  const displayPlatform = content.platform === 'twitter' ? 'X' : content.platform;
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  // Now using the same card style for all posts, whether in a group or not
  return (
    <div 
      key={index} 
      className={`mb-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow 
        ${isInGroup ? 'border-l-2' : 'border-l-4'} ${borderColor}`}
    >
      <div className="p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 shrink-0">
              <PlatformIcon platform={content.platform} size="small" />
            </div>
            <div className="text-xs font-medium truncate max-w-[120px]">
              {isInGroup ? displayPlatform : displayTitle}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {format(new Date(content.scheduledAt!), 'HH:mm')}
            </Badge>
            <button 
              onClick={handleEdit}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Edit size={14} />
            </button>
            <button 
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
