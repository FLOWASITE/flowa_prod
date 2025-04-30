
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem } from './useSidebarNavItems';
import { Badge } from '@/components/ui/badge';

type SidebarNavItemProps = {
  item: NavItem;
  collapsed: boolean;
};

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  item,
  collapsed 
}) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <li key={item.href}>
      <Link 
        to={item.href}
        className={cn(
          "flex items-center px-3 py-2 rounded-md transition-colors relative",
          isActive
            ? "bg-primary/20 text-primary"
            : "text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary",
          collapsed && "justify-center"
        )}
      >
        <Icon className={cn(
          "h-5 w-5 flex-shrink-0",
          isActive 
            ? "text-primary" 
            : "text-gray-500"
        )} />
        
        {!collapsed && (
          <div className="ml-3 flex items-center justify-between w-full">
            <span>{item.label}</span>
            {item.badge && (
              <Badge 
                variant="outline" 
                className={cn(
                  "ml-auto text-xs",
                  item.badge.variant === "beta" && "bg-yellow-400 text-yellow-800 border-yellow-400"
                )}
              >
                {item.badge.text}
              </Badge>
            )}
          </div>
        )}
        
        {collapsed && item.badge && (
          <Badge 
            variant="outline" 
            className={cn(
              "absolute -top-1 -right-1 text-xs h-4 w-4 p-0 flex items-center justify-center",
              item.badge.variant === "beta" && "bg-yellow-400 text-yellow-800 border-yellow-400"
            )}
          >
            {item.badge.variant === "beta" ? "B" : item.badge.text}
          </Badge>
        )}
      </Link>
    </li>
  );
};
