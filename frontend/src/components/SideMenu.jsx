import React from 'react';
import Search from "./Search.jsx";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (event) => {
    const sort = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: sort });
  }

  return (
    <div className='px-4 h-max sticky top-8'>
      <Search />
      <h1 className='mt-4 text-sm font-medium'>Filter</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            name="sort"
            value="desc"
            id="newest"
            className='appearance-none w-4 h-4 border-blue-800 border-[1.5px] bg-white rounded-sm cursor-pointer checked:bg-blue-800'
            onClick={handleSort}
          />
          Newest
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input
            type="radio"
            name="sort"
            value="asc"
            id="oldest"
            className='appearance-none w-4 h-4 border-blue-800 border-[1.5px] bg-white rounded-sm cursor-pointer checked:bg-blue-800'
            onClick={handleSort}
          />
          Oldest
        </label>
      </div>
      <h1 className='mt-4 text-sm font-medium'>Categories</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <Link to="/posts" className='underline'>All</Link>
        <Link to="/posts?category=meditation" className='underline'>Meditation</Link>
        <Link to="/posts?category=hatha-yoga" className='underline'>Hatha Yoga</Link>
        <Link to="/posts?category=asanas" className='underline'>Asanas</Link>
        <Link to="/posts?category=mindset" className='underline'>Mindset</Link>
        <Link to="/posts?category=history" className='underline'>History</Link>
      </div>
    </div>
  );
};

export default SideMenu;