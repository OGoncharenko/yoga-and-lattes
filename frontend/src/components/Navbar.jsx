import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/*logo*/}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <img src="/y&l_logo3.png" className="w-20 h-20" alt="" />
        <span>Yoga&Lattes</span>
      </Link>
      {/*mobile menu*/}
      <div className="md:hidden">
        <div className="cursor-pointer text-2xl" onClick={() => setOpen(!open)}>
          {open ? "X" : "="}
        </div>
        {open && (
          <div className="fixed top-16 left-0 w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg transition-all ease-in-out">
            <Link to="/" className="py-2">Home</Link>
            <Link to="/" className="py-2">Trending</Link>
            <Link to="/" className="py-2">Most popular</Link>
            <Link to="/" className="py-2">About</Link>
            <Link to="/" className="px-4">
              <button className="py-2 px-4 bg-blue-500 text-white rounded-3xl">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
      {/*desktop menu*/}
      <div className="hidden md:flex items-center gap-6 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most popular</Link>
        <Link to="/">About</Link>
        <Link to="/" className="px-4">
          <button className="py-2 px-4 bg-blue-500 text-white rounded-3xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;