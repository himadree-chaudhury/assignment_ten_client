import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaTrash,
  FaEdit,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);
  const [deletedMovieName, setDeletedMovieName] = useState("");
  const [movieUser, setMovieUser] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cinesphere-himadree.vercel.app/movies/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
        setDeletedMovieName(data.Movie_Title);
        if (
          data?.User_Email === user.email
            ? setMovieUser(false)
            : setMovieUser(true)
        );
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, user]);

  useEffect(() => {
    if (!user || !movie) return;

    const checkIfFavorite = async () => {
      try {
        setCheckingFavorite(true);
        const response = await fetch(
          `https://cinesphere-himadree.vercel.app/favorites/${id}`
        );
        if (!response.ok) throw new Error("Failed to check favorite status");
        const data = await response.json();
        setIsFavorite(
          data?.movieId && data.User_Email === user.email ? true : false
        );
      } catch (error) {
        console.error("Error checking favorite status:", error);
      } finally {
        setCheckingFavorite(false);
      }
    };

    checkIfFavorite();
  }, [id, user, movie]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#1d4ed8",
      background: theme === "dark" ? "#1a202c" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://cinesphere-himadree.vercel.app/movies/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Failed to delete movie");
        Swal.fire({
          title: "Deleted!",
          text: `${deletedMovieName} has been deleted`,
          icon: "success",
          background: theme === "dark" ? "#1a202c" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          confirmButtonColor: "#dc2626",
        });

        // Redirect after deletion
        navigate("/all-movies");
      } catch (error) {
        console.error("Error deleting movie:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete movie !",
          icon: "error",
          background: theme === "dark" ? "#1a202c" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const body = isFavorite
        ? null
        : JSON.stringify({
            movieId: id,
            Movie_Poster: movie.Movie_Poster,
            Movie_Title: movie.Movie_Title,
            Genre: movie.Genre,
            Duration: movie.Duration,
            Release_Year: movie.Release_Year,
            Rating: movie.Rating,
            Summary: movie.Summary,
            User_Email: user.email,
          });
      const response = await fetch(
        `https://cinesphere-himadree.vercel.app/favorites${
          isFavorite ? `/${id}` : ""
        }`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
      if (!response.ok) throw new Error("Failed to update favorites");

      setIsFavorite(!isFavorite);
      if (isFavorite === false) {
        Swal.fire({
          title: "Added to favorites !",
          icon: "success",
          background: theme === "dark" ? "#1a202c" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          confirmButtonColor: "#dc2626",
        });
      } else {
        Swal.fire({
          title: "Removed from favorites !",
          icon: "success",
          background: theme === "dark" ? "#1a202c" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update favorites",
        icon: "error",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const userActivityAlert = (activity) => {
    if (activity === "update") {
      Swal.fire({
        title: "Sorry!",
        text: "This movie was added by someone else. You cannot update it",
        icon: "info",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    } else if (activity === "delete") {
      Swal.fire({
        title: "Sorry!",
        text: "This movie was added by someone else. You cannot delete it",
        icon: "error",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (!movie)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Movie not found
        </h2>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <img
              src={movie.Movie_Poster}
              alt={movie.Movie_Title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 lg:w-3/4 p-6">
            <div className="flex flex-col lg:flex-row gap-2 justify-between items-start">
              <h1
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {movie.Movie_Title}
              </h1>
              <div className="flex items-center bg-yellow-500 text-black font-bold px-3 py-1 rounded-full">
                <FaStar className="mr-1" /> {movie.Rating}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.Genre.map((g) => (
                <span
                  key={g}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-200"
                >
                  {g}
                </span>
              ))}
            </div>
            <div
              className={`flex items-center mt-4 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              <div className="flex items-center mr-6">
                <FaClock className="mr-2" />
                <span>{movie.Duration} min</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{movie.Release_Year}</span>
              </div>
            </div>
            <div className="mt-6">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Summary
              </h3>
              <p
                className={`leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-900"
                }`}
              >
                {movie.Summary}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                onClick={handleFavoriteToggle}
                disabled={checkingFavorite}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer bg-gray-700 text-white hover:bg-gray-800
                `}
              >
                {isFavorite ? (
                  <FaHeart className="mr-2" />
                ) : (
                  <FaRegHeart className="mr-2" />
                )}
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Link>
              {movieUser ? (
                <Link
                  onClick={() => userActivityAlert("update")}
                  className="flex items-center px-4 py-2 rounded-lg font-medium bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300 cursor-pointer"
                >
                  <FaEdit className="mr-2" /> Update Movie
                </Link>
              ) : (
                <Link
                  onClick={() => navigate(`/update-movie/${id}`)}
                  className="flex items-center px-4 py-2 rounded-lg font-medium bg-blue-700 text-white hover:bg-blue-800 transition-all duration-300 cursor-pointer"
                >
                  <FaEdit className="mr-2" /> Update Movie
                </Link>
              )}
              {movieUser ? (
                <Link
                  onClick={() => userActivityAlert("delete")}
                  className="flex items-center px-4 py-2 rounded-lg font-medium bg-red-700 text-white hover:bg-red-800 transition-all duration-300 cursor-pointer"
                >
                  <FaTrash className="mr-2" /> Delete Movie
                </Link>
              ) : (
                <Link
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 rounded-lg font-medium bg-red-700 text-white hover:bg-red-800 transition-all duration-300 cursor-pointer"
                >
                  <FaTrash className="mr-2" /> Delete Movie
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
