// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router";
// import App from "./app";
// import './index.css'
//
// const root = document.getElementById("root");
//
// ReactDOM.createRoot(root).render(
//     <App />
// );

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Homepage from "./routes/Homepage.jsx";
import PostsListPage from "./routes/PostsListPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import WritePage from "./routes/WritePage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <PostsListPage />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
