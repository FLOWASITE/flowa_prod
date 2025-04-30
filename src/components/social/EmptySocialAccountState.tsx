
import React from 'react';
import { Card } from '@/components/ui/card';

export function EmptySocialAccountState() {
  return (
    <Card className="p-8 text-center border rounded-lg">
      <p className="text-gray-500">No social accounts connected for this brand. Add a new account below.</p>
    </Card>
  );
}
