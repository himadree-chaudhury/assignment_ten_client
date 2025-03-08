import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./routes/Route";
import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./provider/ThemeProvider";
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={route}></RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
