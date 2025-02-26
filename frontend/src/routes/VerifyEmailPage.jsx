import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useAuthStore} from "../store/authStore.js";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {error, isLoading, verifyEmail, isAuthenticated} = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedValues = value.slice(0, 6).split("");
      for (let i = 0; i < pastedValues.length; i++) {
        newCode[index + i] = pastedValues[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] > 0) {
      inputRefs.current[index - 1].focus();
    }}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try{
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(code.every(digit => digit !== "")) {
      handleSubmit(new Event('submit'));
    }
  }, [code]);

  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="m-auto max-w-md w-full bg-[#e3ccc2] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Please enter the verification code sent to your email address
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                className="w-12 h-12 text-center border-2 border-[#71a8a5] rounded-lg focus:outline-none focus:border-[#71a8a5]"
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength='6'
                value={digit}
                onChange={(e) => {
                  handleChange(index, e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(index, e);
                }}
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="w-full py-3 px-4 bg-[#71a8a5] text-white font-bold rounded-lg shadow-lg focus:outline-none transition duration-200"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const verificationCode = code.join("");
              console.log(verificationCode);
              navigate("/login");
            }}
          >
            Verify Email
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;