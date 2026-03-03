import React from "react";
import { useMovies } from "../hooks/useMovies";

const Pagination = () => {
  const { currentPage, totalPages, changePage, loading } = useMovies();

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const delta = 2;
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 4) {
      for (let i = 1; i <= 7; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage >= totalPages - 3) {
      for (let i = totalPages - 6; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !loading) {
      changePage(page);
    }
  };

  const getButtonClasses = (isActive, isDisabled = false) => {
    const baseClasses =
      "pagination-button focus:outline-none focus:ring-2 focus:ring-primary-500";

    if (isDisabled || loading) {
      return `${baseClasses} cursor-not-allowed`;
    }

    if (isActive) {
      return `${baseClasses} active shadow-lg transform scale-105`;
    }

    return baseClasses;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-8 gap-4">
      <div className="text-tertiary text-sm">
        Page {currentPage} of {totalPages}
      </div>

      <nav
        className="flex flex-wrap items-center justify-center gap-2"
        aria-label="Pagination Navigation"
      >
        {currentPage > 4 && totalPages > 7 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              disabled={loading}
              className={getButtonClasses(false, false)}
              aria-label="Go to first page"
            >
              ««
            </button>
            {currentPage > 5 && <span className="text-tertiary px-2">...</span>}
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={getButtonClasses(false, currentPage === 1)}
          aria-label="Go to previous page"
        >
          ‹
        </button>

        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            disabled={loading}
            className={getButtonClasses(pageNum === currentPage, false)}
            aria-label={`Go to page ${pageNum}`}
            aria-current={pageNum === currentPage ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className={getButtonClasses(false, currentPage === totalPages)}
          aria-label="Go to next page"
        >
          ›
        </button>

        {currentPage < totalPages - 3 && totalPages > 7 && (
          <>
            {currentPage < totalPages - 4 && (
              <span className="text-tertiary px-2">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={loading}
              className={getButtonClasses(false, false)}
              aria-label="Go to last page"
            >
              »»
            </button>
          </>
        )}
      </nav>

      <p className="text-tertiary text-xs mt-2">
        Use arrow keys or click buttons to navigate
      </p>
    </div>
  );
};

export default Pagination;
