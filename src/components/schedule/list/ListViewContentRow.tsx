
import React from 'react';
import { Content } from '@/types/content';
import { MoreVertical, Image, Video } from 'lucide-react';
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
      
      {/* Post type column - Now with icons */}
      <TableCell>
        <div className="flex items-center space-x-1">
          {hasImage && (
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1">
              <Image className="h-3 w-3" />
              <span>Hình</span>
            </Badge>
          )}
          {hasVideo && (
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1">
              <Video className="h-3 w-3" />
              <span>Video</span>
            </Badge>
          )}
          {!hasImage && !hasVideo && (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              Văn bản
            </Badge>
          )}
        </div>
      </TableCell>
      
      {/* Content column */}
      <TableCell>
        <div className="flex items-center">
          <p className="text-sm truncate max-w-md">{content.text?.substring(0, 50)}...</p>
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
