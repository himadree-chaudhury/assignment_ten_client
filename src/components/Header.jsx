import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section>
      <div>
        <div className="w-full">
          {/* Swiper component */}
          <Swiper
            spaceBetween={0} 
            centeredSlides={true} 
            autoplay={{
              delay: 5000, 
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false} 
            modules={[Autoplay, Pagination, Navigation]} 
            className="h-[60vh]"
          >
            {/* First Slide */}
            <SwiperSlide>
              <div className="relative w-full h-full bg-gradient-to-r from-black to-transparent">
                {/* Background image */}
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1"
                  alt="Movie Banner"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white max-w-xl">
                  {/* Main heading for the slide */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover Amazing Movies
                  </h1>
                  {/* Description */}
                  <p className="text-lg mb-6">
                    Explore our collection of handpicked movies across all
                    genres
                  </p>
                  {/* All movies Button */}
                  <Link
                    to="/all-movies"
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition duration-300"
                  >
                    Browse All Movies
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Second Slide */}
            <SwiperSlide>
              <div className="relative w-full h-full bg-gradient-to-r from-black to-transparent">
                {/* Background image */}
                <img
                  src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf"
                  alt="Movie Banner"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white max-w-xl">
                  {/* Main heading for the slide */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Find Your Next Favorite
                  </h1>
                  {/* Description */}
                  <p className="text-lg mb-6">
                    Rate, review, and add movies to your personal collection
                  </p>
                  {/* Sign in Button */}
                  <Link
                    to="/login"
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition duration-300"
                  >
                    Sign In to Start
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Third Slide */}
            <SwiperSlide>
              <div className="relative w-full h-full bg-gradient-to-r from-black to-transparent">
                {/* Background image */}
                <img
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26"
                  alt="Movie Banner"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white max-w-xl">
                  {/* Main heading for the slide */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Share Your Passion
                  </h1>
                  {/* Description */}
                  <p className="text-lg mb-6">
                    Add your favorite movies and share your recommendations
                  </p>
                  {/* Add movie Button */}
                  <Link
                    to="/add-movie"
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition duration-300"
                  >
                    Add a Movie
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Header;
