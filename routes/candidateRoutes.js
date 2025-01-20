import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
  getMyProfile,
} from "../controllers/candidateController.js";
import { authenticate } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Get All candidates (with Pagination)**
router.get("/", index);

//  Route to fetch logged-in user's candidate profile
router.get("/me", authenticate, getMyProfile);

// Get a Single candidate by ID**
router.get("/:id", show);

// Create a candidate**
router.post(
  "/",
  authenticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  store
);

// Update a candidate by ID**
router.put("/", authenticate, update);

// Delete a candidate by ID**
router.delete("/:id", destroy);

export default router;
