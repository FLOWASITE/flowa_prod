
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BriefcaseBusiness, 
  MessageCircle, 
  FileText, 
  Image, 
  Calendar, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Brands',
    icon: BriefcaseBusiness,
    href: '/brands',
  },
  {
    label: 'Topics',
    icon: FileText,
    href: '/topics',
  },
  {
    label: 'Content',
    icon: Image,
    href: '/content',
  },
  {
    label: 'Chat',
    icon: MessageCircle,
    href: '/chat',
  },
  {
    label: 'Schedule',
    icon: Calendar,
    href: '/schedule',
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "min-h-screen bg-sidebar flex flex-col border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-brand-blue" />
            <span className="font-bold text-xl text-brand-blue">ContentForge</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="mx-auto">
            <Home className="h-6 w-6 text-brand-blue" />
          </Link>
        )}
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 transition-colors",
                  location.pathname.startsWith(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed && "mx-auto")} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className="w-full flex justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </aside>
  );
}
