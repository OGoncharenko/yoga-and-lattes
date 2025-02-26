import React from 'react';
import Navbar from "../components/Navbar.jsx";
const MainLayout = ({children}) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;