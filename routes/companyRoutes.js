import express from "express";
import CompanyProfile from "../models/CompanyProfile.js"; // Use import here for ES6 modules

const router = express.Router();

// Create Company Profile
router.post("/company-profile", async (req, res) => {
  try {
    const company = new CompanyProfile(req.body);
    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Company Profiles
router.get("/company-profiles", async (req, res) => {
  try {
    const companies = await CompanyProfile.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Company Profile
router.get("/company-profile/:id", async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Company Profile
router.put("/company-profile/:id", async (req, res) => {
  try {
    const updatedCompany = await CompanyProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Company Profile
router.delete("/company-profile/:id", async (req, res) => {
  try {
    const deletedCompany = await CompanyProfile.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
