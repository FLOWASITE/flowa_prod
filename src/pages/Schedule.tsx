
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
              topics={topics}
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
