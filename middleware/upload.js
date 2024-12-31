import multer from "multer";
import path from "path";
import { UPLOAD_DIR, UPLOAD_MAX_SIZE } from "../config/index.js";
import fs from "fs"; // Import fs module to check/create directories
// Ensure upload directory is set or use default
const uploadDirectory = UPLOAD_DIR || "uploads/";

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true }); // Create uploads directory if it doesn't exist
}

// General Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Set directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
  },
});

// File Filter for Validating File Types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.")
    );
  }
};

// Limits for Uploads
const limits = {
  fileSize: (UPLOAD_MAX_SIZE || 5) * 1024 * 1024, // Default size limit to 5MB
};

// General Multer Instance
const upload = multer({
  storage,
  fileFilter,
  limits,
});

export default upload;
