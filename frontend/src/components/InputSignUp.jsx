import React from 'react';

const InputSignUp = ({...props}) => {
  return (
    <div className="relative mb-6">
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-stone-50 rounded-lg border border-[#71a8a5] focus:border-[#71a8a5] focus:ring-1 focus:ring-[#71a8a5] text-black
        placeholder-stone-300 transition duration-200 outline-none focus:bg-none"
      />
    </div>
  );
};

export default InputSignUp;