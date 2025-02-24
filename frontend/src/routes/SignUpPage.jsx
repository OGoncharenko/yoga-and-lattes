import React, {useEffect, useState} from 'react';
import InputSignUp from "../components/InputSignUp.jsx";
import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {LuLoaderCircle} from "react-icons/lu";

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading, isAuthenticated} = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/verify-email');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="m-auto max-w-md w-full bg-[#e3ccc2] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSignUp}>
          <InputSignUp
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputSignUp
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputSignUp
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="w-full py-3 px-4 bg-[#71a8a5] text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
            type='submit'
            // isDisabled={isLoading}
          >
            {isLoading ? <LuLoaderCircle className="animate-spin mx-auto" size={24}/> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-600 bg-opacity-50 flex justify-center">
        <p className="text-sm text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-[#f2baa1] hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;