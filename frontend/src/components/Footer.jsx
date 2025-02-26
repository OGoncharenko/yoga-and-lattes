import React from 'react';

const Footer = () => {
  return (
    <footer className='text-[#613010] py-4 mt-8 w-full flex '>
      <div className='container mx-auto text-center text-xs'>
        <p>&copy; {new Date().getFullYear()} Yoga&Lattes. All rights reserved.</p>
        <div className='flex justify-center gap-4 mt-2'>
          <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
            <img src='/linkedin.svg' alt='LinkedIn' className='w-6 h-6' />
          </a>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
            <img src='/facebook.svg' alt='Facebook' className='w-6 h-6' />
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
            <img src='/Instagram_logo.svg' alt='Instagram' className='w-6 h-6' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;