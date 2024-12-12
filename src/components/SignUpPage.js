import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const validateForm = () => {
    const newErrors = {};

 
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }

 
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
     
      localStorage.setItem('registeredUsername',username);
      localStorage.setItem('registeredPassword',password);
      localStorage.setItem('registeredEmail',email);

      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-turquoise flex items-center justify-center px-4">
      <div className="bg-lightturquoise p-20 w-[800px] ">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          HelpDesk System 
        </h2>
        <div className="flex mb-2 text-xl  justify-center">
        <h3 className="">Sign Up here</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-[500px] text-black ml-20 pl-5 placeholder-[black] pr-4 py-3 border 
                ${errors.username 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'focus:ring-turquoise'}`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative">
           
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[500px] text-black ml-20 pl-5 placeholder-[black] pr-4 py-3 border 
                ${errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'focus:ring-turquoise'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[500px] text-black ml-20 pl-5 placeholder-[black] pr-4 py-3 border 
                ${errors.password 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'focus:ring-turquoise'}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        <div className="flex ml-40 mr-36 w-[300px]">
          <button
            type="submit"
            className="justify-center items-center w-full   bg-blue-600 text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
          </div>
        </form>

        <div className="text-center mt-7  flex justify-around">
        <Link to="/forgot-password" className="text-sm text-red-600 block pr-20">
            Forgot Password
          </Link>
          <Link
            to="/signin"
            className=" font-bold hover:underline"
          >
            Sign In
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;