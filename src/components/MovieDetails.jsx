import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../services/api";
import MovieCard from "./MovieCard";
import ThemeToggle from "./ThemeToggle";
import { useFavorites } from "../context/FavoritesContext";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError("Movie ID not provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    if (amount >= 1_000_000_000) {
      return `$${(amount / 1_000_000_000).toFixed(1)}B`;
    }
    if (amount >= 1_000_000) {
      return `$${(amount / 1_000_000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getRatingColor = (rating) => {
    if (!rating) return "bg-gray-600";
    const percentage = rating * 10;
    if (percentage >= 70) return "bg-green-600";
    if (percentage >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  if (loading) {
    return (
      <div className="container-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"></div>
          <p className="text-secondary">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container-primary min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
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
          <h2 className="text-2xl font-bold text-primary mb-2">
            Movie Not Found
          </h2>
          <p className="text-secondary mb-6">
            {error || "The movie you are looking for does not exist."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary px-6 py-3"
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    );
  }

  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const backdropUrl = getImageUrl(movie.backdrop_path, "w1280");

  const trailer = movie.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  return (
    <div className="container-primary min-h-screen">
      <nav className="container-secondary border-b border-theme">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-secondary flex items-center transition-colors hover:text-primary"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            <h1 className="text-xl font-bold text-primary absolute left-1/2 transform -translate-x-1/2">
              🎬 Movie Details
            </h1>

            <ThemeToggle />
          </div>
        </div>
      </nav>

      {movie.backdrop_path && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-shrink-0 w-full lg:w-80">
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className="w-full rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x750?text=No+Image";
              }}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <h1 className="text-primary text-3xl md:text-4xl font-bold flex-1">
                {movie.title}
              </h1>
              <div className="flex items-center gap-3">
                <div
                  className={`${getRatingColor(
                    movie.vote_average,
                  )} text-white px-4 py-2 rounded-full font-semibold text-lg`}
                >
                  {Math.round(movie.vote_average * 10)}%
                </div>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`btn-secondary px-6 py-3 flex items-center gap-2 ${
                    isFavorite(movie.id) ? "text-red-500" : ""
                  }`}
                  aria-label={
                    isFavorite(movie.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  title={
                    isFavorite(movie.id)
                      ? "Remove from watchlist"
                      : "Add to watchlist"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isFavorite(movie.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  {isFavorite(movie.id) ? "In Watchlist" : "Add to Watchlist"}
                </button>

                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Watch Trailer
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-secondary mb-6">
              <span>{formatDate(movie.release_date)}</span>
              {movie.runtime && (
                <>
                  <span>•</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                </>
              )}
              {movie.genres && movie.genres.length > 0 && (
                <>
                  <span>•</span>
                  <span>{movie.genres.map((g) => g.name).join(", ")}</span>
                </>
              )}
            </div>

            {movie.overview && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-2">
                  Overview
                </h2>
                <p className="text-secondary leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="container-secondary rounded-lg p-4 border border-theme">
                <p className="text-tertiary text-sm mb-1">Budget</p>
                <p className="text-primary font-semibold">
                  {formatCurrency(movie.budget)}
                </p>
              </div>
              <div className="container-secondary rounded-lg p-4 border border-theme">
                <p className="text-tertiary text-sm mb-1">Revenue</p>
                <p className="text-primary font-semibold">
                  {formatCurrency(movie.revenue)}
                </p>
              </div>
              <div className="container-secondary rounded-lg p-4 border border-theme">
                <p className="text-tertiary text-sm mb-1">Vote Count</p>
                <p className="text-primary font-semibold">
                  {movie.vote_count?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>

            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-primary mb-3">
                    Production Companies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_companies.map((company) => (
                      <span
                        key={company.id}
                        className="container-secondary px-3 py-1 rounded-full text-sm text-secondary border border-theme"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {trailer && (
              <div>
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center btn-primary px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>

        {movie.similar &&
          movie.similar.results &&
          movie.similar.results.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Similar Movies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movie.similar.results.slice(0, 10).map((similarMovie) => (
                  <MovieCard key={similarMovie.id} movie={similarMovie} />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default MovieDetails;
