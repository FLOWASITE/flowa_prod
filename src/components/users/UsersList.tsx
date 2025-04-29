
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserRole } from '@/types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MoreHorizontal, Trash, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UsersListProps {
  users: User[];
  isLoading: boolean;
  onRoleChange: (userId: string, role: UserRole) => void;
  onDeleteUser: (userId: string) => void;
}

const RoleColors: Record<UserRole, string> = {
  'admin': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  'manager': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  'staff': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
};

const RoleLabels: Record<UserRole, Record<string, string>> = {
  'admin': {
    'vi': 'Quản trị viên',
    'en': 'Admin'
  },
  'manager': {
    'vi': 'Quản lý',
    'en': 'Manager'
  },
  'staff': {
    'vi': 'Nhân viên',
    'en': 'Staff'
  }
};

export function UsersList({ users, isLoading, onRoleChange, onDeleteUser }: UsersListProps) {
  const { currentLanguage } = useLanguage();
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  
  const handleCloseDeleteDialog = () => setDeleteUserId(null);
  
  const handleConfirmDelete = () => {
    if (deleteUserId) {
      onDeleteUser(deleteUserId);
      setDeleteUserId(null);
    }
  };
  
  const getRoleLabel = (role: UserRole) => {
    return RoleLabels[role][currentLanguage.code] || RoleLabels[role]['en'];
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {currentLanguage.code === 'vi' 
            ? 'Chưa có người dùng nào. Hãy mời người dùng mới!' 
            : 'No users yet. Invite new users!'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white dark:bg-gray-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{currentLanguage.code === 'vi' ? 'Người dùng' : 'User'}</TableHead>
              <TableHead>{currentLanguage.code === 'vi' ? 'Email' : 'Email'}</TableHead>
              <TableHead>{currentLanguage.code === 'vi' ? 'Vai trò' : 'Role'}</TableHead>
              <TableHead>{currentLanguage.code === 'vi' ? 'Ngày tạo' : 'Created'}</TableHead>
              <TableHead className="text-right">{currentLanguage.code === 'vi' ? 'Hành động' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl || ''} />
                      <AvatarFallback>
                        {user.firstName?.[0] || user.email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}`
                          : user.email.split('@')[0]
                        }
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${RoleColors[user.role]}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </TableCell>
                <TableCell>
                  {user.createdAt && format(new Date(user.createdAt), 'dd MMM yyyy', { locale: currentLanguage.code === 'vi' ? vi : undefined })}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => onRoleChange(user.id, 'admin')}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>{currentLanguage.code === 'vi' ? 'Đặt làm Quản trị viên' : 'Set as Admin'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => onRoleChange(user.id, 'manager')}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>{currentLanguage.code === 'vi' ? 'Đặt làm Quản lý' : 'Set as Manager'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => onRoleChange(user.id, 'staff')}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>{currentLanguage.code === 'vi' ? 'Đặt làm Nhân viên' : 'Set as Staff'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-red-600 cursor-pointer"
                        onClick={() => setDeleteUserId(user.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span>{currentLanguage.code === 'vi' ? 'Xóa người dùng' : 'Delete User'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={!!deleteUserId} onOpenChange={handleCloseDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {currentLanguage.code === 'vi' ? 'Xác nhận xóa người dùng?' : 'Confirm delete user?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentLanguage.code === 'vi' 
                ? 'Hành động này không thể hoàn tác. Người dùng này sẽ bị xóa vĩnh viễn và không thể truy cập vào hệ thống.'
                : 'This action cannot be undone. This user will be permanently deleted and will no longer have access to the system.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {currentLanguage.code === 'vi' ? 'Hủy' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              {currentLanguage.code === 'vi' ? 'Xóa' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
