
import React from 'react';
import { Layout } from '@/components/layout/Layout';

interface UserAccessControlProps {
  isLoading: boolean;
  hasAccess: boolean;
  children: React.ReactNode;
}

export const UserAccessControl: React.FC<UserAccessControlProps> = ({ 
  isLoading, 
  hasAccess, 
  children 
}) => {
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  // Force access to always be true
  return <>{children}</>;
};
