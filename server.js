import express from "express";
import { connectDB } from "./config/database.js"; // Ensure using ES import
import candidateRoutes from "./routes/candidateRoutes.js"; // ES module import
import companyRoutes from "./routes/companyRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ES module import
import jobsRoutes from "./routes/jobsRoutes.js"; // ES module import

const app = express(); // Initialize the app here

const PORT = 3000; // Set the correct port

// Middleware for JSON body parsing
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the function to connect to the DB

// Register routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/auth", authRoutes); // Use the authRoutes

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`url http://localhost:${process.env.PORT}`);
});
