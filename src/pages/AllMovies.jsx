import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("");
  const { theme } = useContext(ThemeContext);

  const genres = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Documentary",
    "Animation",
  ];

  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      setSelectedGenre(genreParam);
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/movies`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (genre) => {
    if (genre === "All") {
      setSelectedGenre("");
      setSearchParams({});
    } else {
      setSelectedGenre(genre);
      setSearchParams({ genre });
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.Movie_Title.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const matchesGenre = selectedGenre
      ? movie.Genre.includes(selectedGenre)
      : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className={`text-4xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        All
        <span className="bg-red-600 rounded-sm p-[0.2rem] text-white">
          Movies
        </span>
      </h1>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
            //   value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-80 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreSelect(genre)}
                className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                  (genre === "All" && !selectedGenre) || selectedGenre === genre
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
            No movies found matching your search criteria
          </h3>
        </div>
      )}
    </div>
  );
};

export default AllMovies;
