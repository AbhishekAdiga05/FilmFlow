import React from "react";
import { useMovies } from "../hooks/useMovies";

/**
 * GenreFilter Component
 *
 * Displays genre filter chips that allow users to filter movies by genre.
 *
 * Features:
 * - Shows all available genres as clickable chips
 * - Highlights active genre
 * - "All" button to clear filters
 * - Horizontal scrollable on mobile
 */

const GenreFilter = () => {
  const { genres, selectedGenre, updateSelectedGenre, loading } = useMovies();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-secondary mb-3">
        Filter by Genre:
      </h3>
      <div className="flex flex-wrap gap-2 items-center">
        {/* All/Clear Filter Button */}
        <button
          onClick={() => updateSelectedGenre(null)}
          disabled={loading}
          className={`genre-chip ${selectedGenre === null ? "active" : ""}`}
        >
          All
        </button>

        {/* Genre Filter Chips */}
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => updateSelectedGenre(genre.id)}
            disabled={loading}
            className={`genre-chip ${
              selectedGenre === genre.id ? "active" : ""
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
