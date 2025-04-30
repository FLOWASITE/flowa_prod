
import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { toast } from 'sonner';

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
  // Debug the access control
  useEffect(() => {
    console.log("Access control - isLoading:", isLoading, "hasAccess:", hasAccess);
  }, [isLoading, hasAccess]);

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
    // Notify the user they don't have access
    toast.error("Bạn không có quyền truy cập trang này");
    
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Truy cập bị từ chối</h2>
          <p className="text-gray-500">Bạn không có quyền truy cập vào trang này.</p>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};
