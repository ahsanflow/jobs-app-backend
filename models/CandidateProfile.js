import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    fullName: { type: String, default: null },
    image: { type: String, default: null },
    jobTitle: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    website: { type: String },
    currentSalary: { type: String },
    expectedSalary: { type: String },
    experience: { type: String },
    age: { type: String },
    education: { type: String },
    languages: { type: [String] },
    categories: { type: [String] },
    allowInSearch: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("CandidateProfile", candidateProfileSchema);
