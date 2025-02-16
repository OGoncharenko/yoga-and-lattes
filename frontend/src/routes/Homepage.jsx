import React from 'react';
import {Link} from "react-router-dom";
import MainCategories from "../components/MainCategories.jsx";
import FeaturedPosts from "../components/FeaturedPosts.jsx";
import PostsList from "../components/PostsList.jsx";

const Homepage = () => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>/</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/*introduction*/}
      <div className='flex items-center justify-between'>
        {/*titles*/}
        <div className="">
          <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Lorem ipsum dolor sit amet</h1>
          <p className='mt-8 text-md md:text-xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae cumque, dolores ducimus ea eveniet expedita harum in inventore molestiae necessitatibus optio placeat porro quae recusandae repudiandae similique sint totam!</p>
        </div>
        {/*animated buttons*/}
        <Link to="/write" className='hidden md:block relative'>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            // className='text-lg tracking-widest animate-spin animatedButton'
            className='text-lg tracking-widest'
          >
            <path id="circlePath" fill="none" d="M100,100 m0,-75 a75,75 0 1,1 0,150 a75,75 0 1,1 0,-150" />
            <text>
              <textPath href="#circlePath" startOffset="0%">Write your story ◌</textPath>
              <textPath href="#circlePath" startOffset="50%">Share your idea ◌</textPath>
            </text>
          </svg>
          <button className='absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center'></button>
        </Link>
      </div>
      {/*categories*/}
      <MainCategories />
      <FeaturedPosts />
      {/*posts lists*/}
      <div className=''>
        <h1 className='my-8 text-2xl text-gray-600'></h1>
        <PostsList />
      </div>
    </div>
  );
};

export default Homepage;