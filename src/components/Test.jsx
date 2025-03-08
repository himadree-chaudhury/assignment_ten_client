import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaTrash,
  FaEdit,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movies/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!currentUser || !movie) return;

    const checkIfFavorite = async () => {
      try {
        setCheckingFavorite(true);
        const token = await currentUser.getIdToken();
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/favorites/check/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to check favorite status");
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      } finally {
        setCheckingFavorite(false);
      }
    };

    checkIfFavorite();
  }, [id, currentUser, movie]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    try {
      const token = await currentUser.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movies/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to delete movie");
      toast.success("Movie deleted successfully");
      navigate("/movies");
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie");
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      const token = await currentUser.getIdToken();
      const method = isFavorite ? "DELETE" : "POST";
      const body = isFavorite ? null : JSON.stringify({ movieId: id });
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites${
          isFavorite ? `/${id}` : ""
        }`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body,
        }
      );
      if (!response.ok) throw new Error("Failed to update favorites");
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Movie not found
        </h2>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 lg:w-3/4 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {movie.title}
              </h1>
              <div className="flex items-center bg-yellow-500 text-black font-bold px-3 py-1 rounded-full">
                <FaStar className="mr-1" /> {movie.rating.toFixed(1)}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center mr-6">
                <FaClock className="mr-2" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{movie.releaseYear}</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.summary}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleFavoriteToggle}
                disabled={checkingFavorite}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition duration-300 ${
                  isFavorite
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {isFavorite ? (
                  <FaHeart className="mr-2" />
                ) : (
                  <FaRegHeart className="mr-2" />
                )}
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <button
                onClick={() => navigate(`/update-movie/${id}`)}
                className="flex items-center px-4 py-2 rounded-lg font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300"
              >
                <FaEdit className="mr-2" /> Update Movie
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 rounded-lg font-medium bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition duration-300"
              >
                <FaTrash className="mr-2" /> Delete Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
