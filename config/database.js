import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_URL } from "./index.js";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);

    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export { connectDB }; // Use ES module export
