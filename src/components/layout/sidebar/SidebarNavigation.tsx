
import React, { useEffect } from 'react';
import { SidebarNavItem } from './SidebarNavItem';
import { NavItem } from '@/hooks/useSidebarNavItems';

type SidebarNavigationProps = {
  navItems: NavItem[];
  collapsed: boolean;
};

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  navItems,
  collapsed
}) => {
  // Debug the nav items
  useEffect(() => {
    console.log("SidebarNavigation items:", navItems);
  }, [navItems]);

  return (
    <nav className="flex-1 overflow-y-auto p-2">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem 
            key={item.href}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </ul>
    </nav>
  );
};
