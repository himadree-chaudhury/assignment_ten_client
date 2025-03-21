import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

import logo from "../assets/logo.png";

const Footer = () => {
  // Dynamically calculate the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            {/* Logo and site name with a link to the homepage */}
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="CineSphere Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold">
                Cine
                {/* Highlighting "Sphere" in red */}
                <span className="bg-red-600 rounded-sm p-1 text-white">
                  Sphere
                </span>
              </span>
            </Link>
            {/* Description of the website */}
            <p className="text-gray-400 mb-4">
              Discover, explore, and track your favorite movies with our
              comprehensive movie database. Add movies to your favorites and
              keep up with the latest releases.
            </p>
            {/* Social media icons linking to external platforms */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            {/* Title for the quick links section */}
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            {/* List of navigation links */}
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-movies"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/add-movie"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Add Movie
                </Link>
              </li>
              <li>
                <Link
                  to="/my-favorites"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  My Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Spotlight
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            {/* Contact details displayed with icons */}
            <div className="space-y-3">
              <div className="flex items-center">
                <FaEnvelope className="text-primary mr-2" />
                <span className="text-gray-400">contact@cinesphere.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-primary mr-2" />
                <span className="text-gray-400">+88 012-345-67890</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-primary mr-2" />
                <span className="text-gray-400">
                  123 Cineplex Avenue, Film City
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          {/* Dynamic copyright notice with the current year */}
          &copy; {currentYear} CineSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
