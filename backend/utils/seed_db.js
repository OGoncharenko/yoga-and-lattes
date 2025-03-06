import mongoose from "mongoose";
import Post from "../models/post.model.js";
import { User } from "../models/user.model.js";
import {faker} from "@faker-js/faker/locale/en_US";
import bcrypt from "bcryptjs";
import FactoryBot from 'factory-bot';
import dotenv from "dotenv";

dotenv.config();

export const factory = FactoryBot.factory;
const factoryAdapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(factoryAdapter);


export const testUserPassword = faker.internet.password();
factory.define("user", User, {
  username: () => faker.person.fullName(),
  email: () => faker.internet.email(),
  password: async () => await bcrypt.hash(testUserPassword, 10),
  isVerified: () => true,
});

factory.define("post", Post, {
  user: () => factory.assoc("user", "_id"),
  title: () => faker.lorem.sentence(),
  slug: () => faker.lorem.slug(),
  description: () => faker.lorem.paragraph(),
  content: () => faker.lorem.paragraphs(),
});

export const seed_db = async () => {
  let testUser = null;
  let testPost = null;

  const mongoURL = process.env.MONGO_URI_TEST;
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    await Post.deleteMany({});
    await User.deleteMany({});

    testUser = await factory.create("user", { password: testUserPassword });
    testPost = await factory.create("post", { title: "Post title", user: testUser._id });
    await factory.create("post", { title: 'Post title', user: testUser._id });
  } catch (e) {
      console.log("Error in seeding database:", e.message);
    throw e;
  }
  return {testUser, testPost};
};
