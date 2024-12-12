import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail()) {
      console.log("Password reset requested for:", email);
    }
  };

  return (
    <div className="min-h-screen bg-turquoise flex items-center justify-center p-10">
      <div className="bg-lightturquoise p-10 w-[800px]">
        <div className="mb-8 text-gray-800">
        <p className=" text-center ">
          Don't worry, Enter your email below and we will
        </p>
        <p className="text-center">send you a link to change password.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[500px] ml-20 pl-5 placeholder-[black] pr-4 py-3 border focus:outline-none focus:ring-2 
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-turquoise"
            }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              className="w-72 bg-green-500 text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300 font-semibold"
            >
              Submit
            </button>

            <Link
              to="/signin"
              className="w-72 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
