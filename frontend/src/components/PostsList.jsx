import React from 'react';
import PostListItem from "./PostListItem.jsx";

const PostsList = () => {
  return (
    <div className='flex flex-col gap-12 mb-8'>
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  );
};

export default PostsList;