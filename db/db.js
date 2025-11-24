import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoDB_URI);
    console.log("DB connection successful !!");
  } catch (err) {
    console.log("failed to connect DB", err);
  }
};

export default connectDB;
