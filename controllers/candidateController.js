import CandidateProfile from "../models/CandidateProfile.js";
import { sendResponse } from "../utils/response.js";

// Retrieve all candidate profiles
export const index = async (req, res) => {
  try {
    const candidates = await CandidateProfile.find();
    sendResponse(
      res,
      200,
      true,
      "Candidate profiles retrieved successfully",
      candidates
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving candidate profiles",
      {},
      {},
      error.message
    );
  }
};

// Create a new candidate profile
export const store = async (req, res) => {
  try {
    const candidate = await CandidateProfile.create(req.body);
    sendResponse(
      res,
      201,
      true,
      "Candidate profile created successfully",
      candidate
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error creating candidate profile",
      {},
      {},
      error.message
    );
  }
};

// Retrieve a single candidate profile by ID
export const show = async (req, res) => {
  try {
    const { id } = req.user; // Extract userId from the authenticated request

    const candidate = await CandidateProfile.findOne({ userId: id });
    // const candidate = await CandidateProfile.findById(req.params.id);
    if (!candidate) {
      return sendResponse(res, 404, false, "Candidate profile not found");
    }
    sendResponse(
      res,
      200,
      true,
      "Candidate profile retrieved successfully",
      candidate
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving candidate profile.",
      {},
      {},
      error.message
    );
  }
};

// Update a candidate profile by ID
export const update = async (req, res) => {
  try {
    const candidate = await CandidateProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!candidate) {
      return sendResponse(res, 404, false, "Candidate profile not found");
    }
    sendResponse(
      res,
      200,
      true,
      "Candidate profile updated successfully",
      candidate
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error updating candidate profile",
      {},
      {},
      error.message
    );
  }
};

// Delete a candidate profile by ID
export const destroy = async (req, res) => {
  try {
    const candidate = await CandidateProfile.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return sendResponse(res, 404, false, "Candidate profile not found");
    }
    sendResponse(res, 200, true, "Candidate profile deleted successfully");
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error deleting candidate profile",
      {},
      {},
      error.message
    );
  }
};
