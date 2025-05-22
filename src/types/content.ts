export interface Topic {
  id: string;
  brandId: string;
  themeTypeId: string;
  productTypeId?: string;
  title: string;
  description: string;
  status: 'draft' | 'approved' | 'rejected'; // Updated to only include the three status types
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  // Optional fields for pending topics / more details
  tone_of_voice?: string;
  target_audience?: string;
  keywords?: string[];
  content_goals?: string[];
  notes?: string;
  prompt?: string; 
}

export interface Content {
  id: string;
  topicId: string;
  topicTitle?: string; // Added field from database update
  platform: 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin' | 'twitter' | 'youtube';
  text: string;
  imageUrl?: string;
  videoUrl?: string; // Added field from database update
  videoThumbnail?: string; // Added field from database update
  status: 'draft' | 'approved' | 'rejected' | 'scheduled' | 'published' | 'generating' | 'completed';
  scheduledAt?: Date;
  publishedAt?: Date;
  approvedAt?: Date;
  // Engagement metrics
  engagementLikes?: number;
  engagementComments?: number;
  engagementShares?: number;
  createdAt: Date;
  updatedAt: Date;
}
