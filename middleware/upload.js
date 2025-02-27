import multer from "multer";
import path from "path";
import { UPLOAD_DIR, UPLOAD_MAX_SIZE } from "../config/index.js";
import fs from "fs"; // Import fs module to check/create directories
import { sendResponse } from "../utils/response.js";
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
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 12)}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Generate unique filenames
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
// Middleware to handle Multer errors
export const uploadFile = (fieldName) => (req, res, next) => {
  const singleUpload = upload.single(fieldName);

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      let errorMessage;
      if (err.code === "LIMIT_FILE_SIZE") {
        errorMessage = `File size too large. Max size is ${
          UPLOAD_MAX_SIZE || 5
        }MB.`;
      } else {
        errorMessage = `${err.message}`;
      }
      return sendResponse(res, 400, false, errorMessage);
    } else if (err) {
      // Handle other errors (e.g., invalid file type)
      return sendResponse(res, 400, false, err.message);
    }

    next();
  });
};
