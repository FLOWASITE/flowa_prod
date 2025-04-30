
import { Content } from '@/types/content';
import { isSameDay } from 'date-fns';
import { SAMPLE_TOPICS } from './constants';

// Generate sample post for single platform
export const generateSamplePost = (
  date: Date, 
  hours: number, 
  platform: Content['platform'], 
  topicId: string, 
  topicTitle: string
): Content => {
  return {
    id: `sample-${hours}-${platform}-${date}`,
    topicId,
    topicTitle,
    platform,
    text: `Bài đăng ${platform} cho ${topicTitle}`,
    status: 'scheduled',
    scheduledAt: new Date(new Date(date).setHours(hours, 0, 0, 0)),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// Generate multiple posts for the same topic across platforms
export const generateSharedTopicPosts = (date: Date): Content[] => {
  if (date.getDate() === 30 && date.getMonth() === 3) {
    const sharedTopicTitle = "Chiến dịch quảng cáo mùa hè";
    const topicId = "sample-topic-shared";
    const hours = 15;
    
    return [
      generateSamplePost(date, hours, 'facebook', topicId, sharedTopicTitle),
      generateSamplePost(date, hours, 'instagram', topicId, sharedTopicTitle),
      generateSamplePost(date, hours, 'tiktok', topicId, sharedTopicTitle),
      generateSamplePost(date, hours, 'linkedin', topicId, sharedTopicTitle),
      generateSamplePost(date, hours, 'twitter', topicId, sharedTopicTitle)
    ];
  }
  return [];
};

// Generate Wednesday (30th April) samples
export const generateWednesdaySamples = (date: Date, timeSlot: string): Content[] => {
  if (date.getDate() !== 30 || date.getMonth() !== 3) return [];
  
  const [hours] = timeSlot.split(':').map(Number);
  
  if (timeSlot === '09:00') {
    return [{
      id: `sample-09-${date}`,
      topicId: "sample-topic-1",
      topicTitle: SAMPLE_TOPICS[0],
      platform: 'instagram',
      text: `Bài đăng mẫu cho 09:00 ngày 30/04`,
      status: 'scheduled',
      scheduledAt: new Date(date.setHours(9, 0, 0, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
  }
  
  if (timeSlot === '10:00') {
    return [{
      id: `sample-10-${date}`,
      topicId: "sample-topic-2",
      topicTitle: SAMPLE_TOPICS[1],
      platform: 'facebook',
      text: `Bài đăng mẫu cho 10:00 ngày 30/04`,
      status: 'scheduled',
      scheduledAt: new Date(date.setHours(10, 0, 0, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
  }
  
  if (timeSlot === '11:00') {
    return [{
      id: `sample-11-${date}`,
      topicId: "sample-topic-3",
      topicTitle: SAMPLE_TOPICS[2],
      platform: 'instagram',
      text: `Bài đăng mẫu cho 11:00 ngày 30/04`,
      status: 'scheduled',
      scheduledAt: new Date(date.setHours(11, 0, 0, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
  }
  
  return [];
};

// Generate Tuesday (29th April) samples
export const generateTuesdaySamples = (date: Date, timeSlot: string): Content[] => {
  if (date.getDate() !== 29 || date.getMonth() !== 3) return [];
  
  if (timeSlot === '13:00') {
    return [{
      id: `sample-13-${date}`,
      topicId: "sample-topic-4",
      topicTitle: SAMPLE_TOPICS[3],
      platform: 'facebook',
      text: `Nội dung facebook lúc 13:00 ngày 29/04`,
      status: 'scheduled',
      scheduledAt: new Date(date.setHours(13, 0, 0, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
  }
  
  return [];
};

// Generate Friday (1st May) samples
export const generateFridaySamples = (date: Date, timeSlot: string): Content[] => {
  if (date.getDate() !== 1 || date.getMonth() !== 4) return [];
  
  if (timeSlot === '13:00') {
    return [{
      id: `sample-13-${date}`,
      topicId: "sample-topic-5",
      topicTitle: SAMPLE_TOPICS[4],
      platform: 'linkedin',
      text: `Nội dung linkedin lúc 13:00 ngày 01/05`,
      imageUrl: 'image.jpg',
      status: 'scheduled',
      scheduledAt: new Date(date.setHours(13, 0, 0, 0)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
  }
  
  return [];
};
