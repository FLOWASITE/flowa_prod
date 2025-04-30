
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

  if (!hasAccess) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">You don't have permission to view this page.</p>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};
