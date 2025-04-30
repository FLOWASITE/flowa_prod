
import React from 'react';
import { format } from 'date-fns';
import { Content } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

interface GridViewProps {
  scheduledContent: Content[];
}

export const GridView: React.FC<GridViewProps> = ({ scheduledContent }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {scheduledContent.map(content => (
        <Card key={content.id} className="overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge className={`
                ${content.platform === 'facebook' ? 'bg-blue-500' : ''}
                ${content.platform === 'instagram' ? 'bg-pink-500' : ''}
                ${content.platform === 'tiktok' ? 'bg-black' : ''}
                ${content.platform === 'threads' ? 'bg-purple-500' : ''}
                ${content.platform === 'linkedin' ? 'bg-blue-700' : ''}
              `}>
                {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Đã lên lịch
              </Badge>
            </div>
            <p className="line-clamp-3 text-sm mb-3">{content.text}</p>
            <div className="flex items-center text-gray-500 text-xs">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {content.scheduledAt ? 
                format(new Date(content.scheduledAt), 'dd/MM/yyyy HH:mm') : 
                'Chưa lên lịch'
              }
            </div>
          </div>
          <div className="border-t p-2 flex justify-end">
            <Button variant="ghost" size="sm">
              Sửa
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
