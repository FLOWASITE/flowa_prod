
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { UsersList } from '@/components/users/UsersList';
import { UserHeader } from '@/components/users/UserHeader';
import { UserRole, User } from '@/types';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  // Check if the current user is an admin
  const { data: currentUserRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      const { data, error } = await api.users.getCurrentUserRole();
      if (error) throw error;
      return data;
    },
  });

  // Redirect if not an admin
  useEffect(() => {
    if (!isRoleLoading && currentUserRole !== 'admin') {
      toast.error('Bạn không có quyền truy cập vào trang này');
      navigate('/dashboard');
    }
  }, [currentUserRole, isRoleLoading, navigate]);

  // Fetch users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await api.users.getAll();
      if (error) throw error;
      return data || [];
    },
    enabled: currentUserRole === 'admin',
  });

  // Mutation for updating user roles
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: UserRole }) => {
      const { error } = await api.users.updateRole(userId, role);
      if (error) throw error;
      return { userId, role };
    },
    onSuccess: () => {
      toast.success('Đã cập nhật vai trò người dùng');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error updating user role:', error);
      toast.error('Lỗi khi cập nhật vai trò người dùng');
    },
  });

  // Mutation for deleting users
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await api.users.delete(userId);
      if (error) throw error;
      return userId;
    },
    onSuccess: () => {
      toast.success('Đã xóa người dùng');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
      toast.error('Lỗi khi xóa người dùng');
    },
  });

  // Mutation for inviting users
  const inviteUserMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: UserRole }) => {
      const { error } = await api.users.invite(email, role);
      if (error) throw error;
      return { email, role };
    },
    onSuccess: () => {
      toast.success('Đã gửi lời mời cho người dùng mới');
      setIsInviteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error inviting user:', error);
      toast.error('Lỗi khi gửi lời mời cho người dùng');
    },
  });

  const handleRoleChange = (userId: string, role: UserRole) => {
    updateRoleMutation.mutate({ userId, role });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const handleInviteUser = (email: string, role: UserRole) => {
    inviteUserMutation.mutate({ email, role });
  };

  if (isRoleLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (currentUserRole !== 'admin') {
    return null; // Will redirect in the useEffect
  }

  return (
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
  );
};

export default Users;
