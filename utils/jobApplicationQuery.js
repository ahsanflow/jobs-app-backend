import moment from "moment";
import User from "../models/User.js"; // Assuming applicants are stored in a User model

export const applicationsQuery = async (query) => {
  const filters = {};

  // Filter by Job ID
  if (query.jobId) {
    filters.jobId = query.job;
  }

  // Filter by Applicant Name
  if (query.applicantName) {
    const users = await User.find({
      name: { $regex: query.applicantName, $options: "i" }, // Case-insensitive search
    }).select("_id");

    const userIds = users.map((user) => user._id);
    if (userIds.length > 0) {
      filters.applicantId = { $in: userIds };
    }
  }

  // Filter by Applicant ID (if known)
  if (query.applicantId) {
    filters.applicantId = query.applicantId;
  }

  // Filter by Application Status
  if (query.status) {
    filters.status = { $regex: query.status, $options: "i" }; // e.g., "pending", "accepted", "rejected"
  }

  // Date Range Filter (Application Date)
  if (query.dateApplied) {
    const now = moment();
    let startDate;

    switch (query.dateApplied) {
      case "last-24-hour":
        startDate = now.subtract(24, "hours");
        break;
      case "last-7-days":
        startDate = now.subtract(7, "days");
        break;
      case "last-14-days":
        startDate = now.subtract(14, "days");
        break;
      case "last-30-days":
        startDate = now.subtract(30, "days");
        break;
      default:
        startDate = null;
        break;
    }

    if (startDate) {
      filters.createdAt = { $gte: startDate.toDate() }; // Applications after this date
    }
  }

  // Sorting (default: newest applications first)
  const sortField = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;
  const sort = { [sortField]: sortOrder };

  return { filters, sort };
};
