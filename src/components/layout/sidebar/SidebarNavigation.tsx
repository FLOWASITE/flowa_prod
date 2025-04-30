
import React from 'react';
import { SidebarNavItem } from './SidebarNavItem';
import { NavItem } from './useSidebarNavItems';

type SidebarNavigationProps = {
  navItems: NavItem[];
  collapsed: boolean;
};

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  navItems,
  collapsed
}) => {
  return (
    <nav className="flex-1 overflow-y-auto p-2 scrollbar-thin">
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
