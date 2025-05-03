
import React from 'react';
import { Button } from "@/components/ui/button";
import { Content } from "@/types";

interface TableActionsProps {
  item: Content;
  onApprove: (content: Content) => void;
  onView: (content: Content) => void;
  onDelete: (contentId: string) => void;
  showApproveColumn: boolean;
}

export const TableActions: React.FC<TableActionsProps> = ({
  item,
  onApprove,
  onView,
  onDelete,
  showApproveColumn,
}) => {
  return (
    <div className="flex space-x-1">
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/60 dark:bg-gray-700/60 hover:bg-gray-100/90 hover:text-primary rounded-full transition-colors backdrop-blur-sm">
        <span className="sr-only">Chỉnh sửa</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
          <path d="m15 5 4 4"/>
        </svg>
      </Button>
      {item.status === 'draft' && showApproveColumn && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 bg-green-50/90 dark:bg-green-900/30 text-green-500 hover:bg-green-50/90 rounded-full transition-colors backdrop-blur-sm"
          onClick={() => onApprove(item)}
        >
          <span className="sr-only">Phê duyệt</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </Button>
      )}
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0 bg-blue-50/90 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-50/90 rounded-full transition-colors backdrop-blur-sm"
        onClick={() => onView(item)}
      >
        <span className="sr-only">Xem</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0 bg-red-50/90 dark:bg-red-900/30 text-red-500 hover:bg-red-50/90 rounded-full transition-colors backdrop-blur-sm"
        onClick={() => onDelete(item.id)}
      >
        <span className="sr-only">Xóa</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </Button>
    </div>
  );
};
