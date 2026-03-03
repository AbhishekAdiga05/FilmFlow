import axios from "axios";

/**
 * API Service Layer
 *
 * This file handles all communication with The Movie Database (TMDB) API.
 * It centralizes API configuration, endpoints, and request handling.
 *
 * Key Responsibilities:
 * 1. Configure Axios instance with base URL and default parameters
 * 2. Provide functions to interact with TMDB API endpoints
 * 3. Handle API errors consistently
 * 4. Include API key in all requests
 */

// Get API key from environment variables
// You need to create a .env file in the root directory with: VITE_TMDB_API_KEY=your_api_key_here
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// TMDB API base URL
const BASE_URL = "https://api.themoviedb.org/3";

// Base URL for movie poster images from TMDB
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Create an Axios instance with default configuration
 * This instance will automatically include the API key in all requests
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Handle API errors consistently
 * This interceptor catches errors and logs them, but doesn't throw
 * The components can handle errors based on response status
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

/**
 * Search for movies by query string
 *
 * @param {string} query - The search query (movie title)
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise} Promise that resolves to search results
 *
 * API Endpoint: GET /search/movie
 * Returns: { page, results, total_pages, total_results }
 *
 * Example response structure:
 * {
 *   page: 1,
 *   results: [
 *     {
 *       id: 123,
 *       title: "Movie Title",
 *       overview: "Description...",
 *       release_date: "2023-01-01",
 *       poster_path: "/path/to/poster.jpg",
 *       vote_average: 8.5,
 *       ...
 *     }
 *   ],
 *   total_pages: 5,
 *   total_results: 100
 * }
 */
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await apiClient.get("/search/movie", {
      params: {
        query: query.trim(),
        page,
        include_adult: false, // Exclude adult content from results
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error.message}`);
  }
};

/**
 * Get detailed information about a specific movie by ID
 *
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise} Promise that resolves to movie details
 *
 * API Endpoint: GET /movie/{movie_id}
 * Returns: Complete movie object with all details including:
 * - Basic info (title, overview, release_date, etc.)
 * - Genres, production companies, countries
 * - Runtime, budget, revenue
 * - Cast and crew information
 * - Videos (trailers, teasers, etc.)
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get movie details: ${error.message}`);
  }
};

/**
 * Get a list of popular movies
 *
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise} Promise that resolves to a list of popular movies
 *
 * API Endpoint: GET /movie/popular
 */
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await apiClient.get("/movie/popular", {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get popular movies: ${error.message}`);
  }
};

/**
 * Get a list of top-rated movies
 *
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise} Promise that resolves to a list of top-rated movies
 *
 * API Endpoint: GET /movie/top_rated
 */
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await apiClient.get("/movie/top_rated", {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get top-rated movies: ${error.message}`);
  }
};

/**
 * Get movie recommendations for a specific movie
 *
 * @param {number} movieId - The TMDB movie ID
 * @returns {Promise} Promise that resolves to a list of recommended movies
 *
 * API Endpoint: GET /movie/{movie_id}/recommendations
 */
export const getRecommendedMovies = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/recommendations`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get recommended movies: ${error.message}`);
  }
};

/**
 * Get similar movies for a given movie ID
 *
 * @param {number} movieId - The TMDB movie ID
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise} Promise that resolves to similar movies
 *
 * API Endpoint: GET /movie/{movie_id}/similar
 * Returns: List of movies similar to the given movie
 */
export const getSimilarMovies = async (movieId, page = 1) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/similar`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get similar movies: ${error.message}`);
  }
};

/**
 * Get list of all movie genres
 *
 * @returns {Promise} Promise that resolves to genres list
 *
 * API Endpoint: GET /genre/movie/list
 * Returns: { genres: [{ id, name }] }
 */
export const getGenres = async () => {
  try {
    const response = await apiClient.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    throw new Error(`Failed to get genres: ${error.message}`);
  }
};

/**
 * Discover movies by genre
 *
 * @param {number} genreId - Genre ID to filter by
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise} Promise that resolves to movies in that genre
 *
 * API Endpoint: GET /discover/movie
 * Returns: Paginated list of movies filtered by genre
 */
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await apiClient.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get movies by genre: ${error.message}`);
  }
};

/**
 * Helper function to get full image URL
 *
 * @param {string} path - Image path from TMDB API
 * @param {string} size - Image size (w200, w300, w500, original, etc.)
 * @returns {string} Complete URL to the image
 *
 * TMDB provides different image sizes:
 * - w200, w300: Small thumbnails
 * - w500: Medium size (good for cards)
 * - w780, w1280: Large sizes (good for detail pages)
 * - original: Full resolution
 */
export const getImageUrl = (path, size = "w500") => {
  if (!path) {
    // Return placeholder image if no poster path is available
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
