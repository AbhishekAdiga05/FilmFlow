import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import ThemeToggle from "../components/ThemeToggle";
import GenreFilter from "../components/GenreFilter";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

/**
 * Home Page Component
 *
 * This is the main landing page of the application.
 * It displays:
 * - Search bar for finding movies
 * - List of movies (either search results or popular movies)
 * - Pagination controls for navigating through pages
 *
 * Layout:
 * - Header section with search
 * - Main content area with movie grid
 * - Footer section with pagination
 *
 * This page uses the MovieContext for state management.
 * All components (SearchBar, MovieList, Pagination) consume
 * the same context, ensuring they stay in sync.
 */

const Home = () => {
  const { favorites, favoritesCount } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="container-primary min-h-screen">
      {/* Header Section */}
      <header className="container-secondary border-b border-theme py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Navbar with Title and Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-center">
              <h1 className="text-4xl font-bold text-primary">
                🎬 FilmFlow
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-center text-secondary mb-6">
            Discover your next favorite film
          </p>

          {/* Search Bar */}
          <SearchBar />

          {/* View Toggle: All Movies / Favorites */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setShowFavorites(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                !showFavorites ? "btn-primary" : "btn-secondary"
              }`}
            >
              All Movies
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                showFavorites ? "btn-primary" : "btn-secondary"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              My Watchlist ({favoritesCount})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {showFavorites ? (
          /* Favorites View */
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Your Watchlist
            </h2>
            {favorites.length === 0 ? (
              <div className="text-center py-12">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Your watchlist is empty
                </h3>
                <p className="text-secondary mb-6">
                  Add movies to your watchlist by clicking the heart icon on any
                  movie card
                </p>
                <button
                  onClick={() => setShowFavorites(false)}
                  className="btn-primary px-6 py-3"
                >
                  Browse Movies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* All Movies View */
          <>
            {/* Genre Filter */}
            <GenreFilter />

            {/* Movie List */}
            <MovieList />

            {/* Pagination */}
            <Pagination />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="container-secondary border-t border-theme py-6 mt-12">
        <div className="container mx-auto px-4 max-w-7xl text-center text-tertiary text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              The Movie Database (TMDB)
            </a>
          </p>
          <p className="mt-2">Data provided by TMDB API</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
