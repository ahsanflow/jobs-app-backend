import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js"; // Ensure using ES import
import candidateRoutes from "./routes/candidateRoutes.js"; // ES module import
import companyRoutes from "./routes/companyRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ES module import
import jobsRoutes from "./routes/jobsRoutes.js"; // ES module import
import cors from "cors"; // Import cors
import { FRONTEND_URL, PORT } from "./config/index.js";
// CORS configuration

dotenv.config();
const app = express(); // Initialize the app here

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS with the options

// Middleware for JSON body parsing
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the function to connect to the DB

// Register routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/auth", authRoutes); // Use the authRoutes
app.get("/", (req, res) => {
  res.status(401).json({ message: "Restricted Area!" });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: "The requested URL was not found on the server",
  });
});

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`url http://localhost:${PORT}`);
});
