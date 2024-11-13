import React, { useState, useEffect } from "react";
import { SiGreasyfork } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Footer from "../HomePageCompo/Footer";

const UserForgotPasswordDialog  = () => {
  const navigate = useNavigate();
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

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3000/auth/UserForgotPasswordDialog", {
        email,
      });

      console.log("Response: ", response);

      if (response.data.status === "success") {
        alert("Password reset link sent successfully.");
        navigate("/UserLogin"); // Navigate to password reset sent page
        
      } else {
        setError(response.data.message || "Password reset request failed");
      }
    } catch (err) {
      console.error("Password reset request failed:", err);
      setError("Failed to send password reset link.");
    }
  };

  const goToResLogin = () => {
    navigate("/UserLogin");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg`}
      >
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <p className="mb-4 text-gray-600">
            Enter your email address below and we will send you a link to reset your password.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handlePasswordReset}>
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
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </form>
          <button
            onClick={goToResLogin}
            className="mt-4 block w-full text-center text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center mt-16 lg:flex-row lg:justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md m-4 lg:m-0 lg:ml-16 mt-4">
        
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
      <Footer />
    </div>
  );
};

export default UserForgotPasswordDialog ;
