
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const AccordionLoadingState = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="pl-8">
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);
