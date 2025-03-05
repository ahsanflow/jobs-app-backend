import Jobs from "../models/Jobs.js";
import { sendResponse } from "../utils/response.js";
import { getPagination } from "../utils/pagination.js";
import moment from "moment";
import { jobsQuery } from "../utils/jobsQuery.js";
import JobApplication from "../models/JobApplication.js";

// **1. Get All Jobs (with Pagination)**
export const index = async (req, res) => {
  try {
    const { skip, limit, page, pageSize } = getPagination(req.query);

    // Get filters and sorting from the utility
    const { filters, sort } = await jobsQuery(req.query);

    // Query jobs with pagination
    console.log("Final Filters for Jobs Query:", filters);
    const jobs = await Jobs.find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("company", "companyName email phone website logo")
      .exec();
    // Transform the date to MM/DD/YYYY format for each job
    const transformedJobs = await Promise.all(
      jobs.map(async (job) => {
        const transformedJob = job.toObject(); // Convert Mongoose Document to plain JS object
        if (job.deadline) {
          transformedJob.deadline = moment(job.deadline).format("MM/DD/YYYY");
        }

        // Count applications for this job
        const applicationCount = await JobApplication.countDocuments({
          job: job._id,
        });

        transformedJob.applicationCount = applicationCount; // Attach count

        return transformedJob;
      })
    );

    // Total count
    const count = await Jobs.countDocuments(filters);

    // Pagination metadata
    const pagination = {
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      hasNextPage: skip + limit < count,
      hasPrevPage: page > 1,
    };

    // Send response
    sendResponse(
      res,
      200,
      true,
      "Jobs retrieved successfully",
      transformedJobs,
      {
        count,
        pagination,
        filters,
      }
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving jobs",
      {},
      {},
      error.message
    );
  }
};

// **2. Get a Single Job by ID**
export const show = async (req, res) => {
  try {
    const { id } = req.params;

    // Find job and populate company details
    const job = await Jobs.findById(id).populate("company", "name location");

    if (!job) {
      return sendResponse(res, 404, false, "Job not found");
    }

    // Count applications for this job
    const applicationCount = await JobApplication.countDocuments({ job: id });

    // Convert Mongoose Document to plain JS object & add application count
    const transformedJob = job.toObject();
    transformedJob.applicationCount = applicationCount;

    sendResponse(res, 200, true, "Job retrieved successfully", transformedJob);
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving job",
      {},
      {},
      error.message
    );
  }
};

// **3. Create a Job**
export const store = async (req, res) => {
  try {
    const jobData = req.body;

    // Extract company ID from the authenticated user
    const companyId = req.user.profileId; // Assuming companyId is stored in req.user
    // Add the company ID to the job data
    const jobWithCompanyId = {
      ...jobData,
      company: companyId,
    };

    if (!companyId) {
      return sendResponse(
        res,
        400,
        false,
        "Company ID is required but not provided in the request"
      );
    }
    const job = await Jobs.create(jobWithCompanyId);
    if (job.deadline) {
      job.deadline = moment(job.deadline).format("MM/DD/YYYY");
    }
    sendResponse(res, 201, true, "Job created successfully", {
      job,
      companyId,
    });
  } catch (error) {
    sendResponse(res, 500, false, "Error creating job", {}, {}, error.message);
  }
};

// **4. Update a Job by ID**
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Jobs.findByIdAndUpdate(id, updates, { new: true });

    if (!job) {
      return sendResponse(res, 404, false, "Job not found");
    }

    sendResponse(res, 200, true, "Job updated successfully", job);
  } catch (error) {
    sendResponse(res, 500, false, "Error updating job", {}, {}, error.message);
  }
};
// **5. Delete a Job by ID**
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findByIdAndDelete(id);

    if (!job) {
      return sendResponse(res, 404, false, "Job not found");
    }

    sendResponse(res, 200, true, "Job deleted successfully");
  } catch (error) {
    sendResponse(res, 500, false, "Error deleting job", {}, {}, error.message);
  }
};
