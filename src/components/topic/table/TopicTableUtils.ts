
import { Topic } from '@/types';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

// Function to get product icon
export function getProductIcon(productId: string) {
  const productIcons = {
    '1': '🍎',
    '2': '💻',
    '3': '📱',
    '4': '🚗',
    '5': '👕',
  };
  
  return productIcons[productId as keyof typeof productIcons] || null;
}

// Function to generate content for a topic based on its properties
export function generateDraftContent(topic: Topic): { platform: string, text: string, imageUrl?: string }[] {
  const baseDescription = topic.description.substring(0, 100);
  
  // Generate content for each platform
  return [
    {
      platform: 'facebook',
      text: `${topic.title}\n\n${baseDescription}\n\n#NewContent #CheckItOut`,
      imageUrl: topic.productTypeId ? `https://placekitten.com/600/400?image=${Math.floor(Math.random() * 16) + 1}` : undefined
    },
    {
      platform: 'instagram',
      text: `${topic.title} 📢\n\n${baseDescription.substring(0, 80)}...\n\n#Instagram #ContentCreation #NewPost`,
      imageUrl: `https://placekitten.com/800/800?image=${Math.floor(Math.random() * 16) + 1}`
    },
    {
      platform: 'linkedin',
      text: `${topic.title}\n\nChúng tôi xin giới thiệu: ${baseDescription}\n\nXem thêm thông tin chi tiết trên website của chúng tôi.\n\n#ProfessionalContent #BusinessUpdate`,
      imageUrl: topic.themeTypeId === 'brand_story' ? `https://placekitten.com/900/600?image=${Math.floor(Math.random() * 16) + 1}` : undefined
    }
  ];
}

// Function to get platform icon component
export function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'facebook':
      return Facebook;
    case 'instagram':
      return Instagram;
    case 'linkedin':
      return Linkedin;
    default:
      return null;
  }
}

// Function to get the appropriate content image based on platform and topic
export function getContentImage(platform: string, topic: Topic): string {
  const baseUrl = 'https://placekitten.com';
  
  switch (platform) {
    case 'facebook':
      return `${baseUrl}/600/400?image=${(parseInt(topic.id) % 16) + 1}`;
    case 'instagram':
      return `${baseUrl}/800/800?image=${(parseInt(topic.id) % 16) + 2}`;
    case 'linkedin':
      return `${baseUrl}/900/600?image=${(parseInt(topic.id) % 16) + 3}`;
    default:
      return `${baseUrl}/500/500?image=${(parseInt(topic.id) % 16) + 4}`;
  }
}
