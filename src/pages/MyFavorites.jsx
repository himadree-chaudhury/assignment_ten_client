import React, { useState, useEffect, useContext } from "react";
// import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";
// import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { ThemeContext } from "../provider/ThemeProvider";

const MyFavorites = () => {
  //   const { currentUser } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchFavorites = async () => {
  //       try {
  //         setLoading(true);
  //         // const token = await currentUser.getIdToken();
  //         const response = await fetch(
  //           `${import.meta.env.VITE_API_URL}/favorites`,
  //           {
  //             method: "GET",
  //             headers: {
  //             //   Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         if (!response.ok) {
  //           throw new Error("Failed to load favorites");
  //         }
  //         const data = await response.json();
  //         setFavorites(data);
  //       } catch (error) {
  //         console.error("Error fetching favorites:", error);
  //         // toast.error("Failed to load favorites");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchFavorites();
  //   }, [currentUser]);

  const handleRemoveFavorite = async (movieId) => {
    try {
      //   const token = await currentUser.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites/${movieId}`,
        {
          method: "DELETE",
          headers: {
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      setFavorites(favorites.filter((fav) => fav.movie._id !== movieId));
      //   toast.success("Removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      //   toast.error("Failed to remove from favorites");
    }
  };

  //   if (loading) {
  //     return <LoadingSpinner />;
  //   }

  return (
    <div className="container mx-auto px-4 py-8">
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

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4 text-gray-600 dark:text-gray-400">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(({ movie }) => (
            <div
              key={movie._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded flex items-center">
                  <FaStar className="mr-1" /> {movie.rating.toFixed(1)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white truncate">
                  {movie.title}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {movie.genre.join(", ")}
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{movie.releaseYear}</span>
                  <span>{movie.duration} min</span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/movie/${movie._id}`}
                    className="flex-1 bg-red-600 text-white text-center py-2 rounded hover:bg-red-700 transition duration-300"
                  >
                    See Details
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(movie._id)}
                    className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-300"
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
