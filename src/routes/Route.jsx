import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import HomeLayout from '../layouts/HomeLayout';
import AllMovies from '../pages/AllMovies';
import AddMovies from '../pages/AddMovies';
import Favorites from '../pages/Favorites';
import Blogs from '../pages/Blogs';


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
        path: "/add-movie",
        element: <AddMovies></AddMovies>,
      },
      {
        path: "/my-favorites",
        element: <Favorites></Favorites>,
      },
      {
        path: "/blog",
        element:<Blogs></Blogs>
      },
      // {
      //   path: "/auth",
      //   element: <AuthLayout></AuthLayout>,
      //   children: [
      //     {
      //       path: "/auth/login",
      //       element: <Login></Login>,
      //     },
      //     {
      //       path: "/auth/register",
      //       element: <Register></Register>,
      //     },
      //     {
      //       path: "/auth/resetPassword",
      //       element: <PasswordReset></PasswordReset>,
      //     },
      //     {
      //       path: "/auth/updateProfile",
      //       element: (
      //         <PrivateRoute>
      //           <UpdateProfile></UpdateProfile>
      //         </PrivateRoute>
      //       ),
      //     },
      //     {
      //       path: "/auth/userProfile",
      //       element: (
      //         <PrivateRoute>
      //           <UserProfile></UserProfile>
      //         </PrivateRoute>
      //       ),
      //     },
      //   ],
      // },
      // {
      //   path: "/:title",
      //   element: (
      //     <PrivateRoute>
      //       <TripDetails></TripDetails>
      //     </PrivateRoute>
      //   ),
      //   loader: () => fetch(`/tripData.json`),
      // },
    ],
  },
]);

export default route;