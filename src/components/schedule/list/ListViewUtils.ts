import { Content } from '@/types/content';
import { format } from 'date-fns';
import { Topic } from '@/types';

// Sort and group content by day
export const groupContentByDay = (allContent: Content[]) => {
  // Sort content by date and time
  const sortedContent = [...allContent].sort((a, b) => {
    if (!a.scheduledAt || !b.scheduledAt) return 0;
    return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
  });
  
  // Group content by day
  return sortedContent.reduce((acc, content) => {
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
};

// Topic circle color map
export const topicColorMap: Record<string, string> = {
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
export const getTopicTitle = (content: Content, topics: Topic[]): string => {
  // If content has a topic title directly, use it
  if (content.topicTitle) return content.topicTitle;
  
  // Otherwise find the topic by ID
  const topic = topics.find(t => t.id === content.topicId);
  return topic?.title || "Unknown Topic";
};

// Get color for topic
export const getTopicColor = (content: Content, topics: Topic[], colorMap: Record<string, string>): string => {
  const topicTitle = getTopicTitle(content, topics);
  return colorMap[topicTitle] || "bg-gray-500";
};
