import React from 'react';
import PostListItem from "./PostListItem.jsx";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  return response.data;
}

const PostsList = () => {
  const {isPending, error, data} = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetchPosts(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log({data})

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