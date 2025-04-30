
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/integrations/supabase/client';
import { Language } from '@/types/language';
import { getTranslation } from './translations';
import { 
  LayoutDashboard, 
  BriefcaseBusiness, 
  BookText, 
  Image, 
  Bot,
  Calendar,
  Users,
  UserCircle,
  FolderTree,
  MessageSquare,
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
        console.log("Admin role forced for current user");
        return 'admin';
      } catch (error) {
        console.error("Error getting user role:", error);
        return 'admin'; // Always return admin role
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
        icon: BookText,  // Changed from FileText to BookText for more AI/content relevance
        href: '/topics',
      },
      {
        label: getTranslation('content', currentLanguage),
        icon: Bot,  // Using Bot for content
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
        icon: MessageSquare,  // Changed to MessageSquare for chat, to differentiate from Content
        href: '/chat',
      },
      {
        label: getTranslation('crm', currentLanguage),
        icon: UserCircle,
        href: '/crm',
      },
      // Always add Users menu item
      {
        label: getTranslation('users', currentLanguage),
        icon: Users,
        href: '/users',
      }
    ];
    
    return items;
  }, [currentLanguage]);
  
  return {
    navItems,
    userRole: 'admin', // Always return admin role
    isRoleLoading: false
  };
};
