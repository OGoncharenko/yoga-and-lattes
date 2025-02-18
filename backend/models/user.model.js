import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
   type: String,
  },
  savedPosts: {
    type: [String],
    default: [],
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationToken: String,
  verificationTokenExpires: Date,
},
  {timestamps: true}
);

export const User = mongoose.model("User", userSchema);