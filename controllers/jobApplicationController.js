import JobApplication from "../models/JobApplication.js";
import { applicationsQuery } from "../utils/jobApplicationQuery.js";
import { sendResponse } from "../utils/response.js";

// List all applications
export const index = async (req, res) => {
  try {
    // Get filters and sorting from the utility
    const { filters, sort } = await applicationsQuery(req.query);
    // Query jobs with pagination
    console.log("Final Filters for Jobs Query:", filters);
    const applications = await JobApplication.find(filters)
      .sort(sort)
      .populate("candidate", "fullName email jobTitle  image ")
      .populate({
        path: "job",
        select: "title location deadline", // Get job details"job", "title location deadline"
        populate: {
          path: "company",
          select: "companyName email phone website logo", // Get company details
        },
      });

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
      .populate("candidate", "fullName email jobTitle  image")
      .populate({
        path: "job",
        select: "title location deadline", // Get job details"job", "title location deadline"
        populate: {
          path: "company",
          select: "companyName email phone website logo", // Get company details
        },
      });

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
