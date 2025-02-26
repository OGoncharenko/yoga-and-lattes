import React from 'react';
import {Link} from "react-router-dom";

const PostListItem = ({post}) => {
  return (
    <div className='flex flex-col xl:flex-row gap-8'>
      <div className='md:hidden xl:block xl:w-1/3'>
        {/*{post.img && <img src={post.img} alt="img" className='rounded-2xl object-cover w-full aspect-video'/>}*/}
        {post.img ? <img src={post.img} alt="img" className='rounded-2xl object-cover w-full aspect-video'/> : <img src='/default_img.png' alt="default" className='rounded-2xl object-cover w-full aspect-video'/>}

      </div>
      {/*details*/}
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to={`/${post.slug}`} className='text-4xl font-semibold'>
          {post.title}
        </Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
          <span className='text-gray-600'>By
            {post?.user && <Link to="/profile" className='text-blue-800'> {post.user.username}</Link>}
          </span>
          <span className='text-gray-600'> in </span>
          <Link to={`/posts?category=${post.category}`} className='text-blue-800'>{post.category}</Link>
          <span className='text-gray-600'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <p>
          {post.description}
        </p>
        <Link to={`/${post.slug}`} className='text-blue-800 underline text-sm'>Read more</Link>
      </div>
    </div>
  );
};

export default PostListItem;