import { getUploadsBaseUrl } from "../helper/urlHelper.js";
import candidate from "../models/Candidate.js";
import { sendResponse } from "../utils/response.js";

// Retrieve all candidate profiles
export const index = async (req, res) => {
  try {
    const candidates = await candidate.find();
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
    const uploadsBaseUrl = getUploadsBaseUrl(req);

    const imagePath = req.files?.image
      ? `${uploadsBaseUrl}/${req.files.image[0].filename}`
      : null;

    // Merge file paths into req.body
    const candidateData = {
      ...req.body,
      image: imagePath,
    };
    const candidate = await candidate.create(candidateData);
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

    const candidate = await candidate.findOne({ userId: id });
    // const candidate = await candidate.findById(req.params.id);
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
    const { id } = req.user; // Extract userId from the authenticated request
    const candidate = await candidate.findOneAndUpdate(
      { userId: id },
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
    const { id } = req.user; // Extract userId from the authenticated request
    const candidate = await candidate.findOneAndDelete({ userId: id });
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
