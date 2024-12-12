import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignInModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const savedUsername = localStorage.getItem('registeredUsername');
    const savedPassword = localStorage.getItem('registeredPassword');

    if(username === savedUsername && password === savedPassword){
        navigate('/');
    } else{
        setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-turquoise flex items-center justify-center px-4">
      <div className="bg-lightturquoise p-20  w-[800px]">
        
        <h2 className="text-3xl font-bold text-center mb-8 pb-8">
          HelpDesk System
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="relative">
            
            <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[500px] text-black ml-20 pl-5 placeholder-[black] pr-4 py-3 border  focus:outline-none focus:ring-2 focus:ring-turquoise"
              required
            />
          </div>
          <div className="relative">
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[500px] text-black ml-20 pl-5 pr-4 py-3 border placeholder-[black] focus:outline-none focus:ring-2 focus:ring-turquoise"
              required
            />
          </div>

            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}

          <div className="flex ml-40 mr-36 w-[300px]">
          <button
            type="submit"
            className="justify-center items-center w-full   bg-green-500 text-white py-3 rounded-lg hover:bg-opacity-90 transition duration-300 font-semibold"
            >
            Sign In
          </button>
              </div>
        </form>
        <div className="text-center mt-7  flex justify-around">
        <Link to="/forgot-password" className="text-sm text-red-600 block pr-20">
            Forgot Password?
          </Link>
          <Link
            to="/signup"
            className=" font-bold hover:underline"
          >
            Sign Up
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
