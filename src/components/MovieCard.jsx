import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

/**
 * MovieCard Component
 *
 * Displays a single movie in a card format with:
 * - Movie poster image
 * - Movie title
 * - Release date
 * - Rating (vote average)
 * - Overview (description) - truncated
 *
 * Features:
 * - Clickable card that navigates to movie detail page
 * - Hover effects for better UX
 * - Responsive design (adapts to screen size)
 * - Handles missing images gracefully
 * - Shows placeholder for movies without posters
 *
 * Props:
 * @param {object} movie - Movie object from TMDB API
 * @param {number} movie.id - Movie ID (used for navigation)
 * @param {string} movie.title - Movie title
 * @param {string} movie.release_date - Release date (YYYY-MM-DD format)
 * @param {number} movie.vote_average - Average rating (0-10 scale)
 * @param {string} movie.poster_path - Path to poster image
 * @param {string} movie.overview - Movie description
 */

const MovieCard = ({ movie }) => {
  // useNavigate hook from React Router to programmatically navigate
  // This allows us to navigate to movie detail page when card is clicked
  const navigate = useNavigate();

  // Favorites context for watchlist functionality
  const { isFavorite, toggleFavorite } = useFavorites();

  // Check if this movie is favorited
  const favorited = isFavorite(movie.id);

  /**
   * Handle favorite button click
   * Prevents card click event from triggering
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    toggleFavorite(movie);
  };

  /**
   * Format release date to readable format
   *
   * Converts "2023-12-25" to "December 25, 2023"
   * If date is missing, returns "Release date TBA"
   *
   * @param {string} dateString - Date string from API (YYYY-MM-DD)
   * @returns {string} Formatted date string
   */
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

  /**
   * Format rating to percentage
   *
   * Converts 0-10 scale to 0-100% for display
   * Example: 8.5 -> 85%
   *
   * @param {number} rating - Vote average (0-10)
   * @returns {string} Formatted rating percentage
   */
  const formatRating = (rating) => {
    if (!rating) return "N/A";
    return `${Math.round(rating * 10)}%`;
  };

  /**
   * Get rating color based on score
   *
   * Different colors for different rating ranges:
   * - Green: 70% and above (good)
   * - Yellow: 50-69% (average)
   * - Red: Below 50% (poor)
   *
   * @param {number} rating - Vote average (0-10)
   * @returns {string} Tailwind CSS color class
   */
  const getRatingColor = (rating) => {
    if (!rating) return "bg-gray-600";
    const percentage = rating * 10;
    if (percentage >= 70) return "bg-green-600";
    if (percentage >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  /**
   * Truncate text to specified length
   *
   * Cuts off overview text if it's too long and adds ellipsis
   *
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length (default: 150)
   * @returns {string} Truncated text with ellipsis
   */
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  /**
   * Handle card click - navigate to movie detail page
   */
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  // Get full image URL from API service helper
  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <div
      onClick={handleClick}
      className="movie-card cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Allow keyboard navigation (Enter or Space to click)
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View details for ${movie.title}`}
    >
      {/* Movie Poster Image */}
      <div
        className="relative overflow-hidden aspect-[2/3]"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover transition-transform duration-300 
                   group-hover:scale-110"
          loading="lazy" // Lazy load images for better performance
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
          }}
        />

        {/* Rating Badge - Overlay on poster */}
        <div
          className={`absolute top-3 right-3 ${getRatingColor(
            movie.vote_average,
          )} text-white px-3 py-1 rounded-full font-semibold text-sm 
                   shadow-lg backdrop-blur-sm bg-opacity-90`}
        >
          {formatRating(movie.vote_average)}
        </div>

        {/* Favorite Button - Top Left */}
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

        {/* Gradient Overlay on Hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent 
                      to-transparent opacity-0 group-hover:opacity-60 transition-opacity 
                      duration-300"
        ></div>
      </div>

      {/* Movie Info Section */}
      <div className="p-4">
        {/* Movie Title */}
        <h3
          className="movie-title text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem] 
                     group-hover:text-primary-400 transition-colors"
        >
          {movie.title}
        </h3>

        {/* Release Date */}
        <p className="movie-meta text-sm mb-3">
          {formatDate(movie.release_date)}
        </p>

        {/* Overview/Description - Truncated */}
        <p className="movie-overview text-sm line-clamp-3">
          {truncateText(movie.overview, 120)}
        </p>
      </div>

      {/* View Details Hint - Appears on hover */}
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
