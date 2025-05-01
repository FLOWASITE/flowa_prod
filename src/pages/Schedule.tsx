
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Content } from '@/types/content';
import { useScheduleUtils } from '@/components/schedule/useScheduleUtils';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { CalendarView } from '@/components/schedule/calendar/CalendarView';
import { ListView } from '@/components/schedule/ListView';
import { GridView } from '@/components/schedule/GridView';
import { useContentFetch } from '@/hooks/useContentFetch';
import { useTopicsFetch } from '@/hooks/useTopicsFetch';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addDays } from 'date-fns';

const Schedule = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'grid' | 'overview'>('calendar');
  
  // Use real data from useContentFetch and useTopicsFetch with useLocalData=true
  const { content } = useContentFetch(true);
  const { topics } = useTopicsFetch(true);
  
  console.log("Available topics in Schedule:", topics);

  // Filter scheduled content
  const scheduledContent = content.filter(
    content => content.status === 'scheduled' && content.scheduledAt
  );
  
  // Use the schedule utilities hook
  const {
    weekDates,
    timeSlots,
    weekStartDate,
    goToPreviousWeek,
    goToNextWeek,
    getScheduledContent,
    formatDateRange
  } = useScheduleUtils(scheduledContent);
  
  // Calculate week end date (7 days from start)
  const weekEndDate = addDays(weekStartDate, 6);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <ScheduleHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          weekStartDate={weekStartDate}
          goToPreviousWeek={goToPreviousWeek}
          goToNextWeek={goToNextWeek}
          formatDateRange={formatDateRange}
        />
        
        {/* Add time slot button (only for list view) */}
        {viewMode === 'list' && (
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            <Plus className="mr-1 h-4 w-4" />
            Add time slot
          </Button>
        )}
        
        {/* Views */}
        <div>
          {viewMode === 'calendar' && (
            <CalendarView 
              weekDates={weekDates} 
              timeSlots={timeSlots}
              getScheduledContent={getScheduledContent}
              topics={topics}
            />
          )}
          {viewMode === 'list' && (
            <ListView 
              scheduledContent={scheduledContent} 
              weekStartDate={weekStartDate}
              weekEndDate={weekEndDate}
            />
          )}
          {viewMode === 'overview' && <GridView scheduledContent={scheduledContent} />}
          {viewMode === 'grid' && <GridView scheduledContent={scheduledContent} />}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
