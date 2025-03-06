import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    const mongoUri = process.env.NODE_ENV_TEST === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch(err) {
    console.log(err)
  }
}

export default connectDB;