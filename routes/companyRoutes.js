import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "../controllers/companyController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { companyProfileValidationRules } from "../validators/authValidators.js";
const router = express.Router();

// Get All Jobs (with Pagination)**
router.get("/", index);

// Get a Single Job by ID**
router.get("/:id", show);

// Create a Job**
router.post("/", companyProfileValidationRules, validateRequest, store);

// Update a Job by ID**
router.put("/:id", update);

// Delete a Job by ID**
router.delete("/:id", destroy);

export default router;
