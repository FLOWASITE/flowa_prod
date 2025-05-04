
import React from 'react';
import { Button } from '@/components/ui/button';
import { List, LayoutGrid, AlignLeft } from 'lucide-react';

interface ViewModeSwitcherProps {
  viewMode: 'table' | 'grid' | 'accordion';
  handleViewModeChange: (mode: 'table' | 'grid' | 'accordion') => void;
}

export const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({
  viewMode,
  handleViewModeChange
}) => {
  return (
    <div className="flex rounded-md shadow-sm">
      <Button
        variant={viewMode === 'table' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleViewModeChange('table')}
        className="rounded-l-md rounded-r-none px-3"
        title="Chế độ bảng"
      >
        <List size={16} />
      </Button>
      <Button
        variant={viewMode === 'grid' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleViewModeChange('grid')}
        className="rounded-none border-l-0 border-r-0 px-3"
        title="Chế độ lưới"
      >
        <LayoutGrid size={16} />
      </Button>
      <Button
        variant={viewMode === 'accordion' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleViewModeChange('accordion')}
        className="rounded-r-md rounded-l-none px-3"
        title="Chế độ phân cấp"
      >
        <AlignLeft size={16} />
      </Button>
    </div>
  );
};
