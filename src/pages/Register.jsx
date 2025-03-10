import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
// import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { theme } = useContext(ThemeContext);
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    if (pass.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(pass)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must contain at least one lowercase letter";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    setPasswordError(validatePassword(pass));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);

      //   toast.success("Registration successful!");
      navigate("/");
    } catch (error) {console.log(error);
      //   toast.error(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      //   toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      //   toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Account
            </span>
            <span className="bg-red-600 rounded-sm p-1 text-white">
              Register
            </span>
          </h1>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                theme === "dark" ? "text-gray-300" : "bg-[#e8effe]"
              }`}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                theme === "dark" ? "text-gray-300" : "bg-[#e8effe]"
              }`}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Photo URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="photoURL"
              className={`w-full px-4 py-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                theme === "dark" ? "text-gray-300" : "bg-[#e8effe]"
              }`}
              placeholder="https://example.com/photo.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className={`block font-medium mb-2  ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                theme === "dark" ? "text-gray-300" : "bg-[#e8effe]"
              }`}
              placeholder="******"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full font-bold text-white py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 transition duration-300 cursor-pointer"
            disabled={!!passwordError}
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p
            className={`text-sm mt-1  ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSignInWithGoogle}
              className="w-full flex items-center justify-center gap-2 font-bold bg-red-600 hover:bg-red-700 text-white rounded-md py-2 px-4 transition duration-300 cursor-pointer"
            >
              <FaGoogle className="text-white" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
