
import React from 'react';
import { format } from 'date-fns';
import { Mail, Info } from 'lucide-react';
import { Content } from '@/types/content';
import { PlatformIcon } from './PlatformIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScheduledPostProps {
  content: Content;
  onEdit?: () => void;
}

export const ScheduledPost: React.FC<ScheduledPostProps> = ({ content, onEdit }) => {
  const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
  
  return (
    <div className="mb-2 bg-white border rounded-md overflow-hidden shadow-sm">
      <div className="p-3 pb-0">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="mr-2 flex gap-1">
              <PlatformIcon platform={content.platform} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Info className="h-4 w-4 text-blue-500 cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nội dung không có chủ đề</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <span className="text-sm font-semibold text-blue-600">
                {time}
              </span>
            </div>
          </div>
          <div className="flex space-x-1">
            <button 
              className="text-gray-500 hover:bg-gray-100 p-1 rounded"
              onClick={onEdit}
            >
              <span className="sr-only">Sửa</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L18 9M13 20H21M5 16L14 7L17 10L8 19L4 20L5 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
              <span className="sr-only">Xóa</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="text-sm mb-2 line-clamp-2">{content.text}</div>
        {content.imageUrl && (
          <div className="mb-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-xs text-gray-500">Có hình ảnh</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
