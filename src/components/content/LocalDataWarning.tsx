
import React from 'react';
import { AlertCircle, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LocalDataWarningProps {
  useLocalData: boolean;
}

export const LocalDataWarning: React.FC<LocalDataWarningProps> = ({ useLocalData }) => {
  if (!useLocalData) return null;
  
  return (
    <Alert variant="warning" className="my-4">
      <Database className="h-4 w-4" />
      <AlertTitle>Dữ liệu mẫu</AlertTitle>
      <AlertDescription>
        Ứng dụng đang sử dụng dữ liệu mẫu thay vì kết nối với cơ sở dữ liệu. Các thay đổi sẽ không được lưu trữ.
      </AlertDescription>
    </Alert>
  );
};
