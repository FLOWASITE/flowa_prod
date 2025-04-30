
import React from 'react';
import { format } from 'date-fns';
import { Content } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from './PlatformIcon';

interface PostCardProps {
  content: Content;
  index: number;
  topicTitle?: string;
  isInGroup?: boolean; // New prop to indicate if this card is part of a group
}

export const PostCard: React.FC<PostCardProps> = ({ 
  content, 
  index, 
  topicTitle,
  isInGroup = false 
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
  
  // Even more compact when part of a group
  return (
    <div 
      key={index} 
      className={`p-2 mb-1 rounded-md border-l-4 ${borderColor} bg-white hover:shadow-md transition-shadow ${isInGroup ? 'border-l-2 py-1' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 shrink-0">
            <PlatformIcon platform={content.platform} size="small" />
          </div>
          <div className={`text-xs font-medium truncate ${isInGroup ? 'max-w-[100px]' : 'max-w-[120px]'}`}>
            {isInGroup ? content.platform : displayTitle}
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {format(new Date(content.scheduledAt!), 'HH:mm')}
        </Badge>
      </div>
    </div>
  );
};
