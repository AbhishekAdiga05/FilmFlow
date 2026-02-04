import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route
              path="*"
              element={
                <div className="container-primary min-h-screen flex items-center justify-center px-4">
                  <div className="text-center">
                    <h1 className="text-primary text-4xl font-bold mb-4">
                      404
                    </h1>
                    <p className="text-secondary mb-6">Page not found</p>
                    <a href="/" className="btn-primary inline-block px-6 py-3">
                      Go Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
