import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import { ThemeContext } from "../provider/ThemeProvider";

const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/movies/featured`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFeaturedMovies(data);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);
    

  return (
    <section>
      <div>
        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Featured Movies
            </h2>
            <Link
              to="/movies"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/movies"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full inline-block transition duration-300"
            >
              See All Movies
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FeaturedMovies;
