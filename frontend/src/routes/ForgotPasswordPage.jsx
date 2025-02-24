import React from 'react';
import {motion} from "framer-motion";
import {useState} from "react";
import {useAuthStore} from "../store/authStore.js";
import InputSignUp from "../components/InputSignUp.jsx";
import {Link} from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {isLoading, forgotPassword} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="m-auto max-w-md w-full bg-orange-200 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-500 mb-6 text-center">
              Enter your email address and we will send you a link to reset your password.
            </p>
            <InputSignUp
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              className="w-full py-3 px-4 bg-amber-700 text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
              type="submit"
            >
              {isLoading ? "Loading..." : "Send Email"}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              className="text-gray-500 mb-6 text-center"
            >
              <p className="text-gray-500 mb-6">
                If an account exists for {email}, we will send you an email with a link to reset your password.
              </p>
            </motion.div>
          </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link to="/login" className="text-amber-700 hover:underline font-semibold">
            Return to login
          </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;