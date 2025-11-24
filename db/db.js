import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URI = process.env.DATABASE_URI;

const connectDB = async () => {
  if (!MongoDB_URI) {
    console.error("❌ DATABASE_URI is not defined in .env file");
    process.exit(1);
  }
  try {
    await mongoose.connect(MongoDB_URI);
    console.log("DB connection successful !!");
  } catch (err) {
    console.log("failed to connect DB", err);
    process.exit(1);
  }
};

export default connectDB;
