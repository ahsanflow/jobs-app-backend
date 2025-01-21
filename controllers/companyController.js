import { appendDomainToPaths, getUploadsBaseUrl } from "../helper/urlHelper.js";
import Company from "../models/Company.js";
import { sendResponse } from "../utils/response.js";

// Retrieve all Company profiles
export const index = async (req, res) => {
  try {
    const companies = await Company.find().lean();

    sendResponse(
      res,
      200,
      true,
      "Company profiles retrieved successfully",
      companies
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
    const uploadsBaseUrl = getUploadsBaseUrl(req);

    const logoPath = req.files?.logo
      ? `${uploadsBaseUrl}/${req.files.logo[0].filename}`
      : null;

    const coverPath = req.files?.cover
      ? `${uploadsBaseUrl}/${req.files.cover[0].filename}`
      : null;

    // Merge file paths into req.body
    const companyData = {
      ...req.body,
      logo: logoPath,
      cover: coverPath,
    };

    // Create company profile in the database
    const company = await Company.create(companyData);

    sendResponse(
      res,
      201,
      true,
      "Company profile created successfully",
      company
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
// // Fetch Logged-in User's Company
export const getMyCompany = async (req, res) => {
  try {
    // Extract user ID from the authenticated request
    const userId = req.user.profileId;

    // Find the company associated with the user
    const data = await Company.findById(userId).lean();

    if (!data) {
      return sendResponse(res, 404, false, "Company profile not found");
    }

    // Send the response
    return sendResponse(
      res,
      200,
      true,
      "Company details retrieved successfully",
      data
    );
  } catch (error) {
    // Handle any errors
    sendResponse(
      res,
      500,
      false,
      "Error fetching company details",
      {},
      {},
      error.message
    );
  }
};
// Retrieve a single Company profile by ID
export const show = async (req, res) => {
  try {
    const { id } = req.params; // Extract userId from the authenticated request
    const company = await Company.findById(id);
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
    const uploadsBaseUrl = getUploadsBaseUrl(req);

    const logoPath = req.files?.logo
      ? `${uploadsBaseUrl}/${req.files.logo[0].filename}`
      : null;

    const coverPath = req.files?.cover
      ? `${uploadsBaseUrl}/${req.files.cover[0].filename}`
      : null;

    // Add file paths to req.body if they exist
    if (logoPath) req.body.logo = logoPath;
    if (coverPath) req.body.cover = coverPath;
    const userId = req.user.profileId;

    // Update company profile
    const data = await Company.findOneAndUpdate({ userId: userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return sendResponse(res, 404, false, "Company profile not found");
    }

    sendResponse(res, 200, true, "Company profile updated successfully", data);
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
    const { id } = req.user; // Extract userId from the authenticated request
    const company = await Company.findOneAndDelete({ userId: id });
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
