
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { mockContents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Grid, List, Plus, LayoutGrid, Mail, AlertCircle, Info } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, parse, getDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Content } from '@/types/content';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Schedule = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'grid' | 'overview'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  
  // Create an array of dates for the current week
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
  
  // Time slots from 9:00 to 18:00
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 9;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
  const scheduledContent = mockContents.filter(
    content => content.status === 'scheduled' && content.scheduledAt
  );
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newStartDate = addDays(weekStartDate, -7);
    setWeekStartDate(newStartDate);
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    const newStartDate = addDays(weekStartDate, 7);
    setWeekStartDate(newStartDate);
  };
  
  // Get scheduled content for a specific date and time slot
  const getScheduledContent = (date: Date, timeSlot: string): Content[] => {
    // Parse the time from the timeSlot string
    const [hours] = timeSlot.split(':').map(Number);
    
    return scheduledContent.filter(content => {
      if (!content.scheduledAt) return false;
      const scheduledDate = new Date(content.scheduledAt);
      return (
        isSameDay(scheduledDate, date) && 
        scheduledDate.getHours() === hours
      );
    });
  };
  
  // Format date range for header
  const formatDateRange = () => {
    const endDate = addDays(weekStartDate, 6);
    const startMonth = format(weekStartDate, 'MMM', { locale: vi });
    const startDay = format(weekStartDate, 'd', { locale: vi });
    const endMonth = format(endDate, 'MMM', { locale: vi });
    const endDay = format(endDate, 'd', { locale: vi });
    const year = format(endDate, 'yyyy', { locale: vi });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            f
          </div>
        );
      case 'instagram':
        return (
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white text-xs">
            i
          </div>
        );
      case 'tiktok':
        return (
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs">
            t
          </div>
        );
      case 'threads':
        return (
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
            th
          </div>
        );
      case 'linkedin':
        return (
          <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs">
            in
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
            ?
          </div>
        );
    }
  };
  
  const renderScheduledPost = (content: Content) => {
    const time = content.scheduledAt ? format(new Date(content.scheduledAt), 'HH:mm') : '';
    
    return (
      <div key={content.id} className="mb-2 bg-white border rounded-md overflow-hidden shadow-sm">
        <div className="p-3 pb-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <div className="mr-2 flex gap-1">
                {getPlatformIcon(content.platform)}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Info className="h-4 w-4 text-blue-500 cursor-help" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Nội dung không có chủ đề</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-600">
                  {time}
                </span>
              </div>
            </div>
            <div className="flex space-x-1">
              <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
                <span className="sr-only">Sửa</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L18 9M13 20H21M5 16L14 7L17 10L8 19L4 20L5 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
                <span className="sr-only">Xóa</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="text-sm mb-2 line-clamp-2">{content.text}</div>
          {content.imageUrl && (
            <div className="mb-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-xs text-gray-500">Có hình ảnh</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderPostCard = (content: Content, key: number) => {
    const borderColors = {
      'facebook': 'border-blue-500',
      'instagram': 'border-pink-500',
      'tiktok': 'border-black',
      'threads': 'border-purple-500',
      'linkedin': 'border-blue-700',
    };
    
    const borderColor = borderColors[content.platform as keyof typeof borderColors] || 'border-gray-300';
    
    return (
      <div 
        key={key} 
        className={`p-2 mb-1 rounded-md border-l-4 ${borderColor} bg-white hover:shadow-md transition-shadow`}
      >
        <div className="flex justify-between items-start">
          <div className="text-xs font-medium">{content.text?.substring(0, 20)}...</div>
          <Badge variant="outline" className="text-xs">
            {format(new Date(content.scheduledAt!), 'HH:mm')}
          </Badge>
        </div>
      </div>
    );
  };

  const renderCalendarView = () => {
    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Calendar header with days */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
            <div className="p-2"></div>
            {weekDates.map((date, index) => (
              <div 
                key={index} 
                className={`p-3 text-center border-l ${isSameDay(date, new Date()) ? 'bg-primary/5' : ''}`}
              >
                <div className="text-sm text-gray-500">{format(date, 'EEEE', { locale: vi })}</div>
                <div className="font-medium">{format(date, 'd', { locale: vi })}</div>
              </div>
            ))}
          </div>
          
          {/* Time slots and content */}
          {timeSlots.map((timeSlot, slotIndex) => (
            <div key={slotIndex} className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
              {/* Time indicator */}
              <div className="p-2 text-sm text-gray-500 text-right pr-3 pt-3 border-r">
                {timeSlot}
              </div>
              
              {/* Days content */}
              {weekDates.map((date, dateIndex) => {
                const contentForSlot = getScheduledContent(date, timeSlot);
                return (
                  <div 
                    key={`${slotIndex}-${dateIndex}`} 
                    className={`p-2 min-h-[100px] border-l relative ${
                      isSameDay(date, new Date()) ? 'bg-primary/5' : ''
                    }`}
                  >
                    {contentForSlot.length > 0 ? (
                      contentForSlot.map((content, contentIndex) => 
                        renderScheduledPost(content)
                      )
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm bài viết
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderListView = () => {
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
  
  const renderGridView = () => {
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

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Lịch đăng bài</h1>
                <Badge variant="outline" className="bg-yellow-400 text-yellow-800">Beta</Badge>
              </div>
              <p className="text-muted-foreground">Quản lý tất cả bài đăng từ một nơi.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-100 px-3 py-1">
                <span className="font-medium">1</span> / 2 Tài khoản mạng xã hội
              </Badge>
              
              <div className="flex border rounded-full overflow-hidden">
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('calendar')}
                  className="rounded-none"
                >
                  Lịch
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  Danh sách
                </Button>
                <Button 
                  variant={viewMode === 'overview' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('overview')}
                  className="rounded-none"
                >
                  Tổng quan
                </Button>
              </div>
            </div>
          </div>
          
          {/* Add time slot button */}
          <div className="mt-6 flex justify-between items-center">
            <Button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black">
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
                    className="rounded-full"
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
                    className="rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex border rounded-full overflow-hidden">
                  <Button variant="ghost" size="sm" className="rounded-none">
                    Ngày
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-none">
                    4 Ngày
                  </Button>
                  <Button variant="default" size="sm" className="rounded-none">
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
        
        {/* Calendar View */}
        <div>
          {viewMode === 'calendar' && renderCalendarView()}
          {viewMode === 'list' && renderListView()}
          {viewMode === 'overview' && renderGridView()}
          {viewMode === 'grid' && renderGridView()}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
