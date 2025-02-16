import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

const WritePage = () => {
  return (
    <div className='h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col gap-6'>
      <h1 className='text-xl font-light mt-4'> Create a New Post</h1>
      <form className='flex flex-col gap-6 flex-1 mb-6'>
        <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-400 bg-white'>Add a cover image</button>
          <input type='text' placeholder="My Awesome Story" className='text-4xl font-semibold outline-none bg-transparent' id='title' name='title' />
        <div className='flex items-center gap-4'>
          <label htmlFor="" className='text-sm'>Choose a category:</label>
          <select className='p-2 rounded-xl bg-white shadow-md outline-none' name="category" id="category">
            <option value="general">General</option>
            <option value="meditation">Meditation</option>
            <option value="hatha-yoga">Hatha yoga</option>
            <option value="asanas">Asanas</option>
            <option value="history">History</option>
            <option value="mindset">Mindset</option>
          </select>
        </div>
          <textarea name='description' placeholder="A Short Description" className='p-4 rounded-xl bg-white shadow-md outline-none'/>
          <ReactQuill theme="snow" className='flex-1 rounded-xl shadow-md bg-white'/>
        <button type='submit' className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'>Submit</button>
      </form>
    </div>
  );
};

export default WritePage;