import React from 'react';
import PostListItem from "./PostListItem.jsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useLocation} from "react-router-dom";

const fetchPosts = async (search='') => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts${search}`);
  return response.data;
}

const PostsList = () => {
  const { search } = useLocation();

  console.log({search})

  const {isPending, error, data} = useQuery({
    queryKey: ['repoData', search],
    queryFn: () => fetchPosts(search),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className='flex flex-col gap-12 mb-8'>
      {
        data.map((post) => {
          return <PostListItem key={post._id} post={post} />
        })
      }
    </div>
  );
};

export default PostsList;