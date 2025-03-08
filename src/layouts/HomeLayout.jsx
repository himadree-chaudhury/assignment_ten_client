import React from 'react';
import Header from '../components/Header';
import FeaturedMovies from '../components/FeaturedMovies';

const HomeLayout = () => {
    return (
        <section>
            <div>
                <Header></Header>
            </div>
            <div>
                <FeaturedMovies></FeaturedMovies>
            </div>
       </section>
    );
};

export default HomeLayout;