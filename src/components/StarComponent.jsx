import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../provider/ContextProvider";
import { ThemeContext } from "../provider/ThemeProvider";

const StarComponent = () => {
  const [hoverValue, setHoverValue] = useState(0);
  const { userRatingValue,setUserRatingValue } = useContext(AppContext);
  const { theme} = useContext(ThemeContext);

  // We're using 5 stars for a 0-10 scale
  const totalStars = 5;
  const maxValue = 10;

  // Create an array of possible rating values 
  const segments = 50; 
  const possibleValues = Array.from(
    { length: segments + 1 },
    (_, i) => (i * maxValue) / segments
  );

  // Handle hover event
  const handleMouseOver = (newValue) => {
    setHoverValue(newValue);
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  // Set the rating value zero on load
  useEffect(() => {
    setUserRatingValue(0);
  },[setUserRatingValue])

  // Handle click event to set rating
  const handleClick = (newValue) => {
    setUserRatingValue(0);
    setUserRatingValue(newValue);
  };

  // Get display rating (hover rating or selected rating)
  const displayValue = hoverValue || userRatingValue ;

  return (
    <section className="md:pt-2">
      <div className="flex items-center max-w-md mx-auto">
        <div className="relative mb-4 w-40 h-8">
          {/* Gray star background */}
          <div className="absolute inset-0 flex">
            {[...Array(totalStars)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          {/* Gold stars overlay (clipped to rating width) */}
          <div
            className="absolute inset-0 flex overflow-hidden"
            style={{ width: `${(displayValue / maxValue) * 100}%` }}
          >
            {[...Array(totalStars)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 text-red-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          {/* Invisible clickable segments */}
          <div
            className="absolute inset-0 flex"
            onMouseLeave={handleMouseLeave}
          >
            {possibleValues.map((value, index) => (
              <div
                key={index}
                className="h-full cursor-pointer"
                style={{
                  width: `${100 / segments}%`,
                  zIndex: 10,
                }}
                onMouseEnter={() => handleMouseOver(value)}
                onClick={() => handleClick(value)}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`text-lg font-medium ${
          theme === "dark" ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <span className="text-red-600">{displayValue.toFixed(1)}</span> / 10
      </div>
    </section>
  );
};

export default StarComponent;
