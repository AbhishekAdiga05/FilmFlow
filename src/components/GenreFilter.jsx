import React from "react";
import { useMovies } from "../hooks/useMovies";

const GenreFilter = () => {
  const { genres, selectedGenre, updateSelectedGenre, loading } = useMovies();

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-secondary mb-3">
        Filter by Genre:
      </h3>
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => updateSelectedGenre(null)}
          disabled={loading}
          className={`genre-chip ${selectedGenre === null ? "active" : ""}`}
        >
          All
        </button>

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
