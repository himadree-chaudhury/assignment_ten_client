import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";

const ErrorPage = () => {
  const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);


  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      {/* CineCamera SVG */}
      <svg
        version="1.1"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100px"
        height="100px"
        viewBox="0 0 512 512"
        xml:space="preserve"
        fill="#e70000"
        stroke="#e70000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <style type="text/css"> </style>
          <g>
            <path
              class="st0"
              d="M343.656,451.109C410,411.438,454.422,338.906,454.422,256c0-125.484-101.719-227.219-227.203-227.219 C101.719,28.781,0,130.516,0,256s101.719,227.219,227.219,227.219H512v-32.109H343.656z M318.484,145.875 c23.547-13.594,53.641-5.531,67.234,18.016s5.531,53.656-18.016,67.25c-23.547,13.578-53.641,5.516-67.234-18.016 C286.859,189.563,294.938,159.469,318.484,145.875z M300.453,297.688c13.609-23.547,43.703-31.609,67.25-18.016 c23.547,13.609,31.609,43.703,18.016,67.25s-43.688,31.609-67.25,18.016C294.938,351.344,286.859,321.234,300.453,297.688z M227.219,72.375c27.188,0,49.219,22.031,49.219,49.219s-22.031,49.25-49.219,49.25s-49.25-22.063-49.25-49.25 S200.031,72.375,227.219,72.375z M249.938,256c0,12.563-10.172,22.719-22.719,22.719c-12.563,0-22.719-10.156-22.719-22.719 s10.156-22.719,22.719-22.719C239.766,233.281,249.938,243.438,249.938,256z M68.703,163.891 c13.594-23.547,43.703-31.609,67.25-18.016s31.609,43.688,18.016,67.25c-13.594,23.531-43.703,31.609-67.25,18.016 C63.188,217.547,55.109,187.438,68.703,163.891z M135.969,364.938c-23.563,13.594-53.656,5.531-67.266-18.016 c-13.578-23.547-5.516-53.656,18.016-67.266c23.547-13.594,53.656-5.516,67.25,18.031S159.5,351.344,135.969,364.938z M177.969,389.203c0-27.188,22.063-49.234,49.25-49.234s49.219,22.047,49.219,49.234s-22.031,49.234-49.219,49.234 S177.969,416.391,177.969,389.203z"
            ></path>
          </g>
        </g>
      </svg>
      <div className="text-center">
        {/* Error Message */}
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p
          className={`my-4 pb-4 text-lg w-3/4 mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Oops! The page you are looking for does not exist.
        </p>
        {/* Navigate To Back Button */}
        <Link
          onClick={() => navigate(-1)}
          className={`font-bold px-8 py-3 rounded-3xl cursor-pointer duration-300 transition-all bg-red-600 hover:bg-red-700 text-white ${
            (theme === "dark") & "bg-red-600"
          }`}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
