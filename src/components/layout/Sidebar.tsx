
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarLogo } from './sidebar/SidebarLogo';
import { SidebarNavigation } from './sidebar/SidebarNavigation';
import { SidebarToggle } from './sidebar/SidebarToggle';
import { useSidebarNavItems } from './sidebar/useSidebarNavItems';

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ onCollapsedChange }: SidebarProps = {}) {
  const [collapsed, setCollapsed] = useState(true); // Changed to true as default
  const { currentLanguage } = useLanguage();
  const { navItems, userRole } = useSidebarNavItems(currentLanguage);
  
  // Log the role for debugging
  useEffect(() => {
    console.log("Current user role in sidebar:", userRole);
  }, [userRole]);
  
  // Notify parent component about initial collapsed state
  useEffect(() => {
    onCollapsedChange?.(collapsed);
  }, []);
  
  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };
  
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
