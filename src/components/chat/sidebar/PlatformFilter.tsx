
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { platformIcons } from '../PlatformIcons';

interface PlatformFilterProps {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

export function PlatformFilter({ selectedPlatform, setSelectedPlatform }: PlatformFilterProps) {
  const platforms = [
    { id: 'all', name: 'Tất cả' },
    { id: 'messenger', name: 'Messenger' },
    { id: 'zalo', name: 'Zalo' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'website', name: 'Website' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {platforms.map(platform => (
          <DropdownMenuCheckboxItem
            key={platform.id}
            checked={selectedPlatform === platform.id}
            onCheckedChange={() => setSelectedPlatform(platform.id)}
          >
            {platform.id !== 'all' && platformIcons[platform.id]}
            <span className="ml-2">{platform.name}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
