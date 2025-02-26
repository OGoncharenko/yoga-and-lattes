import bcryptjs from "bcryptjs";
import crypto from "crypto";

import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import {
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail
} from "../mailtrap/emails.js";
import {User} from "../models/user.model.js";
import Post from "../models/post.model.js"

export const signup = async (req, res) => {
  const {email, password, username} = req.body;

  try {
    if(!email || !password || !username) {
      return res.status(400).json({success: false, message: "All fields are required"});
    }
    const userAlreadyExists = await User.findOne({ email });

    if(userAlreadyExists) {
      return res.status(400).json({success: false, message: "User already exists"});
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
    user: {
        ...user._doc,
        password: undefined
    }});
 } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpires: {$gt: Date.now()}
    });
    if(!user) {
      return res.status(400).json({success: false, message: "Invalid or expired verification code"});
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.username);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
      ...user._doc,
      password: undefined,
      }
    });
} catch (error) {
    console.log("Error verifying email", error);
    return res.status(500).json({success: false, message: "Server error"});
  }
}

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({success: false, message: "Invalid credentials"})
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({success: false, message: "Invalid credentials"});
    }
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });
  } catch (error) {
    console.log("Error logging in", error);
    return res.status(400).json({success: false, message: error.message});
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success: true, message: "Logged out successfully"});
}

export const forgotPassword = async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success: false, message: "User not found"})
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordToken;
    await user.save();

    await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({success: true, message: "Password reset email sent"});
  } catch (error) {
    console.log("Error finding user", error);
    return res.status(400).json({success: false, message: error.message});
  }
}

export const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: Date.now()}
    });
    if(!user) {
      return res.status(400).json({success: false, massage: "Invalid or expired token"});
    }
    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({success: true, message: "Password reset successful"});
  } catch (error) {
    console.log("Error resetting password", error);
    return res.status(400).json({success: false, message: error.message});
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if(!user) {
      return res.status(400).json({success: false, message: "User not found"});
    }
    const postCount = await Post.countDocuments({ user: user._id });
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
        postCount,
      }
    });
} catch (error) {
  console.log("Error checking auth", error);
  return res.status(400).json({success: false, message: error.message});
  }
}
