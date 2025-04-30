
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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
    <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col gap-6">
        {/* Header row */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">Lịch đăng bài</h1>
              <Badge variant="outline" className="bg-yellow-400 text-yellow-800 font-medium">Beta</Badge>
            </div>
            <p className="text-gray-500 mt-1">Quản lý tất cả bài đăng từ một nơi.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-700">1</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-500">2 Tài khoản mạng xã hội</span>
            </Badge>
            
            <Tabs 
              defaultValue={viewMode} 
              className="w-auto"
              onValueChange={(value) => setViewMode(value as any)}
            >
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="calendar"
                  className={`${viewMode === 'calendar' ? 'bg-red-500 text-white' : 'bg-transparent text-gray-600'} px-4 py-1.5`}
                >
                  Lịch
                </TabsTrigger>
                <TabsTrigger 
                  value="list"
                  className={`${viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-transparent text-gray-600'} px-4 py-1.5`}
                >
                  Danh sách
                </TabsTrigger>
                <TabsTrigger 
                  value="overview"
                  className={`${viewMode === 'overview' ? 'bg-red-500 text-white' : 'bg-transparent text-gray-600'} px-4 py-1.5`}
                >
                  Tổng quan
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Bottom row with action button and date navigation */}
        <div className="flex justify-between items-center">
          <Button 
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg shadow-sm"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            Thêm khung giờ
          </Button>
          
          {viewMode === 'calendar' && (
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden">
                <Button 
                  variant="ghost" 
                  onClick={goToPreviousWeek}
                  className="rounded-none border-r px-3 py-2 h-auto"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </Button>
                <span className="px-4 py-2 font-medium text-gray-700">
                  {formatDateRange()}
                </span>
                <Button 
                  variant="ghost" 
                  onClick={goToNextWeek}
                  className="rounded-none border-l px-3 py-2 h-auto"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
              
              <Tabs defaultValue="week" className="w-auto">
                <TabsList className="bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="day" className="bg-transparent text-gray-600 px-3 py-1">
                    Ngày
                  </TabsTrigger>
                  <TabsTrigger value="four-days" className="bg-transparent text-gray-600 px-3 py-1">
                    4 Ngày
                  </TabsTrigger>
                  <TabsTrigger value="week" className="bg-red-500 text-white px-3 py-1">
                    Tuần
                  </TabsTrigger>
                  <TabsTrigger value="month" className="bg-transparent text-gray-600 px-3 py-1">
                    Tháng
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
