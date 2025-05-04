
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const GridLoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="border rounded-lg p-4 space-y-3">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    ))}
  </div>
);
