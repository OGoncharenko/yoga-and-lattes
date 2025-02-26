import React from 'react';

const Footer = () => {
  return (
    <footer className='text-[#613010] py-4 mt-8 w-full flex '>
      <div className='container mx-auto text-center text-xs'>
        <p>&copy; {new Date().getFullYear()} Yoga&Lattes. All rights reserved.</p>
        <div className='flex justify-center gap-4 mt-2 items-center'>
          <a href='https://www.linkedin.com/in/olga-s-goncharenko/' target='_blank' rel='noopener noreferrer'>
            <img src='/linkedin.svg' alt='LinkedIn' className='w-6 h-6' />
          </a>
            Created by Olga Goncharenko
        </div>
      </div>
    </footer>
  );
};

export default Footer;