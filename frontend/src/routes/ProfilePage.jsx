import React from 'react';
import Avatar from "../components/Avatar.jsx";
import {useAuthStore} from "../store/authStore.js";
import {motion} from "framer-motion";
import {FaRegEdit} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {IoMdClose} from "react-icons/io";

const ProfilePage = () => {
  const {user} = useAuthStore();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, logout  } = useAuthStore();

  const handleClick = async () => {
    if (isAuthenticated) {
      await logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="mx-auto my-8 max-w-lg w-full text-[#613010] items-center bg-[#f5c5aa] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="flex justify-end items-center m-2">
        <button
          className="font-bold shadow-md rounded-full p-2 bg-[#71a8a5] text-white cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoMdClose />
        </button>
      </div>
      <div className="relative max-w-fit mx-auto my-4 items-center gap-4 p-8 rounded-full shadow-md border-2 border-[#71a8a5]">
        <Avatar />
      </div>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="flex flex-col p-8 gap-4 max-w-md items-center justify-center bg-[#fdf0e7] rounded-2xl shadow-xl my-4 mx-auto"
      >
        <h1 className="text-2xl font-semibold">{user.username}</h1>
        <h2>{user.email}</h2>
      </motion.div>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="flex flex-col p-8 max-w-md items-center justify-center bg-[#fdf0e7] rounded-2xl shadow-xl my-4 mx-auto"
      >
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="flex flex-col items-center justify-center gap-1"
        >
          <span className="font-semibold">{user.posts?.length} {user.posts?.length === 1 ? "Post Created" : "Posts Created"}</span>
          <span>
            {user.postCount}
          </span>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="flex flex-col p-8 gap-2 max-w-md items-center justify-center bg-[#fdf0e7] rounded-2xl shadow-xl my-4 mx-auto">
        <h1 className="font-semibold">Account Activity</h1>
        <p>
          <span className="underline mr-4">Joined on: </span>
          {new Date(user.createdAt).toDateString()}
        </p>
        <p>
          <span className="underline mr-4">Last logged in on: </span>
          {new Date(user.updatedAt).toDateString()}
        </p>
      </motion.div>
      <motion.div className="flex items-center justify-center gap-4 p-8">
        <button onClick={handleClick} className="px-6 py-2 bg-[#71a8a5] text-white rounded-3xl shadow-md">
          {isLoading ? "Loading..." : isAuthenticated ? "Logout" : "Login"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;