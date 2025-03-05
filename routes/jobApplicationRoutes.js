import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "../controllers/jobApplicationController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Get All Job Applications (with Pagination)
router.get("/", authenticate, index);

// Get a Single Job Application by ID
router.get("/:id", authenticate, show);

// Create a Job Application
router.post("/", authenticate, store);

// Update a Job Application by ID
router.put("/:id", authenticate, update);

// Delete a Job Application by ID
router.delete("/:id", authenticate, destroy);

export default router;
