import React, { useState, useEffect, useRef } from "react";
import { useMovies } from "../hooks/useMovies";

/**
 * SearchBar Component
 *
 * This component provides a search input field with debounced search functionality.
 *
 * Key Features:
 * - Debounced input: Waits for user to stop typing before triggering search
 * - Real-time search updates: Updates context when user types
 * - Loading indicator: Shows search icon and loading state
 * - Clean UI: Modern search bar with icon
 *
 * Debouncing Explained:
 * - Prevents making API calls on every keystroke
 * - Waits 500ms after user stops typing before triggering search
 * - Improves performance and reduces API calls
 * - Example: User types "inception" -> waits for pause -> then searches
 *
 * Props: None (uses context for state management)
 */

const SearchBar = () => {
  // Get search query and update function from context
  const { searchQuery, updateSearchQuery, loading } = useMovies();

  // Local state for input field value
  // This allows us to update the input immediately while debouncing the context update
  const [inputValue, setInputValue] = useState(searchQuery);

  // Ref to store the timeout ID for debouncing
  // useRef persists across renders but doesn't trigger re-renders when changed
  const debounceTimerRef = useRef(null);

  /**
   * useEffect: Sync local input with context searchQuery
   *
   * This ensures the input field shows the current search query
   * when it's updated from other components (e.g., clearing search)
   */
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  /**
   * Handle input change event
   *
   * This function:
   * 1. Updates local state immediately (for responsive UI)
   * 2. Clears previous debounce timer
   * 3. Sets new timer to update context after delay
   *
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const value = e.target.value;

    // Update local state immediately (input field updates right away)
    setInputValue(value);

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer: update context after 500ms of no typing
    debounceTimerRef.current = setTimeout(() => {
      updateSearchQuery(value); // This triggers the search in context
    }, 500); // 500ms delay (debounce time)
  };

  /**
   * Handle form submission
   *
   * Prevents default form submission and triggers immediate search
   * (useful when user presses Enter)
   *
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    // Update context immediately
    updateSearchQuery(inputValue);
  };

  /**
   * Clear search and reset to popular movies
   */
  const handleClear = () => {
    setInputValue("");
    updateSearchQuery("");
    // Clear any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  /**
   * Cleanup: Clear timer when component unmounts
   * Prevents memory leaks from pending timers
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search Input Field */}
        <div className="relative">
          {/* Search Icon - Left side */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className={`h-5 w-5 ${
                loading ? "text-primary-500 animate-pulse" : "text-tertiary"
              }`}
              style={{ color: loading ? undefined : "var(--text-tertiary)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search for movies... (e.g., Inception, The Matrix)"
            className="search-input w-full pl-12 pr-24"
            aria-label="Search movies"
          />

          {/* Clear Button - Right side (only shows when there's text) */}
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-12 pr-4 flex items-center transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-tertiary)")
              }
              aria-label="Clear search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Loading Spinner - Right side (only shows when loading) */}
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
            </div>
          )}
        </div>

        {/* Search Hint Text */}
        <p className="text-tertiary mt-2 text-sm text-center">
          {searchQuery
            ? `Showing results for "${searchQuery}"`
            : "Showing popular movies"}
        </p>
      </form>
    </div>
  );
};

export default SearchBar;
