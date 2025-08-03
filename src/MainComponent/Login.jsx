import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // path to firebase.js


const Login = () => {

  const navigate = useNavigate();
  // // for geting local storage
  // const [Email, SetEmail] = useState("");
  // const [Password, Setpassword] = useState("");

  // // Hardcoded admin credentials
  // const adminEmail = "admin@123.com";
  // const adminPassword = "admin123";

   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); //  redirect to dashboard
      // alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (Email === adminEmail && Password === adminPassword) {
  //     toast.success("Login Successful!");
  //     navigate("/Dashboard");
  //   } else {
  //     toast.error("Invalid email or password.");
  //   }
  // };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100  px-2 max-[360px]:px-3 sm:px-4 md:px-8 lg:px-16">
      <div className="bg-white  p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl max-[360px]:text-[15px] sm:lg md:text-xl font-bold mb-6 text-center text-blue-600">Login</h1>
         {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5 text-sm max-[360px]:text-[10px] sm:text-base md:text-lg break-words">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1"> Email Address</label>
            <input type="text" id="email" name="email" placeholder="Enter your Email Address"  value={email} required   onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password </label>
            <input type="password" id="password" name="password" placeholder="Enter your Password"  onChange={(e) => setPassword(e.target.value)}
          value={password} required className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className=" flex gap-4 text-center mt-3">
                        <Link to="/ForgotPassword" className= "px-3 py-1 rounded hover:bg-green-600 transition duration-300">Reset Password</Link>
          </div>
          <div className=" flex gap-4 text-center mt-3">
                        <h5>Not registered yet?</h5>
                        <Link to="/register" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300">Register Now</Link>
                      </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"> Login </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
