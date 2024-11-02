import React, { useState } from "react";
import { styles } from "./PaginationComponent.styles";

interface PaginationComponentProps {
  resultsPerPage: number;
  total?: number;
}

interface PaginationComponentResponse {
  totalPages: number;
  PaginationComponent: () => React.ReactElement;
  currentPage?: number;
}

export const usePaginationComponent = ({
  total,
  resultsPerPage,
}: PaginationComponentProps): PaginationComponentResponse => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = total ? Math.ceil(total / resultsPerPage) : 1;
  const visiblePages = () => {
    const pages: string[] = [];
    if (currentPage > 2) {
      pages.push("1");
    }
    if (currentPage > 3) {
      pages.push("...");
    }
    if (currentPage > 1) {
      pages.push(`${currentPage - 1}`);
    }
    pages.push(currentPage.toString());
    if (currentPage < totalPages) {
      pages.push(`${currentPage + 1}`);
    }
    if (currentPage + 2 < totalPages) {
      pages.push("...");
    }
    if (currentPage + 1 < totalPages) {
      pages.push(`${totalPages}`);
    }
    return pages;
  };

  const PaginationComponent = () => (
    <div className="flex justify-center gap-4">
      {visiblePages().map((page, index) => (
        <button
          key={index}
          style={
            currentPage === Number(page)
              ? styles.activePageButton
              : styles.pageButton
          }
          onClick={() => !!Number(page) && setCurrentPage(Number(page))}
        >
          {page}
        </button>
      ))}
    </div>
  );
  return { totalPages, PaginationComponent, currentPage };
};
