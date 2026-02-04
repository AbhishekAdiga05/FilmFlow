# 🎬 FilmFlow

Welcome to FilmFlow! This project was created for movie enthusiasts to explore a vast collection of movies from The Movie Database (TMDB) API. Built with React and modern web technologies, this website offers an immersive and seamless movie discovery experience with features like dark/light themes, genre filtering, and a personal watchlist.

---

## ✨ Features

1. **Smart Search**
   Find any movie instantly by searching through thousands of titles. The intelligent search system provides real-time results as you type.

2. **Genre Filtering**
   Customize your movie discovery by filtering films into categories like Action, Drama, Comedy, Sci-Fi, Horror, and more. Explore over 19 different genres to find your next favorite film.

3. **Personal Watchlist**
   Save your favorite movies to a personal watchlist that persists locally in your browser. Never lose track of movies you want to watch with the heart icon feature.

4. **Dark/Light Theme**
   Switch between beautiful dark and light themes for comfortable viewing any time of day. Your theme preference is automatically saved.

5. **Detailed Movie Information**
   Get comprehensive details about any movie including plot summaries, release dates, ratings, runtime, budget, revenue, production companies, and similar movie recommendations.

6. **Responsive Design**
   Enjoy a seamless experience across all devices - desktop, tablet, and mobile. The interface adapts perfectly to any screen size.

7. **Smooth Pagination**
   Navigate through large collections of movies with an intuitive pagination system that keeps track of your browsing history.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key ([Get one free here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/filmflow.git
   cd filmflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```plaintext
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Routing:** React Router Dom
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, Custom CSS Variables
- **State Management:** React Context API
- **HTTP Client:** Axios
- **API:** The Movie Database (TMDB)

---

## 📦 Dependencies

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [React Router Dom](https://reactrouter.com/) - Declarative routing for React applications
- [Axios](https://axios-http.com/) - Promise-based HTTP client
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TMDB API](https://developer.themoviedb.org/docs) - The Movie Database API

---

## 🎯 Usage

### Search Movies

Type any movie name in the search bar to find movies instantly with real-time results.

### Filter by Genre

Click on genre chips below the search bar to filter movies by category (Action, Drama, Comedy, etc.).

### Add to Watchlist

Click the heart icon (❤️) on any movie card to add it to your watchlist. Access your saved movies anytime by clicking the "My Watchlist" button in the header.

### Switch Themes

Toggle between light and dark modes using the theme button in the top-right corner of the navigation bar.

### View Movie Details

Click on any movie card to view comprehensive information including overview, cast, ratings, and similar movie recommendations.

---

## 📁 Project Structure

```
filmflow/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── MovieCard.jsx
│   │   ├── MovieList.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── GenreFilter.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── MovieDetails.jsx
│   ├── context/         # Global state management
│   │   ├── MovieContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/           # Page components
│   │   └── Home.jsx
│   ├── services/        # API integration
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env                 # Environment variables (not committed)
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🔑 Getting Your TMDB API Key

1. Create a free account at [TMDB](https://www.themoviedb.org/signup)
2. Navigate to [Settings > API](https://www.themoviedb.org/settings/api)
3. Request an API key (approval is instant and free)
4. Copy your API Key (v3 auth)
5. Add it to your `.env` file as shown in the installation steps

---

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder, ready for deployment to any static hosting service.

---

## 🚀 Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the dist folder to Netlify
```

**Important:** Don't forget to add your `VITE_TMDB_API_KEY` environment variable in your deployment platform's settings!

---

## 🤝 Contribution

This project serves as a learning resource and portfolio piece. While I don't accept pull requests, I welcome your feedback! If you have suggestions or ideas, feel free to:

- Open an issue for bug reports
- Start a discussion for feature requests
- Fork the project for your own modifications

Otherwise, you are free to fork this project and adapt it for your own purposes under the MIT license.

---

## 📄 License

This project is released under the MIT [LICENSE](LICENSE). You can find the specific terms and conditions outlined in the LICENSE file. This means you're free to utilize, modify, and distribute the project according to the terms of the MIT License.

---

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">
  
**Made with ❤️ for movie lovers**

⭐ Star this repo if you found it helpful!

</div>
