import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";

/**
 * Entry point of the React application
 *
 * This file is the main entry point that:
 * 1. Imports React and ReactDOM to render the app
 * 2. Imports global CSS styles (including Tailwind)
 * 3. Imports the main App component
 * 4. Renders the App component into the root div in index.html
 *
 * ReactDOM.createRoot() creates a root for the React tree (React 18+)
 * .render() mounts the App component and all its children
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
