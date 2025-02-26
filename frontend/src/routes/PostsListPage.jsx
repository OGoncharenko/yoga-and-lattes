import React, {useState} from 'react';
import PostsList from "../components/PostsList.jsx";
import SideMenu from "../components/SideMenu.jsx";
import {Link} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import Footer from "../components/Footer.jsx";

const PostsListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=''>
      <Link to={-1} className='text-blue-800 underline text-md flex items-center gap-3 mb-6'>
        <IoMdArrowRoundBack />
        Back
      </Link>
      <button onClick={() => setOpen((prev) => !prev)} className='bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden'>
        {open ? 'Close' : 'Filter or Search'}
      </button>
      <div className='flex flex-col-reverse gap-8 md:flex-row justify-between'>
        <PostsList />
        <div className={`${open ? 'block' : 'hidden'} md:block`}>
          <SideMenu />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostsListPage;