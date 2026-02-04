import React from "react";
import MovieCard from "./MovieCard";
import { useMovies } from "../hooks/useMovies";

/**
 * MovieList Component
 *
 * Displays a grid of movie cards with:
 * - Responsive grid layout (adapts to screen size)
 * - Loading skeleton placeholders while fetching
 * - Empty state message when no movies found
 * - Error message display if API call fails
 *
 * Responsive Grid:
 * - Mobile (default): 1 column
 * - Tablet (md: 640px+): 2 columns
 * - Desktop (lg: 1024px+): 3 columns
 * - Large Desktop (xl: 1280px+): 4 columns
 *
 * This component uses the movies array from MovieContext
 * and displays each movie using the MovieCard component.
 */

const MovieList = () => {
  // Get movies, loading state, and error from context
  const { movies, loading, error, searchQuery } = useMovies();

  /**
   * Loading Skeleton Component
   *
   * Shows placeholder cards while data is loading
   * Provides better UX than blank screen
   */
  const LoadingSkeleton = () => {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                    gap-6 animate-pulse"
      >
        {[...Array(12)].map((_, index) => (
          <div key={index} className="movie-card">
            {/* Poster skeleton */}
            <div
              className="aspect-[2/3]"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            ></div>
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div
                className="h-6 rounded w-3/4"
                style={{ backgroundColor: "var(--bg-tertiary)" }}
              ></div>
              <div
                className="h-4 rounded w-1/2"
                style={{ backgroundColor: "var(--bg-tertiary)" }}
              ></div>
              <div className="space-y-2">
                <div
                  className="h-3 rounded"
                  style={{ backgroundColor: "var(--bg-tertiary)" }}
                ></div>
                <div
                  className="h-3 rounded w-5/6"
                  style={{ backgroundColor: "var(--bg-tertiary)" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /**
   * Empty State Component
   *
   * Shows when no movies are found (e.g., search returned no results)
   */
  const EmptyState = () => {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Icon */}
          <svg
            className="mx-auto h-24 w-24 mb-4"
            style={{ color: "var(--text-tertiary)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* Message */}
          <h3 className="text-primary text-2xl font-bold mb-2">
            {searchQuery
              ? `No movies found for "${searchQuery}"`
              : "No movies available"}
          </h3>
          <p className="text-secondary mb-6">
            {searchQuery
              ? "Try searching with different keywords or check your spelling."
              : "Please try again later."}
          </p>

          {/* Suggestions */}
          {searchQuery && (
            <div className="text-left container-secondary rounded-lg p-4 border-theme border">
              <p className="text-sm text-secondary mb-2 font-semibold">
                Search tips:
              </p>
              <ul className="text-sm text-tertiary space-y-1 list-disc list-inside">
                <li>Try using the movie title</li>
                <li>Check spelling and try synonyms</li>
                <li>Use specific keywords</li>
                <li>Clear search to see popular movies</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  /**
   * Error State Component
   *
   * Shows when API call fails or encounters an error
   */
  const ErrorState = () => {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Error Icon */}
          <svg
            className="mx-auto h-24 w-24 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* Error Message */}
          <h3 className="text-2xl font-bold text-primary mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-secondary mb-6">{error}</p>

          {/* Help Text */}
          <div className="error-message text-left rounded-lg p-4">
            <p className="text-sm font-semibold">Possible causes:</p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Network connection issue</li>
              <li>TMDB API key not configured</li>
              <li>API rate limit exceeded</li>
              <li>Invalid API request</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              Check the browser console for more details.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Show loading skeleton while fetching data
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show error message if API call failed
  if (error) {
    return <ErrorState />;
  }

  // Show empty state if no movies found
  if (!movies || movies.length === 0) {
    return <EmptyState />;
  }

  // Render movie grid
  return (
    <div className="w-full">
      {/* Results Header - Shows count and current query */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {searchQuery ? "Search Results" : "Popular Movies"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Found {movies.length} movie{movies.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
