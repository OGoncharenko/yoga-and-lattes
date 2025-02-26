import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {IoMdClose} from "react-icons/io";
import {IoMenu} from "react-icons/io5";
import {motion} from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, logout, user  } = useAuthStore();

  const handleClick = async () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between my-6">
      {/*logo*/}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <img src="/F37748_4.png" className="w-20 h-20 rounded-2xl" alt="" />
        <span><img src="/y&l_sign_center.png" className="w-20 h-20 mt-2"/></span>
      </Link>
      {/*mobile menu*/}
      <motion.div className="md:hidden text-[#613010]">
        <div className="cursor-pointer text-2xl" onClick={() => setOpen(!open)}>
          {open ? <IoMdClose /> : <IoMenu />}
        </div>
        {open && (
          <div className="fixed top-16 left-0 w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg bg-[#FAF0E6FF] opacity-90 transition-all ease-in-out z-50">
            <Link to="/" className="py-2" onClick={() => setOpen(false)}>Home</Link>
            <Link to={`/posts?user=${user._id}`} className="py-2" onClick={() => setOpen(false)}>My Posts</Link>
            <button onClick={async () => {await handleClick(); setOpen(false); }} className="px-4 py-2 bg-[#e2ccbf] text-[#613010] rounded-3xl">
              {isLoading ? "Loading..." : isAuthenticated ? user.username : "Login"}
            </button>
          </div>
        )}
      </motion.div>
      {/*desktop menu*/}
      <div className="hidden md:flex items-center gap-6 font-medium text-[#613010]">
        <Link to="/">Home</Link>
        {!!user && <Link to={`/posts?user=${user._id}`} className="py-2">My Posts</Link>}
        <button onClick={handleClick} className="px-4 py-2 bg-[#e2ccbf] text-[#613010] rounded-3xl">
          {isLoading ? "Loading..." : isAuthenticated ? user.username : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;