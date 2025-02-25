import React, {useEffect, useState} from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useAuthStore} from "../store/authStore.js";
import {useNavigate, useParams} from "react-router-dom";

const EditPage = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();
  const { postSlug } = useParams();
  const {data, isFetched} = useQuery({
    queryKey: ['post', postSlug],
    queryFn: async () => {
      return axios.get(`${import.meta.env.VITE_API_URL}/posts/${postSlug}`)
    },
  });

  const [post, setPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(post?.img);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const formData = new FormData();
      for (const key in newPost) {
        formData.append(key, newPost[key]);
      }
      return axios.put(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
  })

  const { mutate, isSuccess } = mutation;

  useEffect(() => {
    if(!isCheckingAuth && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isCheckingAuth]);

  useEffect(() => {
    if(isFetched) {
      setPost(data.data);
      setImagePreview(data.data.img);
    }
  }, [data, isFetched]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/${postSlug}`);
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { user, ...updatedPost } = { ...post, img: formData.get('img') };
    mutate(updatedPost);
    if (mutation.isSuccess) {
      navigate(`/${postSlug}`);
    }
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

  const handleChange = (e) => {
    setPost({...post, [e.target.name]: e.target.value})
  }

  const handleDelete = async () => {
    const result = await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`);
    if (result.status === 200) {
      navigate('/');
    }
  }

  if (!post) return null;

  return (
    <div className='h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col gap-6'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
        <label htmlFor="img" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-400 bg-white cursor-pointer">
          Add a cover image
        </label>
        <input type="file" name="img" className="hidden" id="img" onChange={(e) => handleImageChange(e)} />
        {imagePreview && <div className='hidden lg:block lg:w-2/5'>
          <img
            src={imagePreview}
            alt="Image Preview"
            className='rounded-3xl object-cover'
          />
        </div>}
          <input
            type='text'
            placeholder="My Awesome Story"
            className='text-4xl font-semibold outline-none bg-transparent'
            id='title'
            name='title'
            value={post?.title}
            onChange={handleChange}
          />
        <div className='flex items-center gap-4'>
          <label htmlFor="" className='text-sm'>Choose a category:</label>
          <select
            className='p-2 rounded-xl bg-white shadow-md outline-none'
            name="category"
            id="category"
            onChange={handleChange}
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
            className='p-4 rounded-xl bg-white shadow-md outline-none'
            value={post?.description}
            onChange={handleChange}
          />
          <ReactQuill
            theme="snow"
            className='flex-1 rounded-xl shadow-md bg-white'
            value={post?.content}
            onChange={(value) => setPost({...post, content: value})}
          />
        <button type='submit' className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'>Submit</button>
      </form>
      <button
        className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'
        onClick={handleDelete}
      >Delete</button>
    </div>
  );
};

export default EditPage;