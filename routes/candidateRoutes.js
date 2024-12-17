import express from "express";
import CandidateProfile from "../models/CandidateProfile.js";
import { faker } from "@faker-js/faker";

const router = express.Router();

// Create Candidate Profile
router.post("/candidate-profile", async (req, res) => {
  try {
    const candidate = new CandidateProfile(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Candidate Profiles
router.get("/candidate-profiles", async (req, res) => {
  try {
    console.log(faker.company.buzzAdjective());
    const candidates = await CandidateProfile.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Candidate Profile
router.get("/candidate-profile/:id", async (req, res) => {
  try {
    const candidate = await CandidateProfile.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Candidate Profile
router.put("/candidate-profile/:id", async (req, res) => {
  try {
    const updatedCandidate = await CandidateProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Candidate Profile
router.delete("/candidate-profile/:id", async (req, res) => {
  try {
    const deletedCandidate = await CandidateProfile.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use ES module export
export default router;
