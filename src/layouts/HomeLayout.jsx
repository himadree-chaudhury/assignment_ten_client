import React from 'react';
import Header from '../components/Header';
import FeaturedMovies from '../components/FeaturedMovies';
import { FaFilm, FaDesktop, FaStar, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomeLayout = () => {
    return (
      <section>
        <div>
          <Header></Header>
        </div>
        <div>
          <FeaturedMovies></FeaturedMovies>
        </div>
        {/* Extra Section 1: Movie Categories */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  genre: "Action",
                  image: "https://img.icons8.com/color/96/000000/action.png",
                },
                {
                  genre: "Comedy",
                  image: "https://img.icons8.com/color/96/000000/comedy.png",
                },
                {
                  genre: "Drama",
                  image: "https://img.icons8.com/color/96/000000/drama.png",
                },
                {
                  genre: "Horror",
                  image: "https://img.icons8.com/color/96/000000/horror.png",
                },
                {
                  genre: "Sci-Fi",
                  image: "https://img.icons8.com/color/96/000000/robot.png",
                },
                {
                  genre: "Romance",
                  image:
                    "https://img.icons8.com/?size=100&id=13030&format=png&color=000000",
                },
              ].map(({ genre, image }) => (
                <Link
                  key={genre}
                  to={`/movies?genre=${genre}`}
                  className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={image}
                    alt={genre}
                    className="w-16 h-16 mx-auto mb-4"
                  />
                  <div className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {genre}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore {genre} movies
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Section 2: Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Why Choose CineSphere?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  <FaFilm className="text-primary text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Huge Collection</h3>
                <p className="text-gray-600">
                  Access thousands of movies across all genres and eras, from
                  classics to the latest releases.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  <FaDesktop className="text-primary text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  User-Friendly Interface
                </h3>
                <p className="text-gray-600">
                  Our intuitive design makes it easy to browse, search, and
                  discover new movies.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  <FaStar className="text-primary text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Personalized Favorites
                </h3>
                <p className="text-gray-600">
                  Create your own collection of favorite movies to watch later
                  or recommend to friends.
                </p>
              </div>

              <div className="text-center p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  <FaUsers className="text-primary text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Reviews</h3>
                <p className="text-gray-600">
                  Read honest reviews and ratings from other movie enthusiasts
                  to find your next watch.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
};

export default HomeLayout;