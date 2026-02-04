import React, { createContext, useContext, useState, useEffect } from "react";
import {
  searchMovies,
  getPopularMovies,
  getGenres,
  getMoviesByGenre,
} from "../services/api";

/**
 * MovieContext - Global State Management for Movies
 *
 * This context provides centralized state management for:
 * - Movies list and search results
 * - Search query
 * - Pagination (current page, total pages)
 * - Loading states
 * - Error handling
 *
 * Why use Context API?
 * - Allows multiple components to access and update shared state
 * - Avoids prop drilling (passing props through many component levels)
 * - Provides a single source of truth for movie data
 */

// Create the context object
// This context will hold the state and functions to update it
const MovieContext = createContext();

/**
 * MovieProvider Component
 *
 * This component wraps the app and provides movie-related state to all children.
 * It manages:
 * - movies: Array of movie objects from API
 * - searchQuery: Current search term
 * - currentPage: Current page number for pagination
 * - totalPages: Total number of pages available
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if something goes wrong
 *
 * @param {object} props - React props
 * @param {React.ReactNode} props.children - Child components that need access to context
 */
export const MovieProvider = ({ children }) => {
  // State declarations using React hooks

  // Array to store movie data from API
  const [movies, setMovies] = useState([]);

  // Current search query entered by user
  const [searchQuery, setSearchQuery] = useState("");

  // Current page number for pagination (starts at 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Total number of pages available from API
  const [totalPages, setTotalPages] = useState(1);

  // Loading state to show spinners/loaders while fetching data
  const [loading, setLoading] = useState(false);

  // Error message to display if API call fails
  const [error, setError] = useState(null);

  // Genre-related state
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  /**
   * Fetch genres on component mount
   */
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresList = await getGenres();
        setGenres(genresList);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  /**
   * useEffect hook runs when component mounts or when dependencies change
   *
   * This effect fetches movies when:
   * 1. Component first loads (shows popular movies)
   * 2. Search query changes
   * 3. Current page changes
   * 4. Selected genre changes
   *
   * Dependencies: [searchQuery, currentPage, selectedGenre]
   * When any changes, this effect runs again
   */
  useEffect(() => {
    const fetchMovies = async () => {
      // Clear previous errors
      setError(null);

      // Show loading indicator
      setLoading(true);

      try {
        let data;

        // Priority: Search > Genre Filter > Popular Movies
        if (searchQuery.trim()) {
          data = await searchMovies(searchQuery, currentPage);
        } else if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre, currentPage);
        } else {
          data = await getPopularMovies(currentPage);
        }

        // Update state with fetched data
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);

        // Reset to page 1 if search query changed and we're not on page 1
        // This ensures we show first page of results when searching
        if (currentPage > data.total_pages) {
          setCurrentPage(1);
        }
      } catch (err) {
        // Handle errors gracefully
        setError(err.message || "Failed to fetch movies. Please try again.");
        setMovies([]); // Clear movies on error
      } finally {
        // Always hide loading indicator, even if there was an error
        setLoading(false);
      }
    };

    // Call the async function
    fetchMovies();
  }, [searchQuery, currentPage, selectedGenre]); // Re-run when these values change

  /**
   * Function to update search query
   * This triggers a new search when called
   *
   * @param {string} query - The search term entered by user
   */
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null); // Clear genre filter when searching
    setCurrentPage(1); // Reset to first page when searching
  };

  /**
   * Function to update selected genre
   * This triggers filtering by genre
   *
   * @param {number} genreId - The genre ID to filter by (null for all)
   */
  const updateSelectedGenre = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery(""); // Clear search when filtering by genre
    setCurrentPage(1); // Reset to first page
  };

  /**
   * Function to change the current page
   * Used by Pagination component
   *
   * @param {number} page - The page number to navigate to
   */
  const changePage = (page) => {
    // Ensure page is within valid range
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages for better UX
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Function to go to next page
   */
  const nextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  /**
   * Function to go to previous page
   */
  const prevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  // Object containing all state and functions to be provided to children
  const value = {
    // State values
    movies,
    searchQuery,
    currentPage,
    totalPages,
    loading,
    error,
    genres,
    selectedGenre,

    // Functions to update state
    updateSearchQuery,
    updateSelectedGenre,
    changePage,
    nextPage,
    prevPage,
  };

  // Provide the context value to all children components
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

/**
 * Custom hook to access MovieContext
 *
 * This hook provides an easy way for components to access the context.
 * It throws an error if used outside of MovieProvider.
 *
 * Usage in components:
 *   const { movies, loading, updateSearchQuery } = useMovies()
 *
 * @returns {object} Context value containing state and functions
 */
export const useMovies = () => {
  const context = useContext(MovieContext);

  // Safety check: ensure hook is used within provider
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }

  return context;
};
