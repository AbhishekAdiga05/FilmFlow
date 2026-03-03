import React, { useState, useEffect, useRef } from "react";
import { useMovies } from "../hooks/useMovies";

const SearchBar = () => {
  const { searchQuery, updateSearchQuery, loading } = useMovies();

  const [inputValue, setInputValue] = useState(searchQuery);

  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateSearchQuery(value);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    updateSearchQuery(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    updateSearchQuery("");
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-10">
      <form
        onSubmit={handleSubmit}
        className="relative bg-primary border border-border-color shadow-lg rounded-full"
      >
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <svg
            className={`h-5 w-5 transition-colors duration-300 ${
              loading ? "text-blue-500 animate-pulse" : "text-tertiary"
            }`}
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

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for any movie..."
          className="w-full bg-transparent text-primary text-lg pl-14 pr-20 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
          aria-label="Search movies"
        />

        {inputValue && !loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-full text-tertiary hover:bg-tertiary hover:text-primary transition-colors duration-300"
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
          </div>
        )}

        {loading && (
          <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </form>
      {searchQuery && (
        <p className="text-tertiary mt-4 text-sm text-center">
          Showing results for:
          <span className="font-semibold text-primary"> "{searchQuery}"</span>
        </p>
      )}
    </div>
  );
};

export default SearchBar;
