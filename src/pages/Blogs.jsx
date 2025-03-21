import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("All"); 
  const { theme } = useContext(ThemeContext);

  // List of predefined categories for filtering blogs
  const categories = [
    "All",
    "Reviews",
    "News",
    "Interviews",
    "Behind The Scenes",
  ];

  useEffect(() => {
    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cinesphere-himadree.vercel.app/blogs`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data); 
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchBlogs(); 
  }, []); 

  // Filter blogs based on the selected category
  const filteredBlogs =
    currentCategory === "All"
      ? blogs 
      : blogs.filter((blog) => blog.category === currentCategory);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setCurrentCategory(category); // Update the selected category
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            Movie
          </span>
          <span className="bg-red-600 rounded-sm p-1 text-white">Insights</span>
        </h1>
        <p
          className={`text-lg max-w-3xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Dive into the world of movie with expert reviews, industry news,
          exclusive interviews, and behind-the-scenes content from your favorite
          movies.
        </p>
      </div>

      {/* Category Filter Section */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
              currentCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Blog Section */}
      {filteredBlogs.length > 0 && (
        <div
          className="mb-12 bg-cover bg-center rounded-xl overflow-hidden relative h-96"
          style={{ backgroundImage: `url(${filteredBlogs[0].image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
          {/* Overlay for better readability */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            {/* Display blog category */}
            <span className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 self-start">
              {filteredBlogs[0].category}
            </span>
            {/* Display blog title */}
            <h2 className="text-3xl font-bold mb-3">
              {filteredBlogs[0].title}
            </h2>
            {/* Display blog excerpt */}
            <p className="text-lg mb-4">{filteredBlogs[0].excerpt}</p>{" "}
            <div className="flex items-center space-x-4 text-sm">
              {/* Display author name */}
              <span className="flex items-center">
                <FaUser className="mr-2" /> {filteredBlogs[0].author}{" "}
              </span>
              {/* Display publish date */}
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" /> {filteredBlogs[0].date}{" "}
              </span>
            </div>
            <Link
              to={`/blogs/${filteredBlogs[0]?._id}`} // Navigate to the blog details page
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg mt-6 self-start transition-colors cursor-pointer"
            >
              Read More
            </Link>
          </div>
        </div>
      )}

      {/* Blog Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.slice(1).map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
          >
            <div className="h-48 bg-cover bg-center">
              <img src={blog.image} alt={blog.title} />
            </div>
            {/* Blog image */}
            <div className="p-6 flex flex-col grow">
              {/* Display blog category */}
              <span className="bg-gray-700 w-fit text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {blog.category}
              </span>
              {/* Display blog title */}
              <h3 className="text-xl font-bold mt-2 mb-3 text-white">
                {blog.title}
              </h3>
              {/* Display blog excerpt */}
              <p className="text-gray-400 mb-4 grow">{blog.excerpt}</p>{" "}
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                  {/* Display author name */}
                <span className="flex items-center">
                  <FaUser className="mr-1" /> {blog.author}{" "}
                </span>
                  {/* Display publish date */}
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> {blog.date}{" "}
                </span>
              </div>
              {/* Read article button */}
              <Link
                to={`/blogs/${blog?._id}`} 
                className="w-full bg-red-600 hover:bg-red-700 text-white text-center font-medium py-2 rounded transition-colors cursor-pointer mt-auto"
              >
                Read Article
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Subscription Section */}
      <div
        className={`rounded-xl p-8 mt-16 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <h3
            className={`text-2xl font-bold mb-3 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Stay Updated with the Latest in Us
          </h3>
          <p
            className={`mb-6  ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Subscribe to our newsletter and receive weekly updates on new
            releases, exclusive interviews, and behind-the-scenes content
            directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address" 
              className={`flex-grow px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
            />
            <button className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
