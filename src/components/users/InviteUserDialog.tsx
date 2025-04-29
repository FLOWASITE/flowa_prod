
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types';

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string, role: UserRole) => void;
}

export function InviteUserDialog({
  open,
  onOpenChange,
  onInvite
}: InviteUserDialogProps) {
  const { currentLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('staff');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;
    
    setIsSubmitting(true);
    onInvite(email, role);
    // Reset form (the dialog will close and reset on success via parent component)
    setIsSubmitting(false);
  };
  
  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset form after dialog close animation
      setTimeout(() => {
        setEmail('');
        setRole('staff');
      }, 300);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentLanguage.code === 'vi' ? 'Mời người dùng mới' : 'Invite New User'}
          </DialogTitle>
          <DialogDescription>
            {currentLanguage.code === 'vi' 
              ? 'Gửi lời mời đến email của người dùng để thêm họ vào hệ thống.' 
              : 'Send an invitation to a user\'s email to add them to the system.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              {currentLanguage.code === 'vi' ? 'Địa chỉ email' : 'Email address'}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">
              {currentLanguage.code === 'vi' ? 'Vai trò' : 'Role'}
            </Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue placeholder={currentLanguage.code === 'vi' ? 'Chọn vai trò' : 'Select role'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  {currentLanguage.code === 'vi' ? 'Quản trị viên' : 'Admin'}
                </SelectItem>
                <SelectItem value="manager">
                  {currentLanguage.code === 'vi' ? 'Quản lý' : 'Manager'}
                </SelectItem>
                <SelectItem value="staff">
                  {currentLanguage.code === 'vi' ? 'Nhân viên' : 'Staff'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {currentLanguage.code === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isSubmitting || !email}>
              {isSubmitting
                ? (currentLanguage.code === 'vi' ? 'Đang gửi...' : 'Sending...')
                : (currentLanguage.code === 'vi' ? 'Gửi lời mời' : 'Send Invitation')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
