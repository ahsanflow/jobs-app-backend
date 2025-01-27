import Company from "../models/Company.js";

// utils/jobQuery.js
export const jobsQuery = async (query) => {
  // Build filters
  const filters = {};
  if (query.title) {
    filters.title = { $regex: query.title, $options: "i" }; // Case-insensitive title search
  }
  if (query.company) {
    filters.company = { $regex: query.company, $options: "i" }; // Company name filter
  }
  if (query.jobType) {
    filters.jobType = { $regex: query.jobType, $options: "i" }; // Job Type filter
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
  // Sorting
  const sortField = query.sortBy || "createdAt"; // Default sorting field
  const sortOrder = query.sortOrder === "asc" ? 1 : -1; // Ascending or Descending
  const sort = { [sortField]: sortOrder };

  return { filters, sort };
};
