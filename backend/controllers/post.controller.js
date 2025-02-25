import Post from '../models/post.model.js';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
  console.log(req.query);
  const search = req.query.search ? { title: { $regex: req.query.search, $options: 'i' } } : {};
  const categoryFilter = req.query.category ? { category: req.query.category } : {};
  const filters = { ...search, ...categoryFilter };
  const sort = req.query.sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };
  const posts = await Post.find(filters).sort(sort).populate('user', 'username');
  res.status(200).send(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('user', 'username');;
  res.status(200).send(post);
}

export const createPost = async (req, res) => {
  const slug = req.body.title.toLowerCase().split(" ").join("-");
  const newPost = new Post({...req.body, slug: slug, user: userId(req)});
  const post = await newPost.save();
  res.status(201).json(post);
}

export const updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: userId(req) },
    req.body,
  );
  if (!post) {
    return res.status(400).json("Post not found or user not authorized");
  } else {
    return res.status(200).json("Post has been updated");
  }
}

export const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: userId(req),
  });
  if (!post) {
    return res.status(400).json("Post not found or user not authorized");
  } else {
    return res.status(200).json("Post has been deleted");
  }
}

const userId = (req) => {
  return jwt.verify(req.cookies.token, process.env.JWT_SECRET).userId;
}