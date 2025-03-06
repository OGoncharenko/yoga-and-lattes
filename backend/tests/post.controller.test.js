import get_chai from '../utils/get_chai.js';

import mongoose from 'mongoose';
import { app } from '../index.js';
import Post from '../models/post.model.js';
import jwt from 'jsonwebtoken';
import {User} from "../models/user.model.js";
import {faker} from "@faker-js/faker/locale/en_US";

let chai;
let expect;
let request;

before(async () => {
  const mongoURL = process.env.MONGO_URI_TEST;
  if (!mongoURL) {
    throw new Error("MONGO_URI_TEST is not defined in environment variables");
  }

  const chaiObj = await get_chai(); // Wait for chai to be initialized
  chai = chaiObj.chai;
  expect = chaiObj.expect;
  request = chaiObj.request;
});
console.log("Using MongoDB URI:", process.env.MONGO_URI_TEST);

describe('Post Controller', () => {
  let token;
  const userId = new mongoose.Types.ObjectId();

  before(async () => {
    const testUser = new User({
      _id: userId,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isVerified: true,
    })
    token = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET);
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const testPost = new Post({
        title: 'Post title',
        content: 'Test Content',
        category: 'test',
        slug: 'test-post',
        user: userId
      });
      await testPost.save();

      const res = await request(app).get('/posts');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      expect(res.body[0].title).to.equal('Post title');
    });

    // it('should filter posts by search query', async () => {
    //   await Post.create([
    //     { title: 'First Post', content: 'Content', category: 'test', slug: 'first-post', user: userId },
    //     { title: 'Second Post', content: 'Content', category: 'test', slug: 'second-post', user: userId }
    //   ]);
    //
    //   const res = await chai.request(app).get('/posts?search=First');
    //   expect(res).to.have.status(200);
    //   expect(res.body).to.be.an('array');
    //   expect(res.body.length).to.equal(1);
    //   expect(res.body[0].title).to.equal('First Post');
    // });
  });

  describe('POST /posts', () => {
    it('should create a new post', async () => {
      const postData = {
        title: 'New Post',
        content: 'New Content',
        category: 'test'
      };

      const res = await request(app)
        .post('/posts')
        .set('Cookie', `token=${token}`)
        .send(postData);
      expect(res).to.have.status(201);
      expect(res.body.title).to.equal(postData.title);
      expect(res.body.slug).to.equal('new-post');
    });
  //
  //   it('should return 500 if required fields are missing', async () => {
  //     const res = await chai.request(app)
  //       .post('/api/posts')
  //       .set('Cookie', `token=${token}`)
  //       .send({});
  //     expect(res).to.have.status(500);
  //   });
  });

  describe('PUT /posts/:id', () => {
    it('should update an existing post', async () => {
      const post = await Post.create({
        title: 'Original Post',
        content: 'Original Content',
        category: 'test',
        slug: 'original-post',
        user: userId
      });

      const existingPost = await Post.findById(post._id);
      if (!existingPost) {
        throw new Error('Post not found');
      }

      const res = await request(app)
        .put(`/posts/${post._id}`)
        .set('Cookie', `token=${token}`)
        .send({ title: 'Updated Post' });
      console.log(res.body);
      expect(res).to.have.status(200);

      const updatedPost = await Post.findById(post._id);
      expect(updatedPost.title).to.equal('Updated Post');
    });
  //
  //   it('should return 400 if post not found', async () => {
  //     const fakeId = new mongoose.Types.ObjectId();
  //
  //     const res = await request(app)
  //       .put(`/api/posts/${fakeId}`)
  //       .set('Cookie', `token=${token}`)
  //       .send({ title: 'Updated Post' });
  //     expect(res).to.have.status(400);
  //   });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete an existing post', async () => {
      const post = await Post.create({
        title: 'Post to Delete',
        content: 'Content',
        category: 'test',
        slug: 'post-to-delete',
        user: userId
      });

      const existingPost = await Post.findById(post._id);
      if (!existingPost) {
        throw new Error('Post not found');
      }

      const res = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Cookie', `token=${token}`);
      expect(res).to.have.status(200);

      const deletedPost = await Post.findById(post._id);
      expect(deletedPost).to.be.null;
    });
  });
});
