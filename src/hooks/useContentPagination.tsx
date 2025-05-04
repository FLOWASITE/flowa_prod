
import { useState } from 'react';

export const useContentPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'accordion'>('table');

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    setCurrentPage(1); // Reset to first page
  };

  const handleViewModeChange = (mode: 'table' | 'grid' | 'accordion') => {
    setViewMode(mode);
  };

  return {
    currentPage,
    rowsPerPage,
    selectedPlatform,
    viewMode,
    handlePageChange,
    handleRowsPerPageChange,
    handlePlatformChange,
    handleViewModeChange
  };
};
