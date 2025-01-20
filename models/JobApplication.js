import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate", // Reference to the candidate
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs", // Reference to the job
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
