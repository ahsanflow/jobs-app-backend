import moment from "moment";
import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to Company
    },
    title: { type: String, default: null }, // Job Title
    description: { type: String, default: null }, // Job Description
    specialisms: [{ type: String }], // Array for specialisms (e.g., IT, Marketing)
    jobType: { type: String, default: null }, // e.g., Full Time, Part Time, Freelance
    salary: {
      min: { type: Number, default: 0 }, // Minimum Salary
      max: { type: Number, default: 0 }, // Maximum Salary
    },
    careerLevel: { type: String, default: null }, // Entry Level, Mid Level, Senior Level
    experience: { type: String, default: null }, // e.g., Fresh, 2-3 years
    industry: { type: String, default: null }, // e.g., IT, Healthcare
    qualification: { type: String, default: null }, // Minimum Qualification (e.g., Bachelor's, Master's)
    deadline: { type: Date, default: null }, // Application deadline date
    location: {
      country: { type: String, default: null }, // Country of job
      city: { type: String, default: null }, // City of job
    },
  },
  { timestamps: true }
);
jobsSchema.pre("save", function (next) {
  if (this.deadline) {
    // Convert incoming date to MM/DD/YYYY format
    this.deadline = moment(this.deadline, "YYYY-MM-DD").format("MM/DD/YYYY");
  }
  next();
});

export default mongoose.model("Jobs", jobsSchema);
