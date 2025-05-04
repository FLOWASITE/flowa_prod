
import React from 'react';
import { CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Content } from '@/types';

interface ContentCardHeaderProps {
  content: Content;
  platformIcons: Record<string, React.ReactNode>;
}

export const ContentCardHeader: React.FC<ContentCardHeaderProps> = ({ content, platformIcons }) => {
  const getPlatformIcon = (platform: string) => {
    return platformIcons[platform as keyof typeof platformIcons] || null;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Bản nháp</Badge>;
      case 'approved':
        return <Badge variant="secondary">Đã duyệt</Badge>;
      case 'scheduled':
        return <Badge variant="default">Đã lên lịch</Badge>;
      case 'published':
        return <Badge className="bg-green-500 text-white">Đã đăng</Badge>;
      default:
        return null;
    }
  };

  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {getPlatformIcon(content.platform)}
          <span className="font-medium capitalize">{content.platform}</span>
        </div>
        {getStatusBadge(content.status)}
      </div>
    </CardHeader>
  );
};
