/**
 * Custom Hook: useMovies
 * 
 * This is a re-export of the useMovies hook from MovieContext.
 * It's kept as a separate file for better organization and potential future extensions.
 * 
 * This hook provides access to all movie-related state and functions:
 * 
 * State:
 * - movies: Array of movie objects
 * - searchQuery: Current search term
 * - currentPage: Current page number
 * - totalPages: Total number of pages
 * - loading: Boolean indicating loading state
 * - error: Error message if any
 * 
 * Functions:
 * - updateSearchQuery(query): Update search query and trigger search
 * - changePage(page): Navigate to specific page
 * - nextPage(): Go to next page
 * - prevPage(): Go to previous page
 * 
 * Example usage:
 *   import useMovies from '../hooks/useMovies'
 *   
 *   function MyComponent() {
 *     const { movies, loading, updateSearchQuery } = useMovies()
 *     // Use the state and functions here
 *   }
 */

// Re-export from context for cleaner imports
export { useMovies } from '../context/MovieContext'
