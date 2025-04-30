
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { mockContents } from '@/data/mockData';
import { Content } from '@/types/content';
import { useScheduleUtils } from '@/components/schedule/useScheduleUtils';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { CalendarView } from '@/components/schedule/CalendarView';
import { ListView } from '@/components/schedule/ListView';
import { GridView } from '@/components/schedule/GridView';

const Schedule = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'grid' | 'overview'>('calendar');
  
  // Filter scheduled content
  const scheduledContent = mockContents.filter(
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
        
        {/* Views */}
        <div>
          {viewMode === 'calendar' && (
            <CalendarView 
              weekDates={weekDates} 
              timeSlots={timeSlots}
              getScheduledContent={getScheduledContent}
            />
          )}
          {viewMode === 'list' && <ListView scheduledContent={scheduledContent} />}
          {viewMode === 'overview' && <GridView scheduledContent={scheduledContent} />}
          {viewMode === 'grid' && <GridView scheduledContent={scheduledContent} />}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
