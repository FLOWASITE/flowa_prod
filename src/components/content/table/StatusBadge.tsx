
import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'draft':
      return <div className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">Chờ duyệt</div>;
    case 'approved':
      return <div className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Đã duyệt</div>;
    case 'scheduled':
      return <div className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md">Đã lên lịch</div>;
    case 'published':
      return <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">Đã đăng</div>;
    case 'rejected':
      return <div className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">Từ chối</div>;
    default:
      return null;
  }
};
