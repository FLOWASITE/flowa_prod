
import React, { useState, useEffect } from 'react';
import { Bell, Search, DollarSign, Settings, LogOut, Users, HelpCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandSwitcher } from '../brand/BrandSwitcher';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  sidebarCollapsed?: boolean;
}

export function Header({ sidebarCollapsed = false }: HeaderProps) {
  const { currentLanguage } = useLanguage();
  const [userName, setUserName] = useState('Duy Vo');
  const [userEmail, setUserEmail] = useState('flowasite@gmail.com');
  const [userAvatar, setUserAvatar] = useState('/lovable-uploads/d57b3adf-cd81-4107-87ea-4015235e8c5e.png');
  
  useEffect(() => {
    // Get user information if available
    const getUserProfile = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        setUserEmail(session.session.user.email || 'flowasite@gmail.com');
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', session.session.user.id)
          .single();
          
        if (profile) {
          const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
          if (fullName) {
            setUserName(fullName);
          }
          
          if (profile.avatar_url) {
            setUserAvatar(profile.avatar_url);
          }
        }
      }
    };
    
    getUserProfile();
  }, []);
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm py-4 px-6 shadow-sm h-16">
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-4 flex-1 transition-all duration-300`}>
          <BrandSwitcher />
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder={currentLanguage.code === 'vi' ? "Tìm kiếm..." : "Search..."}
              className="w-full bg-gray-50 dark:bg-gray-800 pl-8"
            />
          </div>
        </div>
        
        {/* Header action buttons with absolute positioning to ensure visibility */}
        <div className="absolute right-6 top-4 flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative group">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 transition-all"
            >
              <span className="font-medium mr-1">{currentLanguage.code.toUpperCase()}</span>
              <LanguageSelector />
            </Button>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </div>
          
          {/* Notification Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="relative bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 transition-all"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700 transition-all pl-2 pr-3 py-1"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm hidden sm:inline">{userName.split(' ')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white dark:bg-gray-950 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-800" align="end">
              <div className="flex items-center p-3 space-x-3">
                <Avatar>
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <DollarSign className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Định giá" : "Pricing"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <Settings className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Thiết lập không gian làm việc" : "Workspace Settings"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <Users className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Người dùng không gian làm việc" : "Workspace Users"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                  <HelpCircle className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Trung tâm trợ giúp" : "Help Center"}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
              <DropdownMenuItem className="text-red-600 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <LogOut className="mr-3 h-5 w-5" />
                <span>{currentLanguage.code === 'vi' ? "Đăng xuất" : "Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
