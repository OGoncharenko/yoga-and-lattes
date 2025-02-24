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
import SignupPage from "./routes/SignupPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import VerifyEmailPage from "./routes/VerifyEmailPage.jsx";
import {Toaster} from "react-hot-toast";
import App from "./App.jsx";

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
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmailPage />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    {/*<RouterProvider router={router} />*/}
    <App />
  </StrictMode>
)
