import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./routes/Route";
import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./provider/ThemeProvider";
import AuthProvider from "./provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./provider/ContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ContextProvider>
          <RouterProvider
            router={route}
            // !If these features are turned false, an error occurs
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          ></RouterProvider>
          {/* React Hot Toast container */}
          <Toaster></Toaster>
        </ContextProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
