
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InviteUserDialog } from './InviteUserDialog';
import { UserRole } from '@/types';

interface UserHeaderProps {
  onInviteUser: (email: string, role: UserRole) => void;
  isInviteDialogOpen: boolean;
  setIsInviteDialogOpen: (open: boolean) => void;
}

export function UserHeader({ 
  onInviteUser, 
  isInviteDialogOpen, 
  setIsInviteDialogOpen 
}: UserHeaderProps) {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {currentLanguage.code === 'vi' ? 'Quản lý người dùng' : 'User Management'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {currentLanguage.code === 'vi' 
            ? 'Quản lý và phân quyền người dùng trong hệ thống' 
            : 'Manage users and their permissions in the system'}
        </p>
      </div>
      
      <Button 
        onClick={() => setIsInviteDialogOpen(true)}
        className="shrink-0"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        {currentLanguage.code === 'vi' ? 'Mời người dùng' : 'Invite User'}
      </Button>
      
      <InviteUserDialog 
        open={isInviteDialogOpen} 
        onOpenChange={setIsInviteDialogOpen}
        onInvite={onInviteUser}
      />
    </div>
  );
}
