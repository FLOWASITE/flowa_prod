import React from 'react';
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

export function Header() {
  const { currentLanguage } = useLanguage();
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
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
        
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/d57b3adf-cd81-4107-87ea-4015235e8c5e.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <div className="flex items-center p-3 space-x-3">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/d57b3adf-cd81-4107-87ea-4015235e8c5e.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">Duy Vo</p>
                  <p className="text-xs text-gray-500">flowasite@gmail.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-2">
                  <DollarSign className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Định giá" : "Pricing"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                  <Settings className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Thiết lập không gian làm việc" : "Workspace Settings"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                  <Users className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Người dùng không gian làm việc" : "Workspace Users"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                  <HelpCircle className="mr-3 h-5 w-5" />
                  <span>{currentLanguage.code === 'vi' ? "Trung tâm tr�� giúp" : "Help Center"}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 py-2">
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
