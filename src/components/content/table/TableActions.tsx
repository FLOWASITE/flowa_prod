
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Check, Trash2, Eye, Pencil } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TableActionsProps {
  onApprove?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
  showApprove?: boolean;
}

export const TableActions: React.FC<TableActionsProps> = ({ 
  onApprove, 
  onDelete, 
  onView,
  onEdit,
  showApprove = true
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {showApprove && onApprove && (
          <DropdownMenuItem 
            onClick={onApprove}
            className="cursor-pointer flex items-center"
          >
            <Check className="mr-2 h-4 w-4" /> Duyệt
          </DropdownMenuItem>
        )}
        
        {onEdit && (
          <DropdownMenuItem 
            onClick={onEdit}
            className="cursor-pointer flex items-center"
          >
            <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
          </DropdownMenuItem>
        )}

        {onView && (
          <DropdownMenuItem 
            onClick={onView}
            className="cursor-pointer flex items-center"
          >
            <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
          </DropdownMenuItem>
        )}
        
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onDelete}
              className="cursor-pointer flex items-center text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Xóa
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
