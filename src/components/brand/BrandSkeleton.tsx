
import React from 'react';
import { Card } from '@/components/ui/card';

export function BrandSkeleton() {
  return (
    <Card className="h-[200px] animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      </div>
    </Card>
  );
}
