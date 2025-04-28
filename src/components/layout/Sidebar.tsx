
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
        "min-h-screen bg-sidebar flex flex-col border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-center">
        {!collapsed ? (
          <Link to="/" className="flex flex-col items-center gap-1">
            <img 
              src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
              alt="Flowa Logo" 
              className="h-8 object-contain"
            />
            <span className="text-xs font-medium text-brand-dark-red">Auto AI Content. All Socials</span>
          </Link>
        ) : (
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/3d095938-a60f-4b3e-ae18-df47874ddf1f.png" 
              alt="Flowa Logo" 
              className="h-8 w-8 object-contain"
            />
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
                    ? "bg-brand-bright-red/10 text-brand-dark-red font-medium"
                    : "text-sidebar-foreground hover:bg-brand-bright-red/5",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  location.pathname.startsWith(item.href) ? "text-brand-dark-red" : "text-gray-500",
                  collapsed && "mx-auto"
                )} />
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
          className="w-full flex justify-center text-brand-dark-red hover:text-brand-bright-red hover:bg-brand-bright-red/5"
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
