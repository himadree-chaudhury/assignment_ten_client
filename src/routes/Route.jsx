import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import HomeLayout from "../layouts/HomeLayout";
import AllMovies from "../pages/AllMovies";
import AddMovie from "../pages/AddMovie";
import MyFavorites from "../pages/MyFavorites";
import Blogs from "../pages/Blogs";
import MovieDetails from "../pages/MovieDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/all-movies",
        element: <AllMovies></AllMovies>,
      },
      {
        path: "/all-movies/:id",
        element: <MovieDetails></MovieDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/movies/${params.id}`),
      },
      {
        path: "/add-movie",
        element: <AddMovie></AddMovie>,
      },
      {
        path: "/my-favorites",
        element: <MyFavorites></MyFavorites>,
      },
      {
        path: "/blog",
        element: <Blogs></Blogs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default route;
