
import React from 'react';
import { TableFilters } from '../table/TableFilters';
import { Checkbox } from '@/components/ui/checkbox';

interface GridHeaderProps {
  rowsPerPage: number;
  selectedPlatform: string;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPlatformChange: (platform: string) => void;
  uniquePlatforms: string[];
  showBatchSelection: boolean;
  hasItems: boolean;
  allSelected: boolean;
  onSelectAllChange: (checked: boolean) => void;
}

export const GridHeader: React.FC<GridHeaderProps> = ({
  rowsPerPage,
  selectedPlatform,
  handleRowsPerPageChange,
  onPlatformChange,
  uniquePlatforms,
  showBatchSelection,
  hasItems,
  allSelected,
  onSelectAllChange
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <TableFilters
        rowsPerPage={rowsPerPage}
        selectedPlatform={selectedPlatform}
        handleRowsPerPageChange={handleRowsPerPageChange}
        onPlatformChange={onPlatformChange}
        uniquePlatforms={uniquePlatforms}
        getPlatformIcon={() => null} // We'll handle icons in the card
      />
      
      {showBatchSelection && hasItems && (
        <div className="flex items-center gap-2">
          <Checkbox 
            id="select-all"
            className="border-gray-400"
            onCheckedChange={onSelectAllChange}
            checked={hasItems && allSelected}
          />
          <label htmlFor="select-all" className="text-sm text-gray-700 cursor-pointer">
            Chọn tất cả
          </label>
        </div>
      )}
    </div>
  );
};
