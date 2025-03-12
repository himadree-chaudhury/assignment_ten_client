import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); 
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Fetch favorite movies 
    const fetchFavorites = async () => {
      try {
        setLoading(true); 
        const response = await fetch(
          `https://cinesphere-himadree.vercel.app/favorites`
        );
        if (!response.ok) throw new Error("Failed to load favorites");
        const data = await response.json();
        setFavorites(data.filter((movie) => user.email === movie.User_Email));
        console.log(data); 
      } catch (error) {
        console.error("Error fetching favorites:", error);

        // Show error message using SweetAlert
        Swal.fire({
          title: "Error!",
          text: "Failed to load favorites",
          icon: "error",
          background: theme === "dark" ? "#1a202c" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setLoading(false); 
      }
    };
    fetchFavorites(); 
  }, [user]); 

  // Handle removing a movie 
  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://cinesphere-himadree.vercel.app/favorites/${movieId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      setFavorites(favorites.filter((movie) => movie.movieId !== movieId));

      // Show success message using SweetAlert
      Swal.fire({
        title: "Removed from favorites !",
        icon: "success",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);

      // Show error message using SweetAlert
      Swal.fire({
        title: "Error!",
        text: "Failed to remove from favorites",
        icon: "error",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            My
          </span>
          <span className="bg-red-600 rounded-sm p-1 text-white">
            Favorites
          </span>
        </h1>
        <p
          className={`text-lg max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          A beautiful and seamless experience to explore, cherish, and manage
          your favorite movies. Enjoy a personalized collection with style and
          ease!
        </p>
      </div>

      {/* Conditional Rendering for Empty Favorites */}
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h3
            className={`text-xl font-medium mb-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            You haven't added any favorites yet
          </h3>
          <Link
            to="/all-movies"
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-full hover:bg-red-700 transition duration-300"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        // Favorite Movies Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie?._id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              {/* Movie Poster */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={movie?.Movie_Poster}
                  alt={movie?.Movie_Title}
                  className="w-full h-full object-cover object-top"
                />
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded flex items-center">
                  <FaStar className="mr-1" /> {movie?.Rating}
                </div>
              </div>
              {/* Movie Details */}
              <div className="p-4">
                {/* Display movie title */}
                <h3 className="text-xl font-bold mb-2 text-white truncate">
                  {movie?.Movie_Title}
                </h3>
                {/* Display genres */}
                <div className="text-sm text-gray-400 mb-2">
                  {movie?.Genre.join(", ")}{" "}
                </div>
                {/* Display release year */}
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>{movie?.Release_Year}</span>
                  {/* Display duration */}
                  <span>{movie?.Duration} min</span>
                </div>
                <div className="flex space-x-2">
                  {/* See Details Button */}
                  <Link
                    to={`/all-movies/${movie?.movieId}`} 
                    className="flex-1 bg-red-600 text-white text-center py-2 rounded hover:bg-red-700 transition duration-300"
                  >
                    See Details
                  </Link>
                  {/* Remove from Favorites Button */}
                  <button
                    onClick={() => handleRemoveFavorite(movie.movieId)} 
                    className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
