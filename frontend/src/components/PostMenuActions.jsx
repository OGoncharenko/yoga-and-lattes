import React from 'react';
import {FaRegEdit} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";

const PostMenuActions = ({post}) => {
  const { slug } = useParams();
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className=''>
      <h1 className='mt-8 mb-4 text-sm font-semibold underline'>Actions</h1>
      {isAuthenticated && post.user._id === user._id && (
        <Link to={`/edit/${slug}`} className='flex gap-2 items-center py-2 text-sm cursor-pointer'>
          <FaRegEdit />
          <span>Edit this Post</span>
        </Link>
      )}
    </div>
  );
};

export default PostMenuActions;