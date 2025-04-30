
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SidebarToggleProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ 
  collapsed,
  toggleCollapsed
}) => {
  return (
    <div className="p-2 border-t border-gray-200 dark:border-gray-800">
      <Button
        variant="ghost"
        size="sm"
        className="w-full flex justify-center hover:bg-primary/10 hover:text-primary"
        onClick={toggleCollapsed}
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
