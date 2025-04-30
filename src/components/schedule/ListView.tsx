
import React from 'react';
import { format } from 'date-fns';
import { Content } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';

interface ListViewProps {
  scheduledContent: Content[];
}

export const ListView: React.FC<ListViewProps> = ({ scheduledContent }) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left font-medium text-gray-500">Nội dung</th>
            <th className="p-3 text-left font-medium text-gray-500">Nền tảng</th>
            <th className="p-3 text-left font-medium text-gray-500">Ngày đăng</th>
            <th className="p-3 text-left font-medium text-gray-500">Trạng thái</th>
            <th className="p-3 text-left font-medium text-gray-500"></th>
          </tr>
        </thead>
        <tbody>
          {scheduledContent.map(content => (
            <tr key={content.id} className="border-t">
              <td className="p-3 max-w-xs">
                <p className="line-clamp-2">{content.text}</p>
              </td>
              <td className="p-3">
                <Badge className={`
                  ${content.platform === 'facebook' ? 'bg-blue-500' : ''}
                  ${content.platform === 'instagram' ? 'bg-pink-500' : ''}
                  ${content.platform === 'tiktok' ? 'bg-black' : ''}
                  ${content.platform === 'threads' ? 'bg-purple-500' : ''}
                  ${content.platform === 'linkedin' ? 'bg-blue-700' : ''}
                `}>
                  {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
                </Badge>
              </td>
              <td className="p-3">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {content.scheduledAt ? (
                    format(new Date(content.scheduledAt), 'dd/MM/yyyy HH:mm')
                  ) : (
                    'Chưa lên lịch'
                  )}
                </div>
              </td>
              <td className="p-3">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Đã lên lịch
                </Badge>
              </td>
              <td className="p-3">
                <Button variant="ghost" size="sm">Sửa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
