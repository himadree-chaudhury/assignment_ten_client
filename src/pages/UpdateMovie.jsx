import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
// import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../provider/AuthProvider";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sports",
  "Thriller",
  "War",
  "Western",
];

const UpdateMovie = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingMovie, setFetchingMovie] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

useEffect(() => {
  const fetchMovie = async () => {
    try {
      setFetchingMovie(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movies/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }

      const movie = await response.json();

      // Reset form with movie data
      reset({
        poster: movie.poster,
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
        summary: movie.summary,
      });
    } catch (error) {
      console.error("Error fetching movie:", error);
    //   toast.error("Failed to load movie data");
      navigate("/movies");
    } finally {
      setFetchingMovie(false);
    }
  };

  fetchMovie();
}, [id, reset, navigate]);


const onSubmit = async (data) => {
  if (data.rating === 0) {
    // toast.error("Please select a rating");
    return;
  }

  try {
    setLoading(true);

    const token = await user.getIdToken();

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/movies/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update movie");
    }

    // toast.success("Movie updated successfully!");
    navigate(`/movie/${id}`);
  } catch (error) {
    console.error("Error updating movie:", error);
    // toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (e) {
        console.log(e);
      return false;
    }
  };

  if (fetchingMovie) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Update Movie
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movie Poster */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Movie Poster URL
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded border ${
                errors.poster
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              placeholder="https://example.com/image.jpg"
              {...register("poster", {
                required: "Poster URL is required",
                validate: {
                  isUrl: (value) =>
                    validateUrl(value) || "Please enter a valid URL",
                },
              })}
            />
            {errors.poster && (
              <span className="text-red-500 text-sm mt-1">
                {errors.poster.message}
              </span>
            )}
          </div>

          {/* Movie Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Movie Title
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded border ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              placeholder="Enter movie title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must have at least 2 characters",
                },
              })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Genre
            </label>
            <select
              multiple
              className={`w-full px-4 py-2 rounded border ${
                errors.genre
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              {...register("genre", {
                required: "Please select at least one genre",
              })}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Hold Ctrl/Cmd to select multiple genres
            </p>
            {errors.genre && (
              <span className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </span>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              className={`w-full px-4 py-2 rounded border ${
                errors.duration
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              placeholder="Enter duration in minutes"
              {...register("duration", {
                required: "Duration is required",
                min: {
                  value: 60,
                  message: "Duration must be at least 60 minutes",
                },
                valueAsNumber: true,
              })}
            />
            {errors.duration && (
              <span className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </span>
            )}
          </div>

          {/* Release Year */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Release Year
            </label>
            <select
              className={`w-full px-4 py-2 rounded border ${
                errors.releaseYear
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              {...register("releaseYear", {
                required: "Release year is required",
                valueAsNumber: true,
              })}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.releaseYear && (
              <span className="text-red-500 text-sm mt-1">
                {errors.releaseYear.message}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Rating
            </label>
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Rating
                  onClick={(rate) => field.onChange(rate)}
                  initialValue={field.value}
                  size={30}
                  allowFraction
                />
              )}
            />
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Summary
            </label>
            <textarea
              rows="4"
              className={`w-full px-4 py-2 rounded border ${
                errors.summary
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
              placeholder="Write a summary of the movie..."
              {...register("summary", {
                required: "Summary is required",
                minLength: {
                  value: 10,
                  message: "Summary must have at least 10 characters",
                },
              })}
            />
            {errors.summary && (
              <span className="text-red-500 text-sm mt-1">
                {errors.summary.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
