import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useEffect} from 'react';
// import './index.css'
import PostsListPage from "./routes/PostsListPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import WritePage from "./routes/WritePage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import Homepage from "./routes/Homepage.jsx";
import SignUpPage from "./routes/SignUpPage.jsx";
import VerifyEmailPage from "./routes/VerifyEmailPage.jsx";
import {Toaster} from "react-hot-toast";
import MainLayout from "./layouts/MainLayout.jsx";
import {useAuthStore} from "./store/authStore.js";
import ForgotPasswordPage from "./routes/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./routes/ResetPasswordPage.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import EditPage from "./routes/EditPage.jsx";
import ProfilePage from "./routes/ProfilePage.jsx";

const queryClient = new QueryClient()

const App = () => {

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Toaster />
          <Routes>
            <Route path="/" element={ <Homepage /> } />
            <Route path="/posts" element={ <PostsListPage /> } />
            <Route path="/:slug" element={ <SinglePostPage /> } />
            <Route path="/write" element={ <WritePage /> } />
            <Route path="/edit/:postSlug" element={ <EditPage /> } />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/verify-email" element={ <VerifyEmailPage /> } />
            <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App