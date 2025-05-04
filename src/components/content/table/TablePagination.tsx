
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TablePaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
  handlePageChange?: (page: number) => void; // For backwards compatibility
  onRowsPerPageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  handlePageChange,
  onRowsPerPageChange
}) => {
  const isMobile = useIsMobile();
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const displayPageCount = isMobile ? 3 : 5;
  
  // Use either onPageChange or handlePageChange (for backward compatibility)
  const handleChange = onPageChange || handlePageChange;
  
  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const halfDisplayed = Math.floor(displayPageCount / 2);
    let startPage = Math.max(1, currentPage - halfDisplayed);
    let endPage = Math.min(totalPages, startPage + displayPageCount - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < displayPageCount) {
      startPage = Math.max(1, endPage - displayPageCount + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  const pageRange = getPageRange();
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{Math.min((currentPage - 1) * rowsPerPage + 1, totalItems)}</span> to{' '}
        <span className="font-medium">{Math.min(currentPage * rowsPerPage, totalItems)}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {!isMobile && currentPage > 2 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="icon"
              onClick={() => handleChange(1)}
              className="h-8 w-8 p-0"
            >
              1
            </Button>
            
            {currentPage > 3 && (
              <span className="px-2">...</span>
            )}
          </>
        )}
        
        {pageRange.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => handleChange(page)}
            className="h-8 w-8 p-0"
          >
            {page}
          </Button>
        ))}
        
        {!isMobile && currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && (
              <span className="px-2">...</span>
            )}
            
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="icon"
              onClick={() => handleChange(totalPages)}
              className="h-8 w-8 p-0"
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
