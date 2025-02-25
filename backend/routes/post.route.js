import express from "express";
import multer from "multer";
import {createPost, updatePost, deletePost, getPost, getPosts} from "../controllers/post.controller.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", upload.single('img'), createPost);
router.put("/:id", upload.single('img'), updatePost);
router.delete("/:id", deletePost);

export default router;