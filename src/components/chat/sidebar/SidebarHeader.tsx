
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlatformFilter } from './PlatformFilter';

interface SidebarHeaderProps {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

export function SidebarHeader({ selectedPlatform, setSelectedPlatform }: SidebarHeaderProps) {
  return (
    <div className="p-4 border-b bg-white dark:bg-gray-950 flex items-center justify-between sticky top-0 z-10">
      <h3 className="font-semibold">Hội thoại</h3>
      <div className="flex gap-2">
        <PlatformFilter 
          selectedPlatform={selectedPlatform} 
          setSelectedPlatform={setSelectedPlatform}
        />
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
