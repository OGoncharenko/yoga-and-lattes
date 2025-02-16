import React from 'react';
import {Link} from "react-router-dom";

const MainCategories = () => {
  return (
    <div className='hidden md:flex bg-white p-4 rounded-3xl xl:rounded-full shadow-lg items-center justify-center gap-8'>
      <div className='flex-1 flex items-center justify-between flex-wrap'>
        <Link to="/posts" className='bg-orange-300 rounded-full px-4 py-2'>All posts</Link>
        <Link to="/posts?category=meditation" className='hover:bg-orange-100 rounded-full px-4 py-2'>Meditation</Link>
        <Link to="/posts?category=hatha-yoga" className='hover:bg-orange-100 rounded-full px-4 py-2'>Hatha yoga</Link>
        <Link to="/posts?category=asanas" className='hover:bg-orange-100 rounded-full px-4 py-2'>Asanas</Link>
        <Link to="/posts?category=history" className='hover:bg-orange-100 rounded-full px-4 py-2'>History</Link>
        <Link to="/posts?category=mindset" className='hover:bg-orange-100 rounded-full px-4 py-2'>Mindset</Link>
      </div>
      <span className="text-xl font-medium">|</span>
      <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
        <input type="text" placeholder="Search" className='bg-transparent focus:outline-none' />
      </div>
    </div>
  );
};

export default MainCategories;