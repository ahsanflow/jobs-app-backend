import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("MongoDB connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export { connectDB }; // Use ES module export
