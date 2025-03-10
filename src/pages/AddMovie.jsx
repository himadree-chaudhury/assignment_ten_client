import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import Test from "../components/Test";
// import { toast } from "react-hot-toast";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 150 }, (_, i) => currentYear - i);
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
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sports",
  "Thriller",
  "War",
  "Western",
];

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Movie_Poster: "",
      Movie_Title: "",
      Genre: [],
      Duration: "",
      Release_Year: currentYear,
      Rating: 0,
      Summary: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.Rating === 0) {
        // toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const movieData = {
        ...data,
        User_Email: user.email,
      };

      const response = await fetch(`http://localhost:5000/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

        // toast.success("Movie added successfully!");
      navigate("/all-movies");
    } catch (error) {
      console.error("Error adding movie:", error);
        // toast.error(error.message || "Failed to add movie");
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* <Test></Test>  */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            Add
          </span>
          <span className="bg-red-600 rounded-sm p-1 text-white">Movie</span>
        </h1>
        <p
          className={`text-lg max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Share your love for movies by adding your favorite movies! With a few
          simple details, you can bring new films to the spotlight and inspire
          others to discover them.
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
              Movie Poster URL <span className="text-red-500">*</span>
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
            {errors.Movie_Poster && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Movie_Poster.message}
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
            {errors.Movie_Title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Movie_Title.message}
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
            {errors.Duration && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Duration.message}
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
            {errors.Release_Year && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Release_Year.message}
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
            {errors.Genre && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Genre.message}
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="">
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
              render={({ field }) => (
                <Rating
                  className="flex"
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
            {errors.Summary && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Summary.message}
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
            {loading ? "Adding..." : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
