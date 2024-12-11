import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: null },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, default: null },
    estSince: { type: Date, default: null },
    teamSize: { type: String, default: null },
    categories: [{ type: String }], // e.g., Banking, Retail, etc.
    allowInSearch: { type: Boolean, default: false },
    about: { type: String, default: null },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      fullAddress: { type: String, required: true },
      latitude: { type: String, default: null },
      longitude: { type: String, default: null },
    },
    socialLinks: {
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      googlePlus: { type: String, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CompanyProfile", companyProfileSchema);
