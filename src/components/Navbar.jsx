import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Close mobile menu on route change

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Successfully logged out
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#ff6b6b" : "",
      borderBottom: isActive ? "2px solid #ff6b6b" : "none",
    };
  };

  return (
    <section>
      <nav
        className={`fixed w-full z-10 top-0 left-0 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } shadow-md transition-colors duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="CineSphere Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold">
                Cine
                <span className="bg-red-600 rounded-sm p-1 text-white">
                  Sphere
                </span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" style={navLinkStyles} className="py-2">
                Home
              </NavLink>
              <NavLink to="/all-movies" style={navLinkStyles} className="py-2">
                All Movies
              </NavLink>
              <NavLink to="/add-movie" style={navLinkStyles} className="py-2">
                Add Movie
              </NavLink>
              <NavLink
                to="/my-favorites"
                style={navLinkStyles}
                className="py-2"
              >
                My Favorites
              </NavLink>
              <NavLink to="/blog" style={navLinkStyles} className="py-2">
                Blog
              </NavLink>
            </div>

            {/* User Authentication and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full cursor-pointer ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors duration-300`}
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-700" />
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/cDkT5m8/default-user.png"
                      }
                      alt={user.displayName || "User"}
                      className="h-10 w-10 rounded-full object-cover cursor-pointer"
                    />
                    <div
                      className={`absolute right-0 mt-2 w-48 py-2 ${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                      } rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10`}
                    >
                      <p className="px-4 py-2 text-sm">
                        {user.displayName || "User"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-md ${
                      theme === "dark"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white transition-colors duration-300`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className={`bg-red-600 text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 transition-all duration-300`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`bg-red-600 text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 transition-all duration-300`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleTheme}
                className={`p-2 mr-2 rounded-full cursor-pointer ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-700" />
                )}
              </button>
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md cursor-pointer ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden ${isMenuOpen ? "block" : "hidden"} ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            } transition-all duration-300 py-4`}
          >
            <div className="flex flex-col space-y-3 px-4">
              <NavLink
                to="/"
                className="py-2 px-3 rounded hover:bg-opacity-10 hover:bg-black hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/all-movies"
                className="py-2 px-3 rounded hover:bg-opacity-10 hover:bg-black hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                All Movies
              </NavLink>
              <NavLink
                to="/add-movie"
                className="py-2 px-3 rounded hover:bg-opacity-10 hover:bg-black hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Movie
              </NavLink>
              <NavLink
                to="/my-favorites"
                className="py-2 px-3 rounded hover:bg-opacity-10 hover:bg-black hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                My Favorites
              </NavLink>
              <NavLink
                to="/blog"
                className="py-2 px-3 rounded hover:bg-opacity-10 hover:bg-black hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </NavLink>

              {user ? (
                <div className="flex flex-col space-y-3 border-t pt-3 mt-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/cDkT5m8/default-user.png"
                      }
                      alt={user.displayName || "User"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span>{user.displayName || "User"}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`py-2 px-3 rounded-md ${
                      theme === "dark"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white transition-colors`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col text-center space-y-3 border-t pt-3 mt-3">
                  <Link
                    to="/login"
                    className={`bg-red-600 text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 transition-all duration-300`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`bg-red-600 text-white px-4 py-2 rounded-md font-bold hover:bg-red-700 transition-all duration-300`}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
