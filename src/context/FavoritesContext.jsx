import React, { createContext, useState, useEffect, useContext } from "react";

const FavoritesContext = createContext();

/**
 * FavoritesContext Provider
 *
 * Manages the user's favorite/watchlist movies with localStorage persistence.
 *
 * Features:
 * - Add/remove movies from favorites
 * - Check if a movie is favorited
 * - Persist favorites across sessions
 * - Get all favorite movies
 */

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorites:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Add a movie to favorites
   * @param {Object} movie - Movie object to add
   */
  const addFavorite = (movie) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  /**
   * Remove a movie from favorites
   * @param {number} movieId - ID of movie to remove
   */
  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  /**
   * Toggle movie favorite status
   * @param {Object} movie - Movie object to toggle
   */
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  /**
   * Check if a movie is in favorites
   * @param {number} movieId - ID of movie to check
   * @returns {boolean}
   */
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to use favorites context
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
