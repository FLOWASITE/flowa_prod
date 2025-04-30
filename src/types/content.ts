
export interface Topic {
  id: string;
  brandId: string;
  themeTypeId: string;
  productTypeId?: string;
  title: string;
  description: string;
  status: 'draft' | 'approved' | 'rejected' | 'generating' | 'completed';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  id: string;
  topicId: string;
  topicTitle?: string; // Added to store topic title directly
  platform: 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin' | 'twitter' | 'youtube';
  text: string;
  imageUrl?: string;
  status: 'draft' | 'approved' | 'rejected' | 'scheduled' | 'published';
  scheduledAt?: Date;
  publishedAt?: Date;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
