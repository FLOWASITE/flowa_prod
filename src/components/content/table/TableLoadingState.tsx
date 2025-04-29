
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

interface TableLoadingStateProps {
  colSpan: number;
}

export const TableLoadingState: React.FC<TableLoadingStateProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-8">
        <div className="flex justify-center items-center space-x-2">
          <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <span>Đang tải...</span>
        </div>
      </TableCell>
    </TableRow>
  );
};
