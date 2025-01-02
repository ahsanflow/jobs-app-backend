import CompanyProfile from "../models/CompanyProfile.js";
import { sendResponse } from "../utils/response.js";

// Retrieve all Company profiles
export const index = async (req, res) => {
  try {
    const companies = await CompanyProfile.find();

    // Get the base URL of the server (e.g., http://localhost:5000)
    const domain = req.protocol + "://" + req.get("host");

    // Map through the companies and append absolute URLs
    const companiesWithFullPaths = companies.map((company) => ({
      ...company.toJSON(),
      logo: company.logo ? `${domain}/${company.logo}` : null,
      cover: company.cover ? `${domain}/${company.cover}` : null,
    }));
    sendResponse(
      res,
      200,
      true,
      "Company profiles retrieved successfully",
      companiesWithFullPaths
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving Company profiles",
      {},
      {},
      error.message
    );
  }
};

// Create a new Company profile
export const store = async (req, res) => {
  try {
    let logoPath = req.files?.logo ? req.files.logo[0].path : null;
    let coverPath = req.files?.cover ? req.files.cover[0].path : null;
    logoPath = logoPath
      ? logoPath.replace("uploads\\", "uploads/") // Save as relative path
      : null;
    coverPath = coverPath
      ? coverPath.replace("uploads\\", "uploads/") // Save as relative path
      : null;

    // Merge file paths into req.body
    const companyData = {
      ...req.body,
      logo: logoPath,
      cover: coverPath,
    };

    // Create company profile in the database
    const company = await CompanyProfile.create(companyData);

    // Get the base URL of the server (e.g., http://localhost:5000)
    const domain = req.protocol + "://" + req.get("host");

    // Append the domain to the saved relative paths
    const companyWithFullPaths = {
      ...company.toJSON(),
      logo: company.logo ? `${domain}/${company.logo}` : null,
      cover: company.cover ? `${domain}/${company.cover}` : null,
    };
    sendResponse(
      res,
      201,
      true,
      "Company profile created successfully",
      companyWithFullPaths
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error creating Company profile",
      {},
      {},
      error.message
    );
  }
};

// Retrieve a single Company profile by ID
export const show = async (req, res) => {
  try {
    const company = await CompanyProfile.findById(req.params.id);
    if (!company) {
      return sendResponse(res, 404, false, "Company profile not found");
    }
    sendResponse(
      res,
      200,
      true,
      "Company profile retrieved successfully",
      company
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving Company profile",
      {},
      {},
      error.message
    );
  }
};

// Update a Company profile by ID
export const update = async (req, res) => {
  try {
    const company = await CompanyProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!company) {
      return sendResponse(res, 404, false, "Company profile not found");
    }
    sendResponse(
      res,
      200,
      true,
      "Company profile updated successfully",
      company
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error updating Company profile",
      {},
      {},
      error.message
    );
  }
};

// Delete a Company profile by ID
export const destroy = async (req, res) => {
  try {
    const company = await CompanyProfile.findByIdAndDelete(req.params.id);
    if (!company) {
      return sendResponse(res, 404, false, "Company profile not found");
    }
    sendResponse(res, 200, true, "Company profile deleted successfully");
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error deleting Company profile",
      {},
      {},
      error.message
    );
  }
};
