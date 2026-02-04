# 🎬 Movie Explorer - React App with Tailwind CSS

A modern, responsive Movie Explorer application built with React, Tailwind CSS, and The Movie Database (TMDB) API. Search for movies, browse popular films, view detailed movie information, and discover similar movies.

## ✨ Features

- 🔍 **Search Functionality**: Debounced search with real-time results
- 📄 **Pagination**: Navigate through multiple pages of results
- 🎯 **Movie Listings**: Beautiful grid layout with movie cards
- 📱 **Movie Details**: Comprehensive movie information pages
- 🎨 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Loading States**: Skeleton loaders and loading indicators
- 🚨 **Error Handling**: User-friendly error messages
- 🎬 **Similar Movies**: Discover related films on detail pages

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed on your system
- npm or yarn package manager
- A free TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and replace `YOUR_API_KEY_HERE` with your TMDB API key
   ```env
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - You should see the Movie Explorer app!

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📁 Project Structure

```
movie-app/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # Reusable React components
│   │   ├── SearchBar.jsx       # Search input with debouncing
│   │   ├── MovieCard.jsx       # Individual movie card
│   │   ├── MovieList.jsx       # Grid of movie cards
│   │   ├── MovieDetails.jsx    # Detailed movie view
│   │   └── Pagination.jsx      # Page navigation controls
│   ├── context/                # React Context for state management
│   │   └── MovieContext.jsx    # Global movie state
│   ├── hooks/                  # Custom React hooks
│   │   └── useMovies.js        # Hook to access movie context
│   ├── pages/                  # Page components
│   │   ├── Home.jsx            # Main landing page
│   │   └── MovieDetail.jsx     # Movie detail page
│   ├── services/               # API service layer
│   │   └── api.js              # TMDB API integration
│   ├── App.jsx                 # Main app component with routing
│   ├── index.js                # Entry point
│   └── index.css               # Global styles and Tailwind imports
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite build configuration
└── README.md                   # This file
```

## 🏗️ Architecture Overview

### State Management

The app uses **React Context API** for global state management:

- **MovieContext**: Provides centralized state for:
  - Movies list and search results
  - Search query
  - Pagination (current page, total pages)
  - Loading and error states

### Routing

**React Router v6** handles navigation:
- `/` - Home page with search and movie listings
- `/movie/:id` - Individual movie detail page
- `*` - 404 error page

### API Integration

The **TMDB API** provides movie data:
- Base URL: `https://api.themoviedb.org/3`
- Endpoints used:
  - `/search/movie` - Search movies
  - `/movie/popular` - Get popular movies
  - `/movie/{id}` - Get movie details
  - `/movie/{id}/similar` - Get similar movies

### Styling

**Tailwind CSS** provides utility-first styling:
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Custom color theme (primary colors)
- Dark mode support (dark gray background)

## 📚 Code Explanation

### Component Breakdown

#### 1. **SearchBar Component** (`src/components/SearchBar.jsx`)

**Purpose**: Provides search input with debounced functionality.

**Key Features**:
- Debounced input (500ms delay) to prevent excessive API calls
- Real-time search updates
- Loading indicator
- Clear button

**How it works**:
- Uses `useState` for local input value
- Uses `useRef` to store debounce timer
- Updates context after user stops typing for 500ms
- Triggers search in MovieContext which fetches new data

#### 2. **MovieCard Component** (`src/components/MovieCard.jsx`)

**Purpose**: Displays a single movie in a card format.

**Key Features**:
- Movie poster image
- Title, release date, rating
- Truncated overview
- Clickable to navigate to detail page
- Hover effects

**Props**:
- `movie`: Movie object from TMDB API

**How it works**:
- Displays movie information
- Formats dates and ratings
- Uses `useNavigate` to navigate on click
- Handles missing images with placeholder

#### 3. **MovieList Component** (`src/components/MovieList.jsx`)

**Purpose**: Displays a grid of movie cards.

**Key Features**:
- Responsive grid layout
- Loading skeleton placeholders
- Empty state message
- Error state display

**How it works**:
- Fetches movies from MovieContext
- Renders grid of MovieCard components
- Shows different states (loading, error, empty) based on context

#### 4. **Pagination Component** (`src/components/Pagination.jsx`)

**Purpose**: Provides navigation controls for paginated results.

**Key Features**:
- Previous/Next buttons
- Page number buttons (shows nearby pages)
- First/Last page buttons (for large page counts)
- Current page indicator

**How it works**:
- Gets pagination state from MovieContext
- Calculates which page numbers to display
- Updates context when page changes, triggering new data fetch

#### 5. **MovieDetails Component** (`src/components/MovieDetails.jsx`)

**Purpose**: Displays complete information about a single movie.

**Key Features**:
- Large poster and backdrop images
- Complete movie information (title, overview, genres, etc.)
- Movie stats (budget, revenue, runtime)
- Similar movies section
- Trailer link

**How it works**:
- Uses `useParams` to get movie ID from URL
- Fetches movie details on mount
- Displays all available information
- Shows similar movies at the bottom

### API Service Layer

**File**: `src/services/api.js`

**Purpose**: Centralizes all TMDB API interactions.

**Key Functions**:
- `searchMovies(query, page)`: Search for movies
- `getMovieDetails(movieId)`: Get detailed movie info
- `getPopularMovies(page)`: Get popular movies
- `getSimilarMovies(movieId, page)`: Get similar movies
- `getImageUrl(path, size)`: Get full image URL

**How it works**:
- Uses Axios for HTTP requests
- Configures API key automatically
- Handles errors consistently
- Provides helper functions for image URLs

### Context & State Management

**File**: `src/context/MovieContext.jsx`

**Purpose**: Provides global state management for movies.

**State Provided**:
- `movies`: Array of movie objects
- `searchQuery`: Current search term
- `currentPage`: Current page number
- `totalPages`: Total number of pages
- `loading`: Loading indicator
- `error`: Error message

**Functions Provided**:
- `updateSearchQuery(query)`: Update search and trigger fetch
- `changePage(page)`: Navigate to specific page
- `nextPage()`: Go to next page
- `prevPage()`: Go to previous page

**How it works**:
- Uses `useEffect` to fetch movies when query or page changes
- Automatically fetches popular movies on mount (no query)
- Fetches search results when query is provided
- Updates state and triggers re-renders in consuming components

### Routing Setup

**File**: `src/App.jsx`

**Purpose**: Sets up React Router and application routes.

**Routes**:
- `/` → Home page
- `/movie/:id` → Movie detail page
- `*` → 404 page

**How it works**:
- `BrowserRouter` enables routing
- `Routes` defines available routes
- `Route` maps paths to components
- `MovieProvider` wraps routes for global state access

## 🎨 Styling Guide

### Tailwind CSS Utilities Used

**Layout**:
- `flex`, `grid`: Flexbox and grid layouts
- `container`, `mx-auto`: Centered containers
- `px-4`, `py-8`: Padding utilities

**Colors**:
- `bg-gray-900`: Dark background
- `bg-gray-800`: Card backgrounds
- `text-white`, `text-gray-400`: Text colors
- `border-gray-700`: Border colors
- `bg-primary-600`: Primary accent color

**Responsive**:
- `sm:`, `md:`, `lg:`, `xl:`: Breakpoint prefixes
- Example: `md:grid-cols-3` means 3 columns on medium screens and up

**Hover & Transitions**:
- `hover:scale-105`: Scale on hover
- `transition-all duration-300`: Smooth transitions
- `hover:bg-primary-700`: Color change on hover

## 🔧 Configuration Files

### `package.json`
- Lists all dependencies (React, React Router, Axios, Tailwind)
- Defines npm scripts (`dev`, `build`, `preview`)

### `tailwind.config.js`
- Configures Tailwind CSS
- Sets content paths for purging unused styles
- Defines custom color theme

### `postcss.config.js`
- Configures PostCSS to process Tailwind CSS
- Enables autoprefixer for browser compatibility

### `vite.config.js`
- Configures Vite build tool
- Sets up React plugin

## 🐛 Troubleshooting

### API Key Issues

**Error**: "Failed to fetch movies"

**Solution**:
1. Ensure `.env` file exists in root directory
2. Check that `VITE_TMDB_API_KEY` is set correctly
3. Verify API key is valid at [TMDB API Settings](https://www.themoviedb.org/settings/api)
4. Restart the dev server after changing `.env`

### Build Errors

**Error**: Module not found or import errors

**Solution**:
1. Delete `node_modules` folder
2. Delete `package-lock.json` (if exists)
3. Run `npm install` again

### CORS Issues

**Error**: CORS policy errors in browser console

**Solution**:
- TMDB API supports CORS, so this shouldn't happen
- If it does, check your API key is correct
- Ensure you're using the official TMDB API endpoint

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

**Note**: Vite requires the `VITE_` prefix for environment variables to be accessible in the app.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_TMDB_API_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_TMDB_API_KEY`
6. Deploy!

## 📖 Learning Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Vite Documentation](https://vitejs.dev/)

## 🎯 Future Enhancements

Potential features to add:
- [ ] User favorites/watchlist
- [ ] Movie reviews and ratings
- [ ] Filter by genre, year, rating
- [ ] Sort options (popularity, rating, release date)
- [ ] Dark/Light theme toggle
- [ ] Watch trailers in-app
- [ ] Cast and crew information
- [ ] Movie recommendations

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Credits

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with React, Tailwind CSS, and Vite

---

**Happy Movie Exploring! 🎬🍿**
