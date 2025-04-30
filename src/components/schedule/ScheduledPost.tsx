
import React from 'react';
import { format } from 'date-fns';
import { Info, Mail, Edit, Trash2 } from 'lucide-react';
import { Content } from '@/types/content';
import { PlatformIcon } from './PlatformIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScheduledPostProps {
  content: Content;
  onEdit?: () => void;
  topicTitle?: string;
}

export const ScheduledPost: React.FC<ScheduledPostProps> = ({ content, onEdit, topicTitle }) => {
  const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
  const date = content.scheduledAt ? format(new Date(content.scheduledAt), 'dd/MM') : '';
  
  return (
    <div 
      className="mb-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onEdit}
    >
      <div className="p-3 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            {/* Platform icon */}
            <PlatformIcon platform={content.platform} />
            
            {/* Time */}
            <span className="text-blue-600 font-medium">{time}</span>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2">
            <button 
              className="text-gray-500 hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit();
              }}
            >
              <span className="sr-only">Sửa</span>
              <Edit className="h-5 w-5" />
            </button>
            <button 
              className="text-gray-500 hover:bg-gray-100 p-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="sr-only">Xóa</span>
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Topic title instead of post content */}
        <div className="text-sm mb-2 line-clamp-2 font-medium">
          {topicTitle || content.text}
        </div>
        
        {/* Image indicator */}
        {content.imageUrl && (
          <div className="mb-1 flex items-center">
            <Mail className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500">Có hình ảnh</span>
          </div>
        )}
      </div>
    </div>
  );
};
