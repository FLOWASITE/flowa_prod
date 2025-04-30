
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/integrations/supabase/client';
import { Language } from '@/types/language';
import { getTranslation } from './translations';
import { 
  LayoutDashboard, 
  BriefcaseBusiness, 
  FileText, 
  Image, 
  MessageCircle, 
  Calendar,
  Users,
  UserCircle,
  FolderTree,
} from 'lucide-react';

export type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

export const useSidebarNavItems = (currentLanguage: Language) => {
  // Get current user role
  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      try {
        // Get current user email
        const session = await api.supabase.auth.getSession();
        const userEmail = session?.data?.session?.user?.email;
        console.log("Current user email:", userEmail);
        
        // Force admin role for current user
        if (userEmail) {
          console.log("Admin role forced for current user:", userEmail);
          return 'admin';
        }
        
        // Get role from API (fallback)
        const { data } = await api.users.getCurrentUserRole();
        console.log("Current user role:", data);
        return data || 'staff';
      } catch (error) {
        console.error("Error getting user role:", error);
        return 'staff';
      }
    },
  });
  
  // Create navigation items based on user role and language
  const navItems = useMemo(() => {
    const items: NavItem[] = [
      {
        label: getTranslation('dashboard', currentLanguage),
        icon: LayoutDashboard,
        href: '/dashboard',
      },
      {
        label: getTranslation('brands', currentLanguage),
        icon: BriefcaseBusiness,
        href: '/brands',
      },
      {
        label: getTranslation('topics', currentLanguage),
        icon: FileText,
        href: '/topics',
      },
      {
        label: getTranslation('content', currentLanguage),
        icon: Image,
        href: '/content',
      },
      {
        label: getTranslation('schedule', currentLanguage),
        icon: Calendar,
        href: '/schedule',
      },
      {
        label: getTranslation('fileManager', currentLanguage),
        icon: FolderTree,
        href: '/filemanager',
      },
      {
        label: getTranslation('chat', currentLanguage),
        icon: MessageCircle,
        href: '/chat',
      },
      {
        label: getTranslation('crm', currentLanguage),
        icon: UserCircle,
        href: '/crm',
      },
    ];
    
    // Add Users menu item for admin users only
    if (userRole === 'admin') {
      const userExists = items.some(item => item.href === '/users');
      
      if (!userExists) {
        console.log("Adding Users nav item for admin role");
        items.push({
          label: getTranslation('users', currentLanguage),
          icon: Users,
          href: '/users',
        });
      }
    }
    
    return items;
  }, [userRole, currentLanguage]);
  
  return {
    navItems,
    userRole,
    isRoleLoading
  };
};
