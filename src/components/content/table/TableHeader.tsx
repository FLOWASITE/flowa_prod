
import React from 'react';
import { TableHeader as UITableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface TableHeaderProps {
  showBatchSelection: boolean;
  showApprovalColumns: boolean;
  allSelected: boolean;
  onSelectAllChange: (checked: boolean) => void;
  hasItems: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  showBatchSelection,
  showApprovalColumns,
  allSelected,
  onSelectAllChange,
  hasItems
}) => {
  return (
    <UITableHeader className="sticky top-0 z-10">
      <TableRow className="bg-gradient-to-r from-primary to-accent border-none">
        {showBatchSelection && (
          <TableHead className="w-10 text-center text-white font-bold py-4">
            <Checkbox 
              className="bg-white/20 border-white/50"
              onCheckedChange={onSelectAllChange}
              checked={hasItems && allSelected}
            />
          </TableHead>
        )}
        <TableHead className="w-10 text-center text-white font-bold py-4">#</TableHead>
        <TableHead className="w-[120%] text-white font-bold py-4">Chủ đề gốc</TableHead>
        <TableHead className="w-16 text-center text-white font-bold py-4">Nền tảng</TableHead>
        <TableHead className="max-w-[10%] text-white font-bold py-4">Nội dung (Preview)</TableHead>
        <TableHead className="w-28 text-white font-bold py-4">Hình ảnh</TableHead>
        <TableHead className="w-28 text-white font-bold py-4">Ngày tạo</TableHead>
        {showApprovalColumns && (
          <>
            <TableHead className="w-28 text-white font-bold py-4">Người duyệt</TableHead>
            <TableHead className="w-28 text-white font-bold py-4">Ngày duyệt</TableHead>
          </>
        )}
        <TableHead className="w-28 text-white font-bold py-4">Trạng thái</TableHead>
        <TableHead className="w-28 text-white font-bold py-4">Hành động</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
