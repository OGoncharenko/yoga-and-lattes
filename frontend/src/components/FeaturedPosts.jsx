import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const fetchPosts = async () => {
  console.log('Fetching posts from:', `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`);
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`);
  console.log('API response:', response.data);
  return response.data;
}

const FeaturedPosts = () => {
  const {isPending, error, data} = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => fetchPosts(),
  });

  const posts = data;
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if(!posts || data.length === 0) return;


  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      {/*first*/}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/*image*/}
        {posts[0].img && <img
          src={posts[0].img}
          alt='placeholder'
          className='rounded-3xl object-cover'
        />}
        {/*details*/}
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link className='text-blue-800 lg:text-lg'>{posts[0].category}</Link>
        </div>
        {/*title*/}
        <Link to={posts[0].slug} className='text-xl lg:text-3xl font-semibold lg:font-bold'>
          {posts[0].title}
        </Link>
      </div>
      {/*others*/}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/*second*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          {posts[1].img && <img
            src={posts[1].img} alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />}
          {/*details and title*/}
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>02.</h1>
              <Link className='text-blue-800'>{posts[1].category}</Link>
            </div>
            {/*title*/}
            <Link to={posts[1].slug} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              {posts[1].title}
            </Link>
          </div>
        </div>
        {/*third*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          {posts[2].img && <img
            src={posts[2].img}
            alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />}
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>03.</h1>
              <Link className='text-blue-800'>{posts[2].category}</Link>
            </div>
            {/*title*/}
            <Link to={posts[2].slug} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              {posts[2].title}
            </Link>
          </div>
        </div>
        {/*fourth*/}
        <div className='lg:h-1/3 flex justify-between gap-4'>
          {posts[3].img && <img
            src={posts[3].img}
            alt='placeholder'
            className='w-1/3 rounded-3xl object-cover aspect-video h-full'
          />}
          <div className='w-2/3'>
            {/*details*/}
            <div className='flex items-center gap-4 text-sm lg:text-base mb-4'>
              <h1 className='font-semibold'>04.</h1>
              <Link className='text-blue-800'>{posts[3].category}</Link>
            </div>
            {/*title*/}
            <Link to={posts[3].slug} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>
              {posts[3].title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;