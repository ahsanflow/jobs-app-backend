import moment from "moment";
import Company from "../models/Company.js";

// utils/jobQuery.js
export const jobsQuery = async (query) => {
  // Build filters
  const filters = {};
  if (query.title) {
    filters.title = { $regex: query.title, $options: "i" }; // Case-insensitive title search
  }
  if (query.experience) {
    filters.experience = { $regex: query.experience, $options: "i" }; // Company name filter
  }
  if (query.jobType) {
    filters.jobType = { $regex: query.jobType, $options: "i" }; // Job Type filter
  }

  if (query.industry) {
    filters.industry = { $regex: query.industry, $options: "i" }; // Industry filter
  }

  // Filtering for salary range
  if (query.minSalary || query.maxSalary) {
    filters["salary.min"] = query.minSalary
      ? { $gte: parseInt(query.minSalary) }
      : undefined;
    filters["salary.max"] = query.maxSalary
      ? { $lte: parseInt(query.maxSalary) }
      : undefined;

    // Clean up undefined filters
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );
  }
  // Filtering for location: country
  if (query.country) {
    filters["location.country"] = { $regex: query.country, $options: "i" }; // Case-insensitive regex for country
  }

  // Filtering for location: city
  if (query.city) {
    filters["location.city"] = { $regex: query.city, $options: "i" }; // Case-insensitive regex for city
  }

  // Company filter by name (optional)
  if (query.company) {
    const companies = await Company.find({
      companyName: { $regex: query.company, $options: "i" }, // Case-insensitive search
    }).select("_id");
    console.log("Matching Companies:", companies);
    // Filter jobs by matching company IDs
    const companyIds = companies.map((company) => company._id);
    if (companyIds.length > 0) {
      filters.company = { $in: companyIds }; // Matches any of the found company IDs
      console.log("Updated Filters with Company:", filters);
    }
  }
  // Company filter by ID (optional)
  if (query.companyId) {
    filters.company = query.companyId; // Directly filter jobs by company ID
    console.log("Updated Filters with Company ID:", filters);
  }
  // Date Range Filter
  if (query.datePosted) {
    const now = moment(); // Current date and time
    let startDate;

    switch (query.datePosted) {
      case "last-hour":
        startDate = now.subtract(1, "hours");
        break;
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
        startDate = null; // No filter applied
        break;
    }

    if (startDate) {
      filters.createdAt = { $gte: startDate.toDate() }; // Filter jobs created after the start date
    }
  }
  // Sorting
  const sortField = query.sortBy || "createdAt"; // Default sorting field
  const sortOrder = query.sortOrder === "asc" ? 1 : -1; // Ascending or Descending
  const sort = { [sortField]: sortOrder };

  return { filters, sort };
};
