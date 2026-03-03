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

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

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

  useEffect(() => {
    const fetchMovies = async () => {
      setError(null);

      setLoading(true);

      try {
        let data;

        if (searchQuery.trim()) {
          data = await searchMovies(searchQuery, currentPage);
        } else if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre, currentPage);
        } else {
          data = await getPopularMovies(currentPage);
        }

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);

        if (currentPage > data.total_pages) {
          setCurrentPage(1);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch movies. Please try again.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage, selectedGenre]);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const updateSelectedGenre = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const value = {
    movies,
    searchQuery,
    currentPage,
    totalPages,
    loading,
    error,
    genres,
    selectedGenre,

    updateSearchQuery,
    updateSelectedGenre,
    changePage,
    nextPage,
    prevPage,
  };

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
