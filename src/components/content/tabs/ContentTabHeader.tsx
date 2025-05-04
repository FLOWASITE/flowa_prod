
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContentTabHeaderProps {
  allCount: number;
  draftCount: number;
  approvedCount: number;
  scheduledCount: number;
}

export const ContentTabHeader: React.FC<ContentTabHeaderProps> = ({
  allCount,
  draftCount,
  approvedCount,
  scheduledCount
}) => {
  return (
    <TabsList>
      <TabsTrigger value="all" className="relative">
        Tất cả
        <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
          {allCount}
        </span>
      </TabsTrigger>
      <TabsTrigger value="draft" className="relative">
        Nháp
        <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full">
          {draftCount}
        </span>
      </TabsTrigger>
      <TabsTrigger value="approved" className="relative">
        Đã duyệt
        <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full">
          {approvedCount}
        </span>
      </TabsTrigger>
      <TabsTrigger value="scheduled" className="relative">
        Lên lịch
        <span className="ml-2 inline-flex items-center justify-center absolute -top-1 -right-1 px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full">
          {scheduledCount}
        </span>
      </TabsTrigger>
    </TabsList>
  );
};
