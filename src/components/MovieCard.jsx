import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const { isFavorite, toggleFavorite } = useFavorites();

  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Release date TBA";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Release date TBA";
    }
  };

  const formatRating = (rating) => {
    if (!rating) return "N/A";
    return `${Math.round(rating * 10)}%`;
  };

  const getRatingColor = (rating) => {
    if (!rating) return "bg-gray-600";
    const percentage = rating * 10;
    if (percentage >= 70) return "bg-green-600";
    if (percentage >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <div
      onClick={handleClick}
      className="movie-card cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View details for ${movie.title}`}
    >
      <div
        className="relative overflow-hidden aspect-[2/3]"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover transition-transform duration-300 
                   group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
          }}
        />

        <div
          className={`absolute top-3 right-3 ${getRatingColor(
            movie.vote_average,
          )} text-white px-3 py-1 rounded-full font-semibold text-sm 
                   shadow-lg backdrop-blur-sm bg-opacity-90`}
        >
          {formatRating(movie.vote_average)}
        </div>

        <button
          onClick={handleFavoriteClick}
          className={`favorite-button absolute top-3 left-3 z-10 ${
            favorited ? "favorited" : ""
          }`}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          title={favorited ? "Remove from watchlist" : "Add to watchlist"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={favorited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent 
                      to-transparent opacity-0 group-hover:opacity-60 transition-opacity 
                      duration-300"
        ></div>
      </div>

      <div className="p-4">
        <h3
          className="movie-title text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem] 
                     group-hover:text-primary-400 transition-colors"
        >
          {movie.title}
        </h3>

        <p className="movie-meta text-sm mb-3">
          {formatDate(movie.release_date)}
        </p>

        <p className="movie-overview text-sm line-clamp-3">
          {truncateText(movie.overview, 120)}
        </p>
      </div>

      <div className="px-4 pb-4">
        <span
          className="text-primary-500 text-sm font-semibold opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300"
        >
          View Details →
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
