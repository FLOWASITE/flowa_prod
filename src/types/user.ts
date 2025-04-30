
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: 'admin' | 'manager' | 'staff';
  createdAt: string;
  lastSignIn?: string;
}

export type UserRole = 'admin' | 'manager' | 'staff';
