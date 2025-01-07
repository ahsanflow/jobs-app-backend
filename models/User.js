import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, default: null, unique: true },
    password: { type: String, default: null },
    role: {
      type: String,
      enum: ["admin", "candidate", "employer"],
      default: "candidate",
    },
    companyProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
    }, // Null for candidates
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
    }, // Null for companies
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password for login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.pre("remove", async function (next) {
  if (this.candidateProfile) {
    await CandidateProfile.findByIdAndDelete(this.candidateProfile);
  }
  if (this.companyProfile) {
    await CompanyProfile.findByIdAndDelete(this.companyProfile);
  }
  next();
});
export default mongoose.model("User", userSchema);
