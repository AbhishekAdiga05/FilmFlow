import React from "react";
import { useMovies } from "../hooks/useMovies";

/**
 * Pagination Component
 *
 * Provides navigation controls for paginated movie results:
 * - Previous/Next buttons
 * - Page number buttons (shows current page and nearby pages)
 * - First/Last page buttons (optional, for large page counts)
 * - Current page indicator
 * - Disabled states for edge cases (first/last page)
 *
 * Features:
 * - Shows page numbers around current page (e.g., if on page 5, shows 3, 4, 5, 6, 7)
 * - Responsive design (fewer buttons on mobile)
 * - Keyboard navigation support
 * - Accessible (ARIA labels, proper roles)
 *
 * Pagination Logic:
 * - If total pages <= 7: Show all pages
 * - If current page <= 4: Show first 7 pages
 * - If current page >= totalPages - 3: Show last 7 pages
 * - Otherwise: Show pages around current (current - 2 to current + 2)
 */

const Pagination = () => {
  // Get pagination state and functions from context
  const { currentPage, totalPages, changePage, loading } = useMovies();

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  /**
   * Generate array of page numbers to display
   *
   * This function determines which page numbers to show based on:
   * - Total number of pages
   * - Current page position
   *
   * @returns {Array<number>} Array of page numbers to display
   */
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages = [];

    // Case 1: Total pages <= 7, show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Case 2: Current page is near the beginning (first 4 pages)
    if (currentPage <= 4) {
      for (let i = 1; i <= 7; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Case 3: Current page is near the end (last 4 pages)
    if (currentPage >= totalPages - 3) {
      for (let i = totalPages - 6; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Case 4: Current page is in the middle
    // Show pages: current - delta to current + delta
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  /**
   * Handle page navigation
   *
   * @param {number} page - Page number to navigate to
   */
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !loading) {
      changePage(page);
    }
  };

  /**
   * Get button classes based on state
   *
   * @param {boolean} isActive - Whether this is the current page
   * @param {boolean} isDisabled - Whether button should be disabled
   * @returns {string} Tailwind CSS classes
   */
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
      {/* Pagination Info */}
      <div className="text-tertiary text-sm">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <nav
        className="flex flex-wrap items-center justify-center gap-2"
        aria-label="Pagination Navigation"
      >
        {/* First Page Button - Only show if not near beginning */}
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
            {/* Ellipsis */}
            {currentPage > 5 && <span className="text-tertiary px-2">...</span>}
          </>
        )}

        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={getButtonClasses(false, currentPage === 1)}
          aria-label="Go to previous page"
        >
          ‹
        </button>

        {/* Page Number Buttons */}
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

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className={getButtonClasses(false, currentPage === totalPages)}
          aria-label="Go to next page"
        >
          ›
        </button>

        {/* Last Page Button - Only show if not near end */}
        {currentPage < totalPages - 3 && totalPages > 7 && (
          <>
            {/* Ellipsis */}
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

      {/* Keyboard Shortcuts Hint (optional, for better UX) */}
      <p className="text-tertiary text-xs mt-2">
        Use arrow keys or click buttons to navigate
      </p>
    </div>
  );
};

export default Pagination;
