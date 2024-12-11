import mongoose from "mongoose";
import { connectDB } from "../config/database.js";
import User from "../models/User.js";

const seedUser = async () => {
  try {
    await connectDB();

    const user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123", // This will be hashed automatically by the pre-save hook
    });

    await user.save();

    console.log("User created:", user);
    process.exit();
  } catch (error) {
    console.error("Error seeding user:", error);
    process.exit(1);
  }
};

seedUser();
