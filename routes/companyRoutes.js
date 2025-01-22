import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
  getMyCompany,
} from "../controllers/companyController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateCompany } from "../validators/companyValidator.js";
import upload, { uploadFile } from "../middleware/upload.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

// Get All Companies (with Pagination)**
router.get("/", index);

// Route to fetch logged-in user's company Profile
router.get("/me", authenticate, getMyCompany);
// Get a Single Company by ID**
router.get("/:id", show);

// Create a Company**
router.post(
  "/",
  authenticate,
  uploadFile("logo"),
  uploadFile("cover"),
  validateCompany,
  validateRequest,
  store
);

// Update a Company by ID**
router.put("/", authenticate, uploadFile("logo"), uploadFile("cover"), update);

// Delete a Company by ID**
router.delete("/", authenticate, destroy);

export default router;
