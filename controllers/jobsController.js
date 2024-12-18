import Jobs from "../models/Jobs.js";
import { sendResponse } from "../utils/response.js";
import { getPagination } from "../utils/pagination.js";

// **1. Get All Jobs (with Pagination)**
export const getJobs = async (req, res) => {
  try {
    const { skip, limit, page, pageSize } = getPagination(req.query);
    const q = req.query;
    // Extract sorting parameters
    const { sortBy, sortOrder } = req.query;

    // Default sortBy is 'createdAt' and default sortOrder is descending
    const sortField = sortBy || "createdAt"; // Default sorting field
    const order = sortOrder === "asc" ? 1 : -1; // Ascending or Descending
    // Build sorting object
    const sort = { [sortField]: order };
    // Query jobs with pagination
    const jobs = await Jobs.find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("company", "companyName email phone website")
      .exec();

    // Total count
    const count = await Jobs.countDocuments();

    // Pagination metadata
    const pagination = {
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      hasNextPage: skip + limit < count,
      hasPrevPage: page > 1,
    };

    // Send response
    sendResponse(res, 200, true, "Jobs retrieved successfully", {
      jobs,
      count,
      pagination,
    });
  } catch (error) {
    sendResponse(res, 500, false, "Error retrieving jobs", {}, error.message);
  }
};

// **2. Get a Single Job by ID**
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById(id).populate("company", "name location");

    if (!job) {
      return sendResponse(res, 404, false, "Job not found");
    }

    sendResponse(res, 200, true, "Job retrieved successfully", { job });
  } catch (error) {
    sendResponse(res, 500, false, "Error retrieving job", {}, error.message);
  }
};

// **3. Create a Job**
export const createJob = async (req, res) => {
  try {
    const jobData = req.body;

    const job = await Jobs.create(jobData);

    sendResponse(res, 201, true, "Job created successfully", { job });
  } catch (error) {
    sendResponse(res, 500, false, "Error creating job", {}, error.message);
  }
};

// **4. Update a Job by ID**
export const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Jobs.findByIdAndUpdate(id, updates, { new: true });

    if (!job) {
      return sendResponse(res, 404, false, "Job not found");
    }

    sendResponse(res, 200, true, "Job updated successfully", { job });
  } catch (error) {
    sendResponse(res, 500, false, "Error updating job", {}, error.message);
  }
};
// **5. Delete a Job by ID**
export const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findByIdAndDelete(id);

    if (!job) {
      return sendResponse(res, 404, false, "Job not found");
    }

    sendResponse(res, 200, true, "Job deleted successfully", { job });
  } catch (error) {
    sendResponse(res, 500, false, "Error deleting job", {}, error.message);
  }
};

// **6. Search Jobs**
export const searchJobs = async (req, res) => {
  try {
    const { query } = req.query;

    const searchConditions = {
      $or: [
        { jobTitle: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { "location.city": { $regex: query, $options: "i" } },
      ],
    };

    const jobs = await Jobs.find(searchConditions);
    const count = await Jobs.countDocuments(searchConditions);
    sendResponse(res, 200, true, "Search results retrieved successfully", {
      jobs,
      count,
    });
  } catch (error) {
    sendResponse(res, 500, false, "Error searching jobs", {}, error.message);
  }
};

// **7. Get Jobs by Company ID**
export const getJobsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    const jobs = await Jobs.find({ company: companyId });

    if (!jobs || jobs.length === 0) {
      return sendResponse(res, 404, false, "No jobs found for this company");
    }

    sendResponse(res, 200, true, "Jobs retrieved successfully", { jobs });
  } catch (error) {
    sendResponse(res, 500, false, "Error retrieving jobs", {}, error.message);
  }
};

// **8. Get Expired Jobs**
export const getExpiredJobs = async (req, res) => {
  try {
    const currentDate = new Date();

    const expiredJobs = await Jobs.find({ expire_at: { $lt: currentDate } });

    if (!expiredJobs || expiredJobs.length === 0) {
      return sendResponse(res, 404, false, "No expired jobs found");
    }

    sendResponse(res, 200, true, "Expired jobs retrieved successfully", {
      expiredJobs,
    });
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error retrieving expired jobs",
      {},
      error.message
    );
  }
};

// **9. Get Jobs by Category**
export const getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const jobs = await Jobs.find({ category });

    if (!jobs || jobs.length === 0) {
      return sendResponse(res, 404, false, "No jobs found in this category");
    }

    sendResponse(res, 200, true, "Jobs retrieved successfully", { jobs });
  } catch (error) {
    sendResponse(res, 500, false, "Error retrieving jobs", {}, error.message);
  }
};
