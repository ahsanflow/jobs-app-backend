import express from "express";
import Jobs from "../models/Jobs.js";
const router = express.Router();

// Get All Candidate Profiles
router.get("/", async (req, res) => {
  try {
    const jobs = await Jobs.find().populate(
      "company",
      "companyName email phone website"
    );
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Use ES module export
export default router;
