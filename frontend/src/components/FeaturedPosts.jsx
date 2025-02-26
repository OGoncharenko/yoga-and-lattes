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
        </div>
        {/*title*/}
        <Link to="/christmas-scenario" className='text-xl lg:text-3xl font-semibold lg:font-bold'>
          The Best Yoga Scenarios for the Christmas Holidays
        </Link>
      </div>
      {/*others*/}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/*second*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
            <img
              src='/find_your_way.jpeg' alt='placeholder'
              className='w-1/3 rounded-3xl object-cover aspect-video h-full'
            />
          {/*details and title*/}
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>02.</h1>
              <Link className='text-blue-800'>Mindset</Link>
            </div>
            {/*title*/}
            <Link to="/find-your-way" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              How to find your way in yoga and meditation
            </Link>
          </div>
        </div>
        {/*third*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          <img
            src='/zen-stones_163782-9216%20(1).jpg'
            alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>03.</h1>
              <Link className='text-blue-800'>Meditation</Link>
            </div>
            {/*title*/}
            <Link to="/benefits-meditation" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              The Benefits of Meditation for the Body and Mind
            </Link>
          </div>
        </div>
        {/*fourth*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          <img
            src='/yoga_nature.jpg'
            alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>04.</h1>
              <Link className='text-blue-800'>Asanas</Link>
            </div>
            {/*title*/}
            <Link to="/test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              Asanas for Beginners: The Best Yoga Poses to Start With
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;