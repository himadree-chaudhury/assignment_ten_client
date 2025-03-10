import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaClock,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaChevronLeft,
} from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/blogs/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlog(data);

        // Fetch related posts with the same category
        const relatedResponse = await fetch(
          `http://localhost:5000/blogs?category=${data.category}&_limit=3`
        );
        if (!relatedResponse.ok) {
          throw new Error(`HTTP error! Status: ${relatedResponse.status}`);
        }
        const relatedData = await relatedResponse.json();
        // Filter out the current blog post
        setRelatedPosts(relatedData.filter((post) => post.id !== data.id));
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const handleRelatedPostClick = (postId) => {
    navigate(`/blogs/${postId}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        className={`container mx-auto px-4 py-8 text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <h2 className="text-2xl font-bold">Blog post not found</h2>
        <button
          onClick={goBack}
          className="mt-4 flex items-center mx-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaChevronLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      {/* Blog Header */}
      <div className="mb-8">
        <span className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
          {blog.category}
        </span>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <span className="flex items-center">
            <FaUser className="mr-2" /> {blog.author}
          </span>
          <span className="flex items-center">
            <FaCalendarAlt className="mr-2" /> {blog.date}
          </span>
          {blog.readTime && (
            <span className="flex items-center">
              <FaClock className="mr-2" /> {blog.readTime} min read
            </span>
          )}
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded-xl object-cover max-h-96"
        />
      </div>

      {/* Blog Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Content */}
          <div
            className={`prose max-w-none ${
              theme === "dark" ? "prose-invert" : ""
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Share This Post</h3>
            <div className="flex gap-3">
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <FaFacebook />
              </button>
              <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                <FaTwitter />
              </button>
              <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                <FaLinkedin />
              </button>
            </div>
          </div>

          {/* Author Bio */}
          {blog.authorBio && (
            <div
              className={`mt-12 p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex items-start gap-4">
                {blog.authorImage && (
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="text-lg font-semibold">{blog.author}</h4>
                  <p
                    className={`mt-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {blog.authorBio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div
              className={`p-6 rounded-xl mb-8 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Related Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleRelatedPostClick(post.id)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-sm leading-tight">
                        {post.title}
                      </h4>
                      <p
                        className={`text-xs mt-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {post.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Subscription */}
          <div
            className={`p-6 rounded-xl ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h3 className="text-xl font-bold mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p
              className={`mb-4 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get the latest movie insights and updates delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-white text-black"
                }`}
              />
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>

        {/* Comment form */}
        <div
          className={`p-6 rounded-xl mb-8 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h4 className="text-xl font-medium mb-4">Leave a Comment</h4>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-white text-black"
                }`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-white text-black"
                }`}
              />
            </div>
            <textarea
              placeholder="Your Comment"
              rows="4"
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-600 outline-none border border-red-200 focus:border-0 mb-4 ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-black"
              }`}
            ></textarea>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer">
              Post Comment
            </button>
          </form>
        </div>

        {/* Display comments if they exist */}
        {blog.comments && blog.comments.length > 0 ? (
          <div className="space-y-6">
            {blog.comments.map((comment, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                      {comment.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{comment.name}</h4>
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {comment.date}
                      </span>
                    </div>
                    <p
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-center py-6 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;