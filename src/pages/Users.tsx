
import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { UsersList } from '@/components/users/UsersList';
import { UserHeader } from '@/components/users/UserHeader';
import { UserAccessControl } from '@/components/users/UserAccessControl';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types';
import { toast } from 'sonner';

const Users = () => {
  const {
    currentUserRole,
    users,
    isRoleLoading,
    isLoading,
    isInviteDialogOpen,
    setIsInviteDialogOpen,
    handleRoleChange,
    handleDeleteUser,
    handleInviteUser,
  } = useUsers();

  // Debug user role
  useEffect(() => {
    console.log("Current user role in Users page:", currentUserRole);
  }, [currentUserRole]);

  return (
    <UserAccessControl
      isLoading={isRoleLoading}
      hasAccess={currentUserRole === 'admin'}
    >
      <Layout>
        <UserHeader 
          onInviteUser={handleInviteUser}
          isInviteDialogOpen={isInviteDialogOpen}
          setIsInviteDialogOpen={setIsInviteDialogOpen}
        />
        
        <div className="mt-6">
          <UsersList 
            users={users as User[] || []}
            isLoading={isLoading}
            onRoleChange={handleRoleChange}
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </Layout>
    </UserAccessControl>
  );
};

export default Users;
