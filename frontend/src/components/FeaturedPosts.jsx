import React from 'react';
import {Link} from "react-router-dom";

const FeaturedPosts = () => {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      {/*first*/}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/*image*/}
        <img
          src='/IMG_8729.JPG'
          alt='placeholder'
          className='rounded-3xl object-cover'
        />
        {/*details*/}
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link className='text-blue-800 lg:text-lg'>Hatha yoga</Link>
          <span className='text-gray-500'>

          </span>
        </div>
        {/*title*/}
        <Link to="/test" className='text-xl lg:text-3xl font-semibold lg:font-bold'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Link>
      </div>
      {/*others*/}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/*second*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
            <img
              src='/yoga_nature.jpg' alt='placeholder'
              className='w-1/3 rounded-3xl object-cover aspect-video h-full'
            />
          {/*details and title*/}
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>02.</h1>
              <Link className='text-blue-800'>Mindset</Link>
              <span className='text-gray-500 text-sm'>2 days ago</span>
            </div>
            {/*title*/}
            <Link to="/test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Link>
          </div>
        </div>
        {/*third*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          <img
            src='/Meditation.jpg'
            alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>03.</h1>
              <Link className='text-blue-800'>Meditation</Link>
              <span className='text-gray-500 text-sm'>2 days ago</span>
            </div>
            {/*title*/}
            <Link to="/test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Link>
          </div>
        </div>
        {/*fourth*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          <img
            src='/asanas.jpg'
            alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>04.</h1>
              <Link className='text-blue-800'>Asanas</Link>
              <span className='text-gray-500 text-sm'>2 days ago</span>
            </div>
            {/*title*/}
            <Link to="/test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;