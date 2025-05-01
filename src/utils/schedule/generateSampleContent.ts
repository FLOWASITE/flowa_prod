
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

// Generate multiple topics for the same time slot (NEW)
export const generateMultipleTopicsForTimeSlot = (date: Date, timeSlot: string): Content[] => {
  // Add multiple topics for Thursday (2nd May) at 14:00
  if (date.getDate() === 2 && date.getMonth() === 4 && timeSlot === "14:00") {
    return [
      // Topic 1: Product Launch
      {
        id: `sample-14-topic1-fb-${date}`,
        topicId: "sample-topic-multiple-1",
        topicTitle: "Ra mắt sản phẩm mới",
        platform: 'facebook',
        text: `Thông báo ra mắt sản phẩm mới trên Facebook`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(14, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: `sample-14-topic1-ig-${date}`,
        topicId: "sample-topic-multiple-1",
        topicTitle: "Ra mắt sản phẩm mới",
        platform: 'instagram',
        text: `Hình ảnh sản phẩm mới trên Instagram`,
        imageUrl: 'image.jpg',
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(14, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Topic 2: Promotion
      {
        id: `sample-14-topic2-fb-${date}`,
        topicId: "sample-topic-multiple-2",
        topicTitle: "Chương trình khuyến mãi tháng 5",
        platform: 'facebook',
        text: `Thông tin về chương trình khuyến mãi trên Facebook`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(14, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Topic 3: Industry News
      {
        id: `sample-14-topic3-li-${date}`,
        topicId: "sample-topic-multiple-3",
        topicTitle: "Xu hướng công nghệ mới",
        platform: 'linkedin',
        text: `Bài phân tích về xu hướng công nghệ trên LinkedIn`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(14, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
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
    const topicId = "sample-topic-4";
    const topicTitle = SAMPLE_TOPICS[3];
    
    return [
      {
        id: `sample-13-fb-${date}`,
        topicId: topicId,
        topicTitle: topicTitle,
        platform: 'facebook',
        text: `Nội dung facebook lúc 13:00 ngày 29/04`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(13, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: `sample-13-ig-${date}`,
        topicId: topicId,
        topicTitle: topicTitle,
        platform: 'instagram',
        text: `Nội dung instagram lúc 13:00 ngày 29/04`,
        imageUrl: 'image.jpg',
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(13, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
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
  
  if (timeSlot === '16:00') {
    const topicId = "sample-topic-6";
    const topicTitle = "Khóa học trực tuyến";
    
    return [
      {
        id: `sample-16-fb-${date}`,
        topicId: topicId,
        topicTitle: topicTitle,
        platform: 'facebook',
        text: `Khóa học trực tuyến Facebook - 16:00 ngày 01/05`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(16, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: `sample-16-li-${date}`,
        topicId: topicId,
        topicTitle: topicTitle,
        platform: 'linkedin',
        text: `Khóa học trực tuyến LinkedIn - 16:00 ngày 01/05`,
        status: 'scheduled',
        scheduledAt: new Date(date.setHours(16, 0, 0, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
  }
  
  return [];
};
