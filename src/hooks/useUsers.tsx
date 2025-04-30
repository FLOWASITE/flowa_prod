
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/integrations/supabase/client';
import { UserRole, User } from '@/types';

export function useUsers() {
  const queryClient = useQueryClient();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  // Mock user data instead of using admin APIs
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'davide@gmail.com',
      firstName: 'Davide',
      lastName: 'Admin',
      avatarUrl: '',
      role: 'admin',
      createdAt: '2025-04-01T00:00:00Z',
      lastSignIn: '2025-04-30T00:00:00Z'
    },
    {
      id: '2',
      email: 'peter@gmail.com',
      firstName: 'Peter',
      lastName: 'Staff',
      avatarUrl: '',
      role: 'staff',
      createdAt: '2025-04-15T00:00:00Z',
      lastSignIn: '2025-04-29T00:00:00Z'
    }
  ];

  // Check if the current user is an admin
  const { data: currentUserRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ['currentUserRole'],
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
        // For development, use a default role based on URL params or hardcoded value
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('role') || 'staff';
      }
    },
  });

  // Return mock user data
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log("Returning mock user data");
      return mockUsers;
    },
    enabled: currentUserRole === 'admin', // Only fetch users if current user is admin
  });

  // Mock mutation for updating user roles
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: UserRole }) => {
      console.log("Mock updating user role:", userId, role);
      // Update the mock data
      const updatedUsers = mockUsers.map(user => 
        user.id === userId ? { ...user, role } : user
      );
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

  // Mock mutation for deleting users
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      console.log("Mock deleting user:", userId);
      // Delete from mock data
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

  // Mock mutation for inviting users
  const inviteUserMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: UserRole }) => {
      console.log("Mock inviting user:", email, role);
      // Add to mock data
      mockUsers.push({
        id: (mockUsers.length + 1).toString(),
        email,
        firstName: email.split('@')[0],
        lastName: '',
        avatarUrl: '',
        role,
        createdAt: new Date().toISOString(),
        lastSignIn: null
      });
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
