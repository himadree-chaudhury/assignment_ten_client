import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const RootLayout = () => {
    return (
      <div>
        <div className="flex justify-end items-center">
          <ThemeToggle></ThemeToggle>
        </div>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    );
};

export default RootLayout;