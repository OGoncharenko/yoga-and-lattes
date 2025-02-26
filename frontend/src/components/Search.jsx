import React, {useState} from 'react';
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = (event) => {
    if(event.key === 'Enter') {
      const query = event.target.value;
      if(location.pathname === "/posts") {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), search: query });
      } else {
        navigate(`/posts?search=${query}`);
      }
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
        <input
          type="text"
          placeholder="Search a post..."
          className='bg-transparent focus:outline-none'
          value={search}
          onKeyDown={handleSearch}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;