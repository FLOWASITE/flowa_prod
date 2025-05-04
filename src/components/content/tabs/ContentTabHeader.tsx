
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentTabHeaderProps {
  allCount: number;
  draftCount: number;
  approvedCount: number;
  scheduledCount: number;
  rejectedCount?: number; // New prop
  publishedCount?: number; // New prop
}

export const ContentTabHeader: React.FC<ContentTabHeaderProps> = ({ 
  allCount, 
  draftCount, 
  approvedCount, 
  scheduledCount,
  rejectedCount = 0,
  publishedCount = 0
}) => {
  return (
    <ScrollArea className="w-auto">
      <TabsList className="flex gap-1 px-2">
        <TabsTrigger value="all" className="py-2 relative">
          <span>Tất cả</span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">{allCount}</span>
        </TabsTrigger>
        <TabsTrigger value="draft" className="py-2 relative">
          <span>Chờ duyệt</span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-yellow-200 text-yellow-700">{draftCount}</span>
        </TabsTrigger>
        <TabsTrigger value="approved" className="py-2 relative">
          <span>Đã duyệt</span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-blue-200 text-blue-700">{approvedCount}</span>
        </TabsTrigger>
        <TabsTrigger value="scheduled" className="py-2 relative">
          <span>Đã lên lịch</span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-purple-200 text-purple-700">{scheduledCount}</span>
        </TabsTrigger>
        <TabsTrigger value="published" className="py-2 relative">
          <span>Đã đăng</span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-green-200 text-green-700">{publishedCount}</span>
        </TabsTrigger>
        <TabsTrigger value="rejected" className="py-2 relative">
          <span>Từ chối</span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-red-200 text-red-700">{rejectedCount}</span>
        </TabsTrigger>
      </TabsList>
    </ScrollArea>
  );
};
