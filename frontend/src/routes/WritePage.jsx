import React, {useEffect, useState} from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useAuthStore} from "../store/authStore.js";
import {Link, useNavigate} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";
import toast from "react-hot-toast";

const WritePage = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const formData = new FormData();
      for (const key in newPost) {
        formData.append(key, newPost[key]);
      }
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });

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
      toast.success("Post created successfully");
    }
  }, [isSuccess]);

  const [value, setValue] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      description: formData.get('description'),
      img: formData.get('img'),
      content: value,
    }
    mutate(data);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  return (
    <div className='h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col gap-6 pb-20'>
      <Link to={-1} className='text-blue-800 underline text-md flex items-center gap-3'>
        <IoMdArrowRoundBack />
        Back
      </Link>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mt-8 pb-20'>
        <label htmlFor="img" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-400 bg-white cursor-pointer">
          Add a cover image
        </label>
        <input type="file" name="img" className="hidden" id="img" onChange={(e) => handleImageChange(e)} />
        {imagePreview && <div className='lg:block lg:w-2/5'>
          <img
            src={imagePreview}
            alt="Image Preview"
            className='rounded-3xl object-cover'
          />
        </div>}
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
            className="flex-1 rounded-xl shadow-md bg-white text-2xl"
            value={value}
            onChange={setValue}
          />
        <button type='submit' className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'>Submit</button>
      </form>
    </div>
  );
};

export default WritePage;