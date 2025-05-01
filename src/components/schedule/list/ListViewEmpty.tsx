
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

export const ListViewEmpty: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
        Không có nội dung đã lên lịch cho giai đoạn này.
      </TableCell>
    </TableRow>
  );
};
