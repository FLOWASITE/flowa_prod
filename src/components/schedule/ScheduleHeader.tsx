
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ScheduleHeaderProps {
  viewMode: 'calendar' | 'list' | 'grid' | 'overview';
  setViewMode: (mode: 'calendar' | 'list' | 'grid' | 'overview') => void;
  weekStartDate: Date;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  formatDateRange: () => string;
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  viewMode,
  setViewMode,
  weekStartDate,
  goToPreviousWeek,
  goToNextWeek,
  formatDateRange
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Lịch đăng bài</h1>
          </div>
          <p className="text-muted-foreground">Quản lý tất cả bài đăng từ một nơi.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gray-100 px-3 py-1">
            <span className="font-medium">1</span> / 2 Tài khoản mạng xã hội
          </Badge>
          
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('calendar')}
              className={`rounded-none ${viewMode === 'calendar' ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
            >
              Lịch
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('list')}
              className={`rounded-none ${viewMode === 'list' ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
            >
              Danh sách
            </Button>
            <Button 
              variant={viewMode === 'overview' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('overview')}
              className={`rounded-none ${viewMode === 'overview' ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
            >
              Tổng quan
            </Button>
          </div>
        </div>
      </div>
      
      {/* Add time slot button and date navigation */}
      <div className="mt-6 flex justify-between items-center">
        <Button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md">
          <Plus className="h-4 w-4" />
          Thêm khung giờ
        </Button>
        
        {viewMode === 'calendar' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={goToPreviousWeek}
                className="rounded-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="mx-2 font-medium">
                {formatDateRange()}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={goToNextWeek}
                className="rounded-md"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex border rounded-md overflow-hidden">
              <Button variant="ghost" size="sm" className="rounded-none">
                Ngày
              </Button>
              <Button variant="ghost" size="sm" className="rounded-none">
                4 Ngày
              </Button>
              <Button variant="default" size="sm" className="rounded-none bg-red-500 text-white hover:bg-red-600">
                Tuần
              </Button>
              <Button variant="ghost" size="sm" className="rounded-none">
                Tháng
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
