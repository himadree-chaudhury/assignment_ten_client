import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  // Destructure movie properties
  const {
    _id,
    Movie_Poster,
    Movie_Title,
    Genre,
    Duration,
    Release_Year,
    Rating,
  } = movie;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-64 flex justify-center items-center bg-black">
        {/* Movie poster image */}
        <img
          src={Movie_Poster}
          alt={Movie_Title}
          className="w-full h-full object-cover object-top"
        />
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded flex items-center">
          <FaStar className="mr-1" />{" "}
          {/* Star icon */}
          {Rating} 
        </div>
      </div>
      <div className="p-4">
        {/* Movie title */}
        <h3 className="text-xl font-bold mb-2 text-white truncate">
          {Movie_Title}
        </h3>
        {/* Display genres */}
        <div className="text-sm text-gray-400 mb-2">{Genre.join(", ")}</div>
        {/* Release year and duration */}
        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>{Release_Year}</span> 
          <span>{Duration} min</span> 
        </div>
        {/* Movie details Button */}
        <Link
          to={`/all-movies/${_id}`} 
          className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded transition duration-300"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
