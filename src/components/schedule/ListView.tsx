import React from 'react';
import { format } from 'date-fns';
import { Content } from '@/types/content';
import { MoreVertical } from 'lucide-react';
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

interface ListViewProps {
  scheduledContent: Content[];
  weekStartDate?: Date;
  weekEndDate?: Date;
}

// Helper function to get day of month and day name from date
const formatDayInfo = (date: Date) => {
  const day = date.getDate();
  const dayName = format(date, 'EEE').toUpperCase();
  return { day, dayName };
};

export const ListView: React.FC<ListViewProps> = ({ 
  scheduledContent,
  weekStartDate = new Date(),
  weekEndDate
}) => {
  const { topics } = useTopicsFetch(true);
  
  // Sort content by date and time
  const sortedContent = [...scheduledContent].sort((a, b) => {
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
    "Industry News": "bg-red-500",
    "Infographics": "bg-red-800",
    "Client Testimonials": "bg-blue-500",
    "Interactive Polls": "bg-blue-600"
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
            <TableHead className="w-16">Date</TableHead>
            <TableHead className="w-24">Time</TableHead>
            <TableHead className="w-48">Category</TableHead>
            <TableHead className="w-32">Social accounts</TableHead>
            <TableHead className="w-32">Post type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(contentByDay).map(({ date, content: dayContent }) => {
            const { day, dayName } = formatDayInfo(date);
            const dayFormatted = `MAY, ${dayName}`;
            
            return dayContent.map((content, contentIdx) => {
              const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
              const topicTitle = getTopicTitle(content);
              const topicColor = getTopicColor(content);
              
              return (
                <TableRow key={content.id} className="border-t hover:bg-gray-50">
                  {contentIdx === 0 || time !== format(new Date(dayContent[contentIdx - 1].scheduledAt!), 'HH:mm') ? (
                    <>
                      {/* Only show date on first item of the day or if time changes */}
                      <TableCell className={`${contentIdx > 0 ? 'border-t' : ''}`}>
                        <div className="font-medium">{day}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-600">{dayFormatted}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${topicColor}`}></span>
                          <span>{topicTitle}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {/* Social accounts would go here */}
                      </TableCell>
                      <TableCell>
                        {/* Post type would go here */}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                            No post found
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      {/* For same time items, leave date and time empty */}
                      <TableCell className="border-t"></TableCell>
                      <TableCell className="text-gray-600">{time}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${topicColor}`}></span>
                          <span>{topicTitle}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {/* Social accounts would go here */}
                      </TableCell>
                      <TableCell>
                        {/* Post type would go here */}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
                            No post found
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            });
          })}
          
          {Object.keys(contentByDay).length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No scheduled content found for this period.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
