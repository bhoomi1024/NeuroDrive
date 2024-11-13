import React, { useState, useEffect } from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Footer from "../HomePageCompo/Footer";
import logo from "../../assets/logo.png";

const UserLogin = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  Axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3000/auth/UserLogin", {
        email,
        password,
      });

      console.log("Response: ", response);

      if (response.data.status) {
        console.log("Login successful, navigating to /RestaurantLayout");
        navigate("/engine"); // Navigate to the after login page upon successful login
      } else {
        setError(response.data.message || "Login failed"); // Set error state if login failed
      }

      console.log(response);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data); // Log the error response data
        console.error(err.response.status); // Log the error status
        setError(err.response.data.message); // Set error state with server error message
      } else {
        console.error(err); // Log other potential errors
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`h-20 w-full fixed z-50 ${
          isScrolled ? "bg-white shadow-md" : "bg-white shadow-md"
        } top-0`}
      >
        <div className="p-5 flex justify-between items-center">
        <div className="flex justify-center items-center ml-12">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" /> {/* Logo image */}
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-blue-500">Neuro</span>
              <span className="text-lime-500">Drive</span>
            </h1>
          </div>

          <nav className="flex gap-x-7 items-center">
            <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
              <li>
                <Link
                  to="/"
                  className={`text-gray-700 hover:text-gray-900 ${
                    isScrolled ? "bg-gray-100" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center mt-20 lg:mt-32">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md mx-4 lg:mx-0">
          <h2 className="text-2xl font-bold mb-4">User Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center">
            <Link className="text-blue-500" to="/UserForgotPasswordDialog">
              Forgot Password?
            </Link>
            <p>
              Don't have an account?{" "}
              <Link className="text-blue-500" to="/UserLoginRegister">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLogin;
