
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { Content } from '@/types/content';
import { MoreVertical, Image, Video } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTopicsFetch } from '@/hooks/useTopicsFetch';
import { PlatformIcon } from '@/components/schedule/PlatformIcon';

interface ListViewProps {
  scheduledContent: Content[];
  weekStartDate: Date;
  weekEndDate: Date;
  getScheduledContent: (date: Date, timeSlot: string) => Content[];
  timeSlots: string[];
}

// Helper function to get day of month and day name from date
const formatDayInfo = (date: Date) => {
  const day = date.getDate();
  const dayName = format(date, 'EEE').toUpperCase();
  return { day, dayName };
};

export const ListView: React.FC<ListViewProps> = ({ 
  weekStartDate,
  weekEndDate,
  getScheduledContent,
  timeSlots
}) => {
  const { topics } = useTopicsFetch(true);
  
  // Generate the content data for the week using the same data source as CalendarView
  const allContent: Content[] = [];
  
  // Loop through each day of the week
  let currentDate = new Date(weekStartDate);
  while (currentDate <= weekEndDate) {
    // Loop through each time slot
    timeSlots.forEach(timeSlot => {
      const contentForSlot = getScheduledContent(new Date(currentDate), timeSlot);
      if (contentForSlot.length > 0) {
        allContent.push(...contentForSlot);
      }
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Sort content by date and time
  const sortedContent = [...allContent].sort((a, b) => {
    if (!a.scheduledAt || !b.scheduledAt) return 0;
    return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
  });
  
  // Group content by day
  const contentByDay = sortedContent.reduce((acc, content) => {
    if (!content.scheduledAt) return acc;
    
    const date = new Date(content.scheduledAt);
    const dayKey = format(date, 'yyyy-MM-dd');
    
    if (!acc[dayKey]) {
      acc[dayKey] = {
        date,
        content: []
      };
    }
    
    acc[dayKey].content.push(content);
    return acc;
  }, {} as Record<string, { date: Date; content: Content[] }>);
  
  // Topic circle color map
  const topicColorMap: Record<string, string> = {
    "Ra mắt sản phẩm mới": "bg-purple-500",
    "Industry News": "bg-red-500",
    "Chương trình khuyến mãi tháng 5": "bg-green-500",
    "Xu hướng công nghệ mới": "bg-blue-500",
    "Infographics": "bg-red-800",
    "Client Testimonials": "bg-blue-500",
    "Interactive Polls": "bg-blue-600",
    "Chiến dịch quảng cáo mùa hè": "bg-yellow-500"
  };
  
  // Get topic title helper
  const getTopicTitle = (content: Content): string => {
    // If content has a topic title directly, use it
    if (content.topicTitle) return content.topicTitle;
    
    // Otherwise find the topic by ID
    const topic = topics.find(t => t.id === content.topicId);
    return topic?.title || "Unknown Topic";
  };
  
  // Get color for topic
  const getTopicColor = (content: Content): string => {
    const topicTitle = getTopicTitle(content);
    return topicColorMap[topicTitle] || "bg-gray-500";
  };

  return (
    <div className="rounded-md overflow-hidden border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-16">Ngày</TableHead>
            <TableHead className="w-24">Thời gian</TableHead>
            <TableHead className="w-48">Chủ đề</TableHead>
            <TableHead className="w-16">Mạng XH</TableHead>
            <TableHead className="w-20">Loại</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(contentByDay).map(({ date, content: dayContent }) => {
            const { day, dayName } = formatDayInfo(date);
            const monthName = format(date, 'MMM').toUpperCase();
            
            return dayContent.map((content, contentIdx) => {
              const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
              const topicTitle = getTopicTitle(content);
              const topicColor = getTopicColor(content);
              
              // Check if this is the first item of its time slot
              const isFirstOfTime = contentIdx === 0 || 
                time !== format(new Date(dayContent[contentIdx - 1].scheduledAt!), 'HH:mm');
              
              // Check if this is the first item of the day
              const isFirstOfDay = contentIdx === 0 || 
                !isSameDay(new Date(content.scheduledAt!), new Date(dayContent[contentIdx - 1].scheduledAt!));
              
              // Check if content has image or video
              const hasImage = content.imageUrl ? true : false;
              const hasVideo = content.text?.includes('video') || false; // Simple example, adjust based on your actual data
              
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
                  
                  {/* Social accounts column - Now just showing the icon */}
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
            });
          })}
          
          {Object.keys(contentByDay).length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Không có nội dung đã lên lịch cho giai đoạn này.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
