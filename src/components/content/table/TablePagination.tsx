
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  rowsPerPage,
  totalItems,
  handlePageChange,
}) => {
  const pages = Math.ceil(totalItems / rowsPerPage);
  if (pages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {[...Array(pages)].map((_, i) => {
          const pageNumber = i + 1;
          if (
            pageNumber === 1 || 
            pageNumber === pages || 
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  isActive={currentPage === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            (pageNumber === currentPage - 2 && currentPage > 3) || 
            (pageNumber === currentPage + 2 && currentPage < pages - 2)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < pages && handlePageChange(currentPage + 1)} 
            className={currentPage === pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
