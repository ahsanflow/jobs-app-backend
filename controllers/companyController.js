import CompanyProfile from "../models/CompanyProfile.js";
import { sendResponse } from "../utils/response.js";

// Retrieve all Company profiles
export const index = async (req, res) => {
  try {
    const companys = await CompanyProfile.find();
    sendResponse(
      res,
      200,
      true,
      "Company profiles retrieved successfully",
      companys
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
    const company = await CompanyProfile.create(req.body);
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
