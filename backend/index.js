import express from 'express';
import connectDB from './db/connectDB.js';
import authRouter from './routes/auth.route.js';
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(3000, () => {
  connectDB();
  console.log('Server is listening on port: ', PORT);
});