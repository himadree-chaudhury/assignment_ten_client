import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
      <div className="overflow-hidden">
        <Navbar></Navbar>
        <div className="flex flex-col min-h-screen">
          <main className="grow mt-16">
            <Outlet></Outlet>
          </main>
          <Footer></Footer>
        </div>
      </div>
    );
};

export default RootLayout;