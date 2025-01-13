import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "../controllers/candidateController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

// Get All Jobs (with Pagination)**
router.get("/", index);

// Get a Single Job by ID**
router.get("/:id", authenticate, show);

// Create a Job**
router.post("/", store);

// Update a Job by ID**
router.put("/:id", update);

// Delete a Job by ID**
router.delete("/:id", destroy);

export default router;
