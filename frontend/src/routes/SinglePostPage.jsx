import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions.jsx";
import Search from "../components/Search.jsx";
import Comments from "../components/Comments.jsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const SinglePostPage = () => {
  const { slug} = useParams();
  const {data, isFetched} = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
    },
    enabled: !!slug,
  });

  if (!isFetched) return null;

  const post = data.data;

  return (
    <div className='flex flex-col gap-8'>
      {/*details*/}
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
            { post.title }
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span className='text-gray-600'>By
              <Link to="/test" className='text-blue-800'> {post.user.username}</Link>
            </span>
            <span className='text-gray-600'> in </span>
            <Link to="/test" className='text-blue-800'>{post.category}</Link>
            <span className='text-gray-600'>2 days ago</span>
          </div>
          <p className='text-gray-500 font-medium'>
            {post.description}
          </p>
        </div>
        <div className='hidden lg:block lg:w-2/5'>
          <img
            src='/Meditation.jpg'
            alt='placeholder'
            className='rounded-3xl object-cover'
          />
        </div>
      </div>
      {/*content*/}
      <div className='flex flex-col md:flex-row gap-8'>
        {/*text*/}
        <div className='lg:text-lg flex flex-col gap-6 text-justify' dangerouslySetInnerHTML={{ __html: post.content }} />
        {/*menu*/}
        <div className='px-4 h-max sticky top-8'>
          <h1 className='mb-4 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-8'>
              <img src="/human-64.png"
                   className='w-12 h-12 rounded-full stroke-1 stroke-amber-800 object-cover'
              />
              <Link>John Doe</Link>
            </div>
            <p className='text-sm text-gray-500'>
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <div className='flex gap-2'>
              <Link>
                <img src="/Instagram_logo.svg" alt="Instagram" className='w-6 h-6' />
              </Link>
              <Link>
                <img src="/facebook.svg" alt="Facebook" className='w-6 h-6' />
              </Link>
            </div>
          </div>
          <PostMenuActions />
          <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/posts" className='underline'>All</Link>
            <Link to="/posts?cat=meditation" className='underline'>Meditation</Link>
            <Link to="/posts?cat=hatha-yoga" className='underline'>Hatha yoga</Link>
            <Link to="/posts?cat=asanas" className='underline'>Asanas</Link>
            <Link to="/posts?cat=history" className='underline'>History</Link>
            <Link to="/posts?cat=mindset" className='underline'>Mindset</Link>
          </div>
          <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default SinglePostPage;