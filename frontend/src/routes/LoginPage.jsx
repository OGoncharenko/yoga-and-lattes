import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import InputSignUp from "../components/InputSignUp.jsx";
import {useAuthStore} from "../store/authStore.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="m-auto max-w-md w-full bg-[#e3ccc2] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="relative mb-6">
            <InputSignUp
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-6">
            <InputSignUp
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-6">
            <Link to="/forgot-password" className="text-sm text-[#71a8a5] hover:underline font-semibold">
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="w-full py-3 px-4 bg-[#71a8a5] text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-600 bg-opacity-50 flex justify-center">
        <p className="text-sm text-white">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#f2baa1] hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;