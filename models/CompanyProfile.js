import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    logo: { type: String, default: null }, // Logo URL or file path
    cover: { type: String, default: null }, // Cover photo URL or file path
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, default: null },
    estSince: { type: Date, default: null }, // Establishment date
    teamSize: { type: Number, default: null }, // Number of employees
    city: { type: String, required: true },
    country: { type: String, required: true },
    industryType: { type: String, default: null }, // e.g., IT, Banking, etc.
    allowInSearch: { type: Boolean, default: false }, // Visibility in search and listing
    aboutCompany: { type: String, default: null }, // Description of the company
    socialLinks: {
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      instagram: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CompanyProfile", companyProfileSchema);
