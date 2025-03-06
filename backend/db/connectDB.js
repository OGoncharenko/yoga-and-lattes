import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    // let mongoURL = process.env.MONGO_URI;
    // if (process.env.NODE_ENV === "test") {
    //   mongoURL = process.env.MONGO_URI_TEST;
    // }

    const mongoUri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
  } catch(err) {
    console.log(err)
  }
}

export default connectDB;