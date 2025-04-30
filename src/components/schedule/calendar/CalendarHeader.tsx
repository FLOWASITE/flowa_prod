
import React from 'react';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  weekDates: Date[];
  getDayName: (date: Date) => string;
  isToday: (date: Date) => boolean;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  weekDates,
  getDayName,
  isToday
}) => {
  return (
    <div className="grid grid-cols-[60px_repeat(7,1fr)]">
      <div className="p-2 border-b border-r"></div>
      {weekDates.map((date, index) => {
        const isCurrentDay = isToday(date);
        return (
          <div 
            key={index} 
            className={`p-3 text-center border-b ${
              isCurrentDay ? 'bg-rose-50' : 'bg-white'
            } ${index < 6 ? 'border-r' : ''}`}
          >
            <div className="text-sm text-gray-500">{getDayName(date)}</div>
            <div className="font-medium">{format(date, 'd')}</div>
          </div>
        );
      })}
    </div>
  );
};
