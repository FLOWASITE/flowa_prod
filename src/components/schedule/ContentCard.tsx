
import React from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, Image, Video, AlertCircle } from 'lucide-react';
import { Content } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PlatformIcon } from './PlatformIcon';

interface ContentCardProps {
  content: Content;
  topicTitle?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ 
  content, 
  topicTitle,
  onEdit,
  onDelete 
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
  const hasImage = Boolean(content.imageUrl);
  const hasVideo = Boolean(content.videoUrl) || content.text?.includes('video');
  const hasText = Boolean(content.text && content.text.trim().length > 0);
  const isEmpty = !hasText && !hasImage && !hasVideo;
  
  return (
    <Card className={`mb-2 overflow-hidden border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow`}>
      <CardContent className="p-3">
        {/* Header with platform, time and actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PlatformIcon platform={content.platform} />
            <span className="text-xs font-medium">{time}</span>
          </div>
          
          <div className="flex space-x-1">
            {onEdit && (
              <button 
                className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit size={16} />
              </button>
            )}
            {onDelete && (
              <button 
                className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        
        {/* Topic title or content */}
        <div className="text-sm mt-2 line-clamp-2 font-medium">
          {topicTitle || content.text || "Chưa có nội dung"}
        </div>
      </CardContent>
      
      {/* Media indicators */}
      <CardFooter className="px-3 py-1.5 bg-gray-50 flex gap-2">
        {isEmpty && (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 flex items-center gap-1 px-1.5 py-0.5 text-xs">
            <AlertCircle className="h-3 w-3" />
            <span>Chưa có nội dung</span>
          </Badge>
        )}
        {hasText && (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 px-1.5 py-0.5 text-xs">
            Text
          </Badge>
        )}
        {hasImage && (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1 px-1.5 py-0.5 text-xs">
            <Image className="h-3 w-3" />
            <span>Image</span>
          </Badge>
        )}
        {hasVideo && (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1 px-1.5 py-0.5 text-xs">
            <Video className="h-3 w-3" />
            <span>Video</span>
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
