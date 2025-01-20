import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserRole = ["admin", "Candidate", "Company"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, default: null, unique: true },
    password: { type: String, default: null },
    role: {
      type: String,
      enum: UserRole,
      default: "Candidate",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role", // Dynamically set the ref to the correct profile based on the role
    },
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
  if (this.candidate) {
    await candidate.findByIdAndDelete(this.candidate);
  }
  if (this.company) {
    await Company.findByIdAndDelete(this.company);
  }
  next();
});
export default mongoose.model("User", userSchema);
