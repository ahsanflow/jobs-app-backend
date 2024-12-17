import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true }, // Backend Developer
    description: { type: String, required: true }, // Text
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
      city: { type: String, required: true },
      latitude: { type: String, default: null },
      longitude: { type: String, default: null },
    },
    time: { type: Number }, // Unix time
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    jobType: [
      {
        styleClass: { type: String, required: true }, // e.g., "time"
        type: { type: String, required: true }, // e.g., "Full Time"
      },
    ],
    link: { type: String, required: true }, // Job link, e.g., https://segment.com
    tags: [{ type: String }], // Tags like ["freelance", "android"]
    category: { type: String, required: true }, // Category like IT, Banking
    created_at: { type: Number, required: true }, // Unix time for creation
    expire_at: { type: Number, required: true }, // Unix time for expiry
    experience: { type: String, default: "Fresh" }, // e.g., Fresh, 2-3 years
    totalSalary: { type: String, default: null }, // Total salary information
  },
  { timestamps: true }
);

export default mongoose.model("Jobs", jobsSchema);
