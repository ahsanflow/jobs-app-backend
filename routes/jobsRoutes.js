// routes/jobs.js

import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJobById,
  searchJobs,
  getJobsByCompanyId,
  getExpiredJobs,
  getJobsByCategory,
} from "../controllers/jobsController.js";

const router = express.Router();

// Get All Jobs (with Pagination)**
router.get("/", getJobs);

// Search Jobs**
router.get("/search", searchJobs);

// Get Expired Jobs**
router.get("/expired", getExpiredJobs);

// Get a Single Job by ID**
router.get("/:id", getJobById);

// Create a Job**
router.post("/", createJob);

// Update a Job by ID**
router.put("/:id", updateJobById);

// Delete a Job by ID**
router.delete("/:id", deleteJobById);

// Get Jobs by Company ID**
router.get("/company/:companyId", getJobsByCompanyId);

// **9. Get Jobs by Category**
router.get("/category/:category", getJobsByCategory);

export default router;
