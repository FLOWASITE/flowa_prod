
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TablePaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  handlePageChange?: (page: number) => void;
  onPageChange?: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  rowsPerPage,
  totalItems,
  handlePageChange,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  
  // Function to change page handling both callback variations
  const changePage = (page: number) => {
    if (handlePageChange) {
      handlePageChange(page);
    }
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // Skip rendering if there's only one page
  if (totalPages <= 1) return null;
  
  // Function to generate page numbers
  const generatePagination = () => {
    const pages = [];
    const maxButtons = 5; // Maximum number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    // Adjust startPage if endPage is at max
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => changePage(1)}
        >
          1
        </Button>
      );
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }
    
    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => changePage(i)}
        >
          {i}
        </Button>
      );
    }
    
    // Always show last page
    if (endPage < totalPages) {
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }
      
      pages.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => changePage(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }
    
    return pages;
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => changePage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center">
        {generatePagination()}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
