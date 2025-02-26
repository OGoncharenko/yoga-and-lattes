import React from 'react';
import {FaRegEdit} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";

const PostMenuActions = ({post}) => {
  const { slug } = useParams();
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className='mt-6'>
        {isAuthenticated && post.user._id === user._id && (
      <div className="font-semibold shadow-md rounded-xl px-2 border-2 border-[#71a8a5]  inline-block">
        <Link to={`/edit/${slug}`} className='flex gap-2 items-center py-2 text-sm cursor-pointer'>
          <FaRegEdit />
          <span>Edit this Post</span>
        </Link>
      </div>
      )}
    </div>
  );
};

export default PostMenuActions;