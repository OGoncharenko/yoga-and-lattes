import React, {useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

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
  );
};

export default Search;