import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "../controllers/companyController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateCompanyProfile } from "../validators/companyProfileValidator.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Get All Companies (with Pagination)**
router.get("/", index);

// Get a Single Company by ID**
router.get("/:id", show);

// Create a Company**
router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  validateCompanyProfile,
  validateRequest,
  store
);

// Update a Company by ID**
router.put("/:id", update);

// Delete a Company by ID**
router.delete("/:id", destroy);

export default router;
