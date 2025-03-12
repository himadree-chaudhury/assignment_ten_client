import React, { createContext, useState, useEffect } from "react";

// Create the Theme Context
const ThemeContext = createContext();
export { ThemeContext };

const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme preference in localStorage
  // If not, use system preference or default to 'light'
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Check for system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    // Default to light theme
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update localStorage and apply theme to document when theme changes
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);

    // Apply theme to document
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#1a202c";
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#f8f9fa";
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
