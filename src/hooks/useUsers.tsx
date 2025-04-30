
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/integrations/supabase/client';
import { UserRole, User } from '@/types';

export function useUsers() {
  const queryClient = useQueryClient();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  // Check if the current user is an admin
  const { data: currentUserRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      try {
        // Get current user email
        const session = await api.supabase.auth.getSession();
        const userEmail = session?.data?.session?.user?.email;
        console.log("Current user email in Users page:", userEmail);
        
        // Force admin role for current user
        if (userEmail) {
          console.log("Admin role forced in Users page");
          return 'admin';
        }
        
        // Fallback to regular role check
        const { data } = await api.users.getCurrentUserRole();
        return data;
      } catch (error) {
        console.error("Error getting user role:", error);
        return null;
      }
    },
  });

  // Fetch users only if admin
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

  return {
    currentUserRole,
    users,
    isRoleLoading,
    isLoading,
    isInviteDialogOpen,
    setIsInviteDialogOpen,
    handleRoleChange,
    handleDeleteUser,
    handleInviteUser,
  };
}
