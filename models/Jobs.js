import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, default: null }, // Backend Developer
    description: { type: String, default: null }, // Text
    keyResponsibilities: [{ type: String }], // Array of list items
    skillExperience: [{ type: String }], // Array of list items
    hours: { type: String, default: null }, // Working hours
    image: { type: String, default: null }, // Image URL
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile", // Reference to CompanyProfile
    },
    location: {
      country: { type: String },
      state: { type: String, default: null },
      city: { type: String },
      latitude: { type: String, default: null },
      longitude: { type: String, default: null },
    },
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    jobType: [
      {
        styleClass: { type: String }, // e.g., "time"
        type: { type: String }, // e.g., "Full Time"
      },
    ],
    link: { type: String }, // Job link, e.g., https://segment.com
    tags: [{ type: String }], // Tags like ["freelance", "android"]
    category: { type: String }, // Category like IT, Banking
    expire_at: { type: Date }, // time for expiry
    experience: { type: String, default: "Fresh" }, // e.g., Fresh, 2-3 years
    totalSalary: { type: String, default: null }, // Total salary information
  },
  { timestamps: true }
);

export default mongoose.model("Jobs", jobsSchema);
