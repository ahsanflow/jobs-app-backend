import mongoose from 'mongoose';

const candidateProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
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
}, { timestamps: true });

export default mongoose.model('CandidateProfile', candidateProfileSchema);
