import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/cineSphere.svg"

const Navbar = () => {
    return (
      <section>
        <div className="">
          <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link>Home</Link>
                  </li>
                  <li>
                    <a>Parent</a>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Item 3</a>
                  </li>
                </ul>
              </div>
              <p className="text-2xl font-semibold flex justify-center items-center">
                <img src={logo} alt="CineSphere" className="w-16" />
                Cine
                <span className="bg-accent rounded-sm p-1 text-black">
                  Sphere
                </span>
              </p>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link>Home</Link>
                </li>
                <li>
                  <Link>All Movies</Link>
                </li>
                <li>
                  <Link>Add Movies</Link>
                </li>
                <li>
                  <Link>Favorites</Link>
                </li>
                <li>
                  <details>
                    <summary>Genre</summary>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
            <div className="navbar-end space-x-1">
              <Link className="btn btn-accent rounded">Login</Link>
              <Link className="btn btn-accent rounded">Register</Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Navbar;