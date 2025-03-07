import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import HomeLayout from '../layouts/HomeLayout';


const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
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