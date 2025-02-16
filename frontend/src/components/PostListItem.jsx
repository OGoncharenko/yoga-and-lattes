import React from 'react';
import {Link} from "react-router-dom";

const PostListItem = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-8'>
      <div className='md:hidden xl:block xl:w-1/3'>
        <img src="/Meditation.jpg" className='rounded-2xl object-cover' />
      </div>
      {/*details*/}
      <div className='flex flex-col gap-4 xl:w-2/3'>
        <Link to="/test" className='text-4xl font-semibold'>
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
        </Link>
        <div className='flex items-center gap-2 text-gray-400 text-sm'>
          <span className='text-gray-600'>By
            <Link to="/test" className='text-blue-800'>John Doe</Link>
          </span>
          <span className='text-gray-600'> in </span>
          <Link to="/test" className='text-blue-800'>Meditation</Link>
          <span className='text-gray-600'>2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae cumque, dolores ducimus ea eveniet
          expedita harum in inventore molestiae necessitatibus optio placeat porro quae recusandae repudiandae similique
          sint totam!
        </p>
        <Link to="/test" className='text-blue-800 underline text-sm'>Read more</Link>
      </div>
    </div>
  );
};

export default PostListItem;