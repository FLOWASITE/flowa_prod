
import React from 'react';
import { Content } from '@/types/content';
import { MoreVertical, FileText, Image, Video, Circle, CircleDot, CircleCheck } from 'lucide-react';
import {
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from '@/components/schedule/PlatformIcon';

interface ListViewContentRowProps {
  content: Content;
  time: string;
  isFirstOfDay: boolean;
  isFirstOfTime: boolean;
  day: number;
  monthName: string;
  dayName: string;
  topicTitle: string;
  topicColor: string;
  hasImage: boolean;
  hasVideo: boolean;
}

export const ListViewContentRow: React.FC<ListViewContentRowProps> = ({
  content,
  time,
  isFirstOfDay,
  isFirstOfTime,
  day,
  monthName,
  dayName,
  topicTitle,
  topicColor,
  hasImage,
  hasVideo
}) => {
  const hasText = Boolean(content.text && content.text.trim().length > 0);
  
  // Define content status
  const isEmpty = !hasText && !hasImage && !hasVideo;
  const isPartial = (hasText && !hasImage && !hasVideo) || (!hasText && (hasImage || hasVideo));
  const isFull = hasText && (hasImage || hasVideo);
  
  // Select badge properties based on content status
  let statusBadgeText = "Trống";
  let statusBadgeClass = "bg-amber-50 text-amber-600 border-amber-200";
  let StatusIcon = Circle;

  if (isEmpty) {
    statusBadgeText = "Trống";
    statusBadgeClass = "bg-amber-50 text-amber-600 border-amber-200";
    StatusIcon = Circle;
  } else if (isPartial) {
    statusBadgeText = "Một phần";
    statusBadgeClass = "bg-blue-50 text-blue-600 border-blue-200";
    StatusIcon = CircleDot;  // Using CircleDot instead of CircleHalf
  } else if (isFull) {
    statusBadgeText = "Đầy đủ";
    statusBadgeClass = "bg-green-50 text-green-600 border-green-200";
    StatusIcon = CircleCheck;
  }
  
  return (
    <TableRow key={content.id} className="hover:bg-gray-50">
      {/* Date column */}
      {isFirstOfDay ? (
        <TableCell className="font-medium border-t">
          {day}
        </TableCell>
      ) : (
        <TableCell></TableCell>
      )}
      
      {/* Time column */}
      {isFirstOfTime ? (
        <TableCell className="text-gray-600">
          {isFirstOfDay ? `${monthName}, ${dayName}` : time}
        </TableCell>
      ) : (
        <TableCell></TableCell>
      )}
      
      {/* Category column */}
      <TableCell>
        <div className="flex items-center space-x-2">
          <span className={`w-3 h-3 rounded-full ${topicColor}`}></span>
          <span>{topicTitle}</span>
        </div>
      </TableCell>
      
      {/* Social accounts column - Only showing the icon */}
      <TableCell className="text-center">
        <div className="flex justify-center">
          <PlatformIcon platform={content.platform} size="small" />
        </div>
      </TableCell>
      
      {/* Content status column */}
      <TableCell>
        <div className="flex items-center space-x-1">
          <Badge variant="outline" className={`flex items-center gap-1 ${statusBadgeClass}`}>
            <StatusIcon className="h-3 w-3" />
            <span>{statusBadgeText}</span>
          </Badge>
        </div>
      </TableCell>
      
      {/* Content types column */}
      <TableCell>
        <div className="flex gap-1">
          {hasText && (
            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
              <FileText className="h-3 w-3 mr-1" />
              Văn bản
            </Badge>
          )}
          {hasImage && (
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              <Image className="h-3 w-3 mr-1" />
              Hình
            </Badge>
          )}
          {hasVideo && (
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
              <Video className="h-3 w-3 mr-1" />
              Video
            </Badge>
          )}
        </div>
      </TableCell>
      
      {/* Content column */}
      <TableCell>
        <div className="flex items-center">
          <p className="text-sm truncate max-w-md">
            {content.text ? `${content.text.substring(0, 50)}...` : "Chưa có nội dung"}
          </p>
        </div>
      </TableCell>
      
      {/* Actions column */}
      <TableCell>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
