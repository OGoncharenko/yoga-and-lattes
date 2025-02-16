import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from "./components/Navbar.jsx";
import PostsListPage from "./routes/PostsListPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import WritePage from "./routes/WritePage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import Homepage from "./routes/Homepage.jsx";

const App = () => {
  return (
    <div>
      {/*<Navbar />*/}
    </div>
    // <BrowserRouter>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={ <Homepage /> } />
    //     <Route path="/posts" element={ <PostsListPage /> } />
    //     <Route path="/:slug" element={ <SinglePostPage /> } />
    //     <Route path="/write" element={ <WritePage /> } />
    //     <Route path="/login" element={ <LoginPage /> } />
    //     <Route path="/register" element={ <RegisterPage /> } />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App