import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures each candidate profile has an associated user
      unique: true, // Ensures one-to-one relationship
    },
    logo: { type: String, default: null }, // Logo URL or file path
    cover: { type: String, default: null }, // Cover photo URL or file path
    companyName: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    website: { type: String, default: null },
    estSince: { type: Date, default: null }, // Establishment date
    teamSize: { type: Number, default: null }, // Number of employees
    city: { type: String, default: null },
    country: { type: String, default: null },
    industryType: { type: String, default: null }, // e.g., IT, Banking, etc.
    allowInSearch: { type: Boolean, default: false }, // Visibility in search and listing
    description: { type: String, default: null }, // Description of the company
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
