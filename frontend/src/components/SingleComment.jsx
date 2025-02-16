import React from 'react';

const SingleComment = () => {
  return (
    <div className='p-4 bg-slate-50 rounded-xl mb-8'>
      <div className='flex items-center gap-4'>
        <img src="/human-64.png" className='w-10 h-10 rounded-full object-cover' alt="user" />
        <span>John Doe</span>
        <span className='text-sm text-gray-500'>2 days ago</span>
      </div>
      <div className='mt-4'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quisquam, voluptates.
        </p>
      </div>
    </div>
  );
};

export default SingleComment;