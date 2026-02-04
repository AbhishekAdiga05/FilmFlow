import React from 'react'
import MovieDetails from '../components/MovieDetails'

/**
 * Movie Detail Page Component
 * 
 * This page displays detailed information about a single movie.
 * It's a simple wrapper around the MovieDetails component.
 * 
 * The actual movie ID is extracted from the URL by React Router
 * and passed to MovieDetails via useParams() hook.
 * 
 * Route: /movie/:id
 * Example: /movie/123 -> displays details for movie with ID 123
 */

const MovieDetail = () => {
  return <MovieDetails />
}

export default MovieDetail
