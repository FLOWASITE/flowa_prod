
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarToggle } from './sidebar/SidebarToggle';
import { useSidebarNavItems } from './sidebar/useSidebarNavItems';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { currentLanguage } = useLanguage();
  const { navItems, userRole } = useSidebarNavItems(currentLanguage);
  
  // Log the role for debugging
  useEffect(() => {
    console.log("Current user role in sidebar:", userRole);
  }, [userRole]);
  
  const toggleCollapsed = () => setCollapsed(!collapsed);
  
  return (
    <aside 
      className={cn(
        "h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-all duration-300 border-r border-gray-200 dark:border-gray-800 overflow-y-auto",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarLogo collapsed={collapsed} />
      <SidebarNavigation navItems={navItems} collapsed={collapsed} />
      <SidebarToggle collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
    </aside>
  );
}
