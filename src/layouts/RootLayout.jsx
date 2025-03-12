import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="overflow-hidden">
      {/* Navbar Component */}
      <Navbar></Navbar>

      {/* Main Content Container */}
      <div className="flex flex-col min-h-screen">
        <main className="grow mt-16">
          {/* Dynamic Content Container */}
          <Outlet></Outlet>
        </main>

        {/* Footer Component */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
