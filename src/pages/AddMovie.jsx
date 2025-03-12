import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import StarComponent from "../components/StarComponent";
import Swal from "sweetalert2";
import { AppContext } from "../provider/ContextProvider";

// Generate years dynamically starting from the current year to 150 years back
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 150 }, (_, i) => currentYear - i);

// List of predefined genres for movie categorization
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
  const { userRatingValue } = useContext(AppContext); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 

  // Initialize react-hook-form with default values for the form fields
  const {
    register,
    handleSubmit,
    setValue,
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

  // Update the form's Rating field whenever userRatingValue changes
  useEffect(() => {
    setValue("Rating", userRatingValue);
  }, [userRatingValue, setValue]);

  // Handle form submission 
  const onSubmit = async (data) => {
    try {
      setLoading(true); 
      const movieData = {
        ...data,
        User_Email: user.email, 
      };

      // Send POST request to add the movie
      const response = await fetch(
        `https://cinesphere-himadree.vercel.app/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      // Show success message using SweetAlert
      Swal.fire({
        title: "Movie added successfully !",
        icon: "success",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
      navigate("/all-movies");
    } catch (error) {
      console.error("Error adding movie:", error);

      // Show error message using SweetAlert
      Swal.fire({
        title: "Error!",
        text: "Failed to add movie",
        icon: "error",
        background: theme === "dark" ? "#1a202c" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  // Validate if the input is a valid URL
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
      {/* Header Section */}
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

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 rounded-lg shadow-md ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Movie Poster Field */}
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

          {/* Movie Title Field */}
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

          {/* Duration Field */}
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

          {/* Release Year Field */}
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

          {/* Genre Field */}
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
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Hold Ctrl/Cmd to select multiple genres
            </p>
            {errors.Genre && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Genre.message}
              </span>
            )}
          </div>

          {/* Rating Field */}
          <div className="">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Rating <span className="text-red-500">*</span>
            </label>
            {/* StarComponent is used to visually select the rating */}
            <StarComponent />
            <input
              type="hidden"
              {...register("Rating", {
                required: "Rating is required",
                min: { value: 1, message: "Please select a rating" },
              })}
            />
            {errors.Rating && (
              <span className="text-red-500 text-sm mt-1">
                {errors.Rating.message}
              </span>
            )}
          </div>

          {/* Summary Field */}
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

        {/* Submit Button */}
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
