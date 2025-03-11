import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { ThemeContext } from "../provider/ThemeProvider";
import Swal from "sweetalert2";

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
  const { theme } = useContext(ThemeContext);
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
          `https://cinesphere-himadree.vercel.app/movies/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const movie = await response.json();

        // Reset form with movie data
        reset({
          Movie_Poster: movie.Movie_Poster,
          Movie_Title: movie.Movie_Title,
          Genre: movie.Genre,
          Duration: movie.Duration,
          Release_Year: movie.Release_Year,
          Rating: movie.Rating,
          Summary: movie.Summary,
        });
      } catch (error) {
        console.error("Error fetching movie:", error);
        toast.error("Failed to load movie data");
        navigate(-1);
      } finally {
        setFetchingMovie(false);
      }
    };

    fetchMovie();
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    if (data.rating === 0) {
      Swal.fire({
        text: "Please select a rating !",
        icon: "info",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://cinesphere-himadree.vercel.app/movies/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update movie");
      }
      Swal.fire({
        title: "Movie updated successfully !",
        icon: "success",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
      navigate(`/all-movies`);
    } catch (error) {
      console.error("Error updating movie:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update movie",
        icon: "error",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            Update
          </span>
          <span className="bg-red-600 rounded-sm p-1 text-white">Movie</span>
        </h1>
        <p
          className={`text-lg max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Keep your favorite movies up to date! Edit details, refresh
          information, and make sure others get the best recommendations.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 rounded-lg shadow-md ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movie Poster */}
          <div className="md:col-span-2">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Movie Poster URL<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              placeholder="https://example.com/image.jpg"
              {...register("Movie_Poster", {
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
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Movie Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              placeholder="Enter movie title"
              {...register("Movie_Title", {
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
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              multiple
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              {...register("Genre", {
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
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              placeholder="Enter duration in minutes"
              {...register("Duration", {
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
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Release Year
            </label>
            <select
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              {...register("Release_Year", {
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
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Rating
            </label>
            <Controller
              name="Rating"
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
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
              placeholder="Write a summary of the movie..."
              {...register("Summary", {
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
            className="bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition duration-300 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
