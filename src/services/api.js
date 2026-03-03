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

const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await apiClient.get("/search/movie", {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error.message}`);
  }
};

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

export const getRecommendedMovies = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/recommendations`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get recommended movies: ${error.message}`);
  }
};

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

export const getGenres = async () => {
  try {
    const response = await apiClient.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    throw new Error(`Failed to get genres: ${error.message}`);
  }
};

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

export const getImageUrl = (path, size = "w500") => {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
