import Post from '../models/post.model.js';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

export const getPosts = async (req, res) => {
  const search = req.query.search ? { title: { $regex: req.query.search, $options: 'i' } } : {};
  const categoryFilter = req.query.category ? { category: req.query.category } : {};
  const userFilter = req.query.user ? { user: req.query.user } : {};
  const filters = { ...search, ...categoryFilter, ...userFilter };
  const sort = req.query.sort === 'asc' ? { createdAt: 1 } : { createdAt: -1 };
  const posts = await Post.find(filters).sort(sort).populate('user', 'username');
  res.status(200).send(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('user', 'username');;
  res.status(200).send(post);
}

export const createPost = async (req, res) => {
  try {
    const slug = req.body.title.toLowerCase().split(" ").join("-");
    let imgUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imgUrl = result.secure_url;
    }
    const newPost = new Post({
      ...req.body,
      slug: slug,
      user: userId(req),
      img: imgUrl,
    });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updatePost = async (req, res) => {
  try {
    let imgUrl = req.body.img;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imgUrl = result.secure_url;
    }
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: userId(req) },
      {...req.body,  img: imgUrl},
      { new: true }
    );
    console.log({post});
    if (!post) {
      return res.status(400).json("Post not found or user not authorized");
    } else {
      return res.status(200).json("Post has been updated");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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