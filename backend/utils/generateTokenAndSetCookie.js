import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  console.log("Setting cookie..."); // Debug log
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    domain: process.env.COOKIE_DOMAIN,
    sameSite: "none",
    path: "/",
  });
  console.log("Cookies after setting:", res.cookies);
  return token;
}
