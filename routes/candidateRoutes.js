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

// Get All candidates (with Pagination)**
router.get("/", index);

//  Route to fetch logged-in user's candidate profile
router.get("/me", authenticate, show);

// Get a Single candidate by ID**
router.get("/:id", show);

// Create a candidate**
router.post("/", authenticate, store);

// Update a candidate by ID**
router.put("/", authenticate, update);

// Delete a candidate by ID**
router.delete("/:id", destroy);

export default router;
