
import React from 'react';
import { format } from 'date-fns';
import { Content } from '@/types/content';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  content: Content;
  index: number;
}

export const PostCard: React.FC<PostCardProps> = ({ content, index }) => {
  const borderColors = {
    'facebook': 'border-blue-500',
    'instagram': 'border-pink-500',
    'tiktok': 'border-black',
    'threads': 'border-purple-500',
    'linkedin': 'border-blue-700',
  };
  
  const borderColor = borderColors[content.platform as keyof typeof borderColors] || 'border-gray-300';
  
  return (
    <div 
      key={index} 
      className={`p-2 mb-1 rounded-md border-l-4 ${borderColor} bg-white hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start">
        <div className="text-xs font-medium">{content.text?.substring(0, 20)}...</div>
        <Badge variant="outline" className="text-xs">
          {format(new Date(content.scheduledAt!), 'HH:mm')}
        </Badge>
      </div>
    </div>
  );
};
