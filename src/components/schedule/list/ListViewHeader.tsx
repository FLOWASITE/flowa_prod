
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const ListViewHeader: React.FC = () => {
  return (
    <TableHeader className="bg-gray-100">
      <TableRow>
        <TableHead className="w-16">Ngày</TableHead>
        <TableHead className="w-24">Thời gian</TableHead>
        <TableHead className="w-48">Chủ đề</TableHead>
        <TableHead className="w-16">Mạng XH</TableHead>
        <TableHead className="w-20">Loại</TableHead>
        <TableHead>Nội dung</TableHead>
        <TableHead className="w-12"></TableHead>
      </TableRow>
    </TableHeader>
  );
};
