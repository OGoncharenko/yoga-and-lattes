import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";

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
      <div className="md:hidden text-[#613010]">
        <div className="cursor-pointer text-2xl" onClick={() => setOpen(!open)}>
          {open ? "X" : "="}
        </div>
        {open && (
          <div className="fixed top-16 left-0 w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg bg-[#FAF0E6FF] opacity-90 transition-all ease-in-out">
            <Link to="/" className="py-2">Home</Link>
            <Link to="/" className="py-2">Trending</Link>
            <Link to="/" className="py-2">Most popular</Link>
            <Link to="/profile" className="py-2">Profile</Link>
            <button onClick={handleClick} className="px-4 py-2 bg-[#e2ccbf] text-[#613010] rounded-3xl">
              {isLoading ? "Loading..." : isAuthenticated ? user.username : "Login"}
            </button>
          </div>
        )}
      </div>
      {/*desktop menu*/}
      <div className="hidden md:flex items-center gap-6 font-medium text-[#613010]">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most popular</Link>
        <button onClick={handleClick} className="px-4 py-2 bg-[#e2ccbf] text-[#613010] rounded-3xl">
          {isLoading ? "Loading..." : isAuthenticated ? user.username : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;