import { Content } from '@/types/content';

// Get day names in Vietnamese
export const getDayName = (date: Date) => {
  const dayMap: Record<number, string> = {
    0: "Chủ Nhật",
    1: "Thứ Hai",
    2: "Thứ Ba", 
    3: "Thứ Tư",
    4: "Thứ Năm",
    5: "Thứ Sáu",
    6: "Thứ Bảy"
  };
  return dayMap[date.getDay()];
};

// Check if a date is today
export const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

// Get topic title by topic ID or use the directly attached topic title
export const getTopicTitle = (content: Content, topics: any[]) => {
  // First check if the content has a topicTitle field directly
  if (content.topicTitle) {
    return content.topicTitle;
  }
  
  // Otherwise try to find the topic in the topics list
  const topic = topics.find(t => t.id === content.topicId);
  if (topic) {
    return topic.title;
  } else {
    return "Không có chủ đề";
  }
};
