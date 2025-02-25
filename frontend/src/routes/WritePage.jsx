import React, {useEffect, useState} from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useAuthStore} from "../store/authStore.js";
import {useNavigate} from "react-router-dom";

const WritePage = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost)
    }
  })
  const { mutate, isSuccess, data: mutationData } = mutation;

  useEffect(() => {
    if(!isCheckingAuth && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isCheckingAuth]);

  useEffect(() => {
    if (isSuccess) {
      const { data: { slug } } = mutationData;
      navigate(`/${slug}`);
    }
  }, [isSuccess]);

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      content: value,
    }

    mutate(data);
  }

  return (
    <div className='h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col gap-6'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mt-8 mb-6'>
        <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-400 bg-white'>
          Add a cover image
        </button>
          <input
            type='text'
            placeholder="My Awesome Title"
            className='text-4xl font-semibold outline-none bg-transparent'
            id='title'
            name='title'
          />
        <div className='flex items-center gap-4'>
          <label htmlFor="" className='text-sm'>Choose a category:</label>
          <select
            className='p-2 rounded-xl bg-white shadow-md outline-none'
            name="category"
            id="category"
          >
            <option value="general">General</option>
            <option value="meditation">Meditation</option>
            <option value="hatha-yoga">Hatha yoga</option>
            <option value="asanas">Asanas</option>
            <option value="history">History</option>
            <option value="mindset">Mindset</option>
          </select>
        </div>
          <textarea
            name='description'
            placeholder="A Short Description"
            className='p-4 rounded-xl bg-white shadow-md outline-none'/>
          <ReactQuill
            theme="snow"
            className='flex-1 rounded-xl shadow-md bg-white'
            value={value}
            onChange={setValue}
          />
        <button type='submit' className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'>Submit</button>
      </form>
    </div>
  );
};

export default WritePage;