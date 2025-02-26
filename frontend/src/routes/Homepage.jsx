import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import MainCategories from "../components/MainCategories.jsx";
import FeaturedPosts from "../components/FeaturedPosts.jsx";
import PostsList from "../components/PostsList.jsx";
import {CiPen} from "react-icons/ci";
import {PiFlowerLotus} from "react-icons/pi";
import Footer from "../components/Footer.jsx";

const Homepage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='mt-4 flex flex-col gap-4'>
      {/*introduction*/}
      <div className='flex items-center justify-between'>
        {/*titles*/}
        <div className="">
          <h1 className='hidden md:block text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Your sanctuary for mindfulness, wellness, and growth</h1>
          <p className='md:block mt-8 text-md md:text-xl sm:text-md'>
            Grab your cup of coffee and explore insights and practices to deepen your yoga journey and nurture your well-being
          </p>
        </div>
        {/*animated buttons*/}
        <Link to="/write" className='md:block relative'>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className='text-lg tracking-widest animate-spin animatedButton'
          >
            <path id="circlePath" fill="none" d="M100,100 m0,-75 a75,75 0 1,1 0,150 a75,75 0 1,1 0,-150" />
            <text>
              <textPath href="#circlePath" startOffset="0%">Write your story ◌</textPath>
              <textPath href="#circlePath" startOffset="50%">Share your idea ◌</textPath>
            </text>
          </svg>
          <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-[#71a8a5] rounded-full flex items-center justify-center'>
            <PiFlowerLotus className="text-[#FAF0E6FF] w-10 h-10" />
          </button>
        </Link>
      </div>
      <button onClick={() => setOpen((prev) => !prev)} className='bg-[#e2ccbf] text-sm text-[#613010] px-4 py-2 rounded-2xl mb-4 md:hidden'>
        {open ? 'Close' : 'Filter or Search'}
      </button>
      {/*categories*/}
      <div className={`${open ? 'block' : 'hidden'} md:block`}>
        <MainCategories />
      </div>
      <FeaturedPosts />
      {/*posts lists*/}
      <div className=''>
        <h1 className='my-8 text-2xl text-gray-600'></h1>
        <PostsList />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;