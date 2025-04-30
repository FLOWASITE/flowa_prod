
export interface FileItem {
  id: string;
  platformId: string;
  name: string;
  fileType: string;
  content?: string;
  filePath?: string;
  fileSize?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  id: string;
  topicId: string;
  platformType: 'facebook' | 'instagram' | 'tiktok' | 'threads' | 'linkedin';
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileTopic {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
