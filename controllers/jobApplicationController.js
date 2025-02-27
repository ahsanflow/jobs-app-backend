import JobApplication from "../models/JobApplication";
import { sendResponse } from "../utils/response";

// List all applications
export const index = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate("candidate", "name email")
      .populate("job", "title");

    sendResponse(
      res,
      200,
      true,
      "Applications fetched successfully.",
      applications
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error fetching applications.",
      {},
      {},
      error.message
    );
  }
};

// Store a new application
export const store = async (req, res) => {
  try {
    const { candidateId, jobId } = req.body;

    // Check if the candidate has already applied
    const existingApplication = await JobApplication.findOne({
      candidate: candidateId,
      job: jobId,
    });

    if (existingApplication) {
      return sendResponse(
        res,
        400,
        false,
        "You have already applied for this job."
      );
    }

    const application = new JobApplication({
      candidate: candidateId,
      job: jobId,
    });

    await application.save();

    sendResponse(
      res,
      200,
      true,
      "Application submitted successfully.",
      application
    );
    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error creating application.",
      {},
      {},
      error.message
    );
  }
};

// Show a single application
export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findById(id)
      .populate("candidate", "name email")
      .populate("job", "title");

    if (!application) {
      return sendResponse(res, 404, false, "Application not found.");
    }

    sendResponse(
      res,
      200,
      true,
      "Application fetched successfully.",
      application
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error fetching application.",
      {},
      {},
      error.message
    );
  }
};

// Update an application
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return sendResponse(res, 404, false, "Application not found.");
    }

    sendResponse(
      res,
      200,
      true,
      "Application updated successfully.",
      application
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error updating application.",
      {},
      {},
      error.message
    );
  }
};

// Delete an application
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findByIdAndDelete(id);

    if (!application) {
      return sendResponse(res, 404, false, "Application not found.");
    }
    sendResponse(res, 200, true, "Application deleted successfully.");
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error deleting application.",
      {},
      {},
      error.message
    );
  }
};
