
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from '@/hooks/use-mobile';

interface TableFiltersProps {
  rowsPerPage: number;
  selectedPlatform: string;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPlatformChange: (platform: string) => void;
  uniquePlatforms: string[];
  getPlatformIcon: (platform: string) => React.ReactNode;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  rowsPerPage,
  selectedPlatform,
  handleRowsPerPageChange,
  onPlatformChange,
  uniquePlatforms,
  getPlatformIcon,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-5 justify-between bg-gradient-to-r from-gray-50 to-white border-b backdrop-blur-sm gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 w-full">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium whitespace-nowrap">{isMobile ? 'Dòng:' : 'Số dòng/trang:'}</label>
          <select 
            className="px-2 sm:px-3 py-1 border rounded-full text-sm bg-white shadow-sm hover:border-primary transition-colors"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-sm font-medium whitespace-nowrap">{isMobile ? 'Nền tảng:' : 'Nền tảng:'}</label>
          <Select value={selectedPlatform} onValueChange={onPlatformChange}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-full border shadow-sm hover:border-primary transition-colors">
              <SelectValue placeholder="Tất cả nền tảng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nền tảng</SelectItem>
              {uniquePlatforms.map(platform => (
                <SelectItem key={platform} value={platform}>
                  <div className="flex items-center">
                    <span className="mr-2">{getPlatformIcon(platform)}</span>
                    <span className="capitalize">{platform}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
