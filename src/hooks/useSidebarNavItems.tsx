
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/integrations/supabase/client';
import { Language } from '@/types/language';
import { getTranslation } from '@/components/layout/sidebar/translations';
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
  requiredRole?: 'admin' | 'staff';
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
        
        // For demonstration purposes, assign roles based on email
        if (userEmail === 'davide@gmail.com') {
          return 'admin';
        }
        return 'staff';
      } catch (error) {
        console.error("Error getting user role:", error);
        return 'staff';
      }
    },
  });
  
  // Create navigation items based on user role and language
  const navItems = useMemo(() => {
    const allItems: NavItem[] = [
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
      {
        label: getTranslation('users', currentLanguage),
        icon: Users,
        href: '/users',
        requiredRole: 'admin',
      }
    ];
    
    // Filter items based on user role
    if (userRole === 'admin') {
      // Admins can see all items
      return allItems;
    } else {
      // Staff can only see items without requiredRole or with requiredRole='staff'
      return allItems.filter(item => !item.requiredRole || item.requiredRole === 'staff');
    }
  }, [currentLanguage, userRole]);
  
  return {
    navItems,
    userRole,
    isRoleLoading
  };
};
