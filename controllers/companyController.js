import { appendDomainToPaths, getUploadsBaseUrl } from "../helper/urlHelper.js";
import CompanyProfile from "../models/CompanyProfile.js";
import { sendResponse } from "../utils/response.js";

// Retrieve all Company profiles
export const index = async (req, res) => {
  try {
    const companies = await CompanyProfile.find().lean();

    sendResponse(
      res,
      200,
      true,
      "Company profiles retrieved successfully",
      companies
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
    const uploadsBaseUrl = getUploadsBaseUrl(req);

    const logoPath = req.files?.logo
      ? `${uploadsBaseUrl}/${req.files.logo[0].filename}`
      : null;

    const coverPath = req.files?.cover
      ? `${uploadsBaseUrl}/${req.files.cover[0].filename}`
      : null;

    // Merge file paths into req.body
    const companyData = {
      ...req.body,
      logo: logoPath,
      cover: coverPath,
    };

    // Create company profile in the database
    const company = await CompanyProfile.create(companyData);

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
// // Fetch Logged-in User's Company
// export const getMyCompany = async (req, res) => {
//   try {
//     // Extract user ID from the authenticated request
//     const userId = req.user.id;

//     // Find the company associated with the user
//     const company = await CompanyProfile.findOne({ userId }).lean();

//     if (!company) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Company not found" });
//     }

//     // Append domain to logo and cover paths
//     const domain = req.protocol + "://" + req.get("host");
//     const companyWithPaths = appendDomainToPaths(company, domain);

//     // Send the response
//     return res.status(200).json({
//       success: true,
//       message: "Company details retrieved successfully",
//       data: companyWithPaths,
//     });
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching company details",
//       error: error.message,
//     });
//   }
// };
// Retrieve a single Company profile by ID
export const show = async (req, res) => {
  try {
    const { id } = req.params; // Extract userId from the authenticated request
    const company = await CompanyProfile.findById(id);
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
    const uploadsBaseUrl = getUploadsBaseUrl(req);

    const logoPath = req.files?.logo
      ? `${uploadsBaseUrl}/${req.files.logo[0].filename}`
      : null;

    const coverPath = req.files?.cover
      ? `${uploadsBaseUrl}/${req.files.cover[0].filename}`
      : null;

    // Add file paths to req.body if they exist
    if (logoPath) req.body.logo = logoPath;
    if (coverPath) req.body.cover = coverPath;
    const { id } = req.user; // Extract userId from the authenticated request
    // Update company profile
    const company = await CompanyProfile.findOneAndUpdate(
      { userId: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return sendResponse(res, 404, false, "Company profile not found");
    }
    const a = req.body;
    sendResponse(res, 200, true, "Company profile updated successfully", {
      company,
      body: a,
      id,
    });
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
    const { id } = req.user; // Extract userId from the authenticated request
    const company = await CompanyProfile.findOneAndDelete({ userId: id });
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
