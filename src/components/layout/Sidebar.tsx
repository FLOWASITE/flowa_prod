import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BriefcaseBusiness, 
  MessageCircle, 
  FileText, 
  Image, 
  Calendar,
  ChevronLeft,
  ChevronRight,
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
        "min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-all duration-300 border-r border-gray-200 dark:border-gray-800",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        {!collapsed ? (
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
              alt="Flowa Logo" 
              className="h-[100px] object-contain" 
            />
          </Link>
        ) : (
          <Link to="/" className="flex items-center justify-center w-full">
            <img 
              src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
              alt="Flowa Logo" 
              className="h-[80px] w-[80px] object-contain"
            />
          </Link>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors relative",
                  location.pathname.startsWith(item.href)
                    ? "bg-yellow-400/20 text-yellow-700"
                    : "text-gray-600 dark:text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-600",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  location.pathname.startsWith(item.href) 
                    ? "text-yellow-600" 
                    : "text-gray-500"
                )} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex justify-center hover:bg-yellow-400/10 hover:text-yellow-600"
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
