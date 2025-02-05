import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
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
    website: { type: String, default: null },
    currentSalary: { type: String, default: null },
    expectedSalary: { type: String, default: null },
    experience: { type: String, default: null },
    age: { type: String, default: null },
    description: { type: String, default: null },
    allowInSearch: { type: Boolean, default: true },

    // Modified Education field to include details
    education: [
      {
        degree: {
          type: String,
          // enum: ["Bachelor", "Master", "PhD"],
          default: null,
        }, // Degree type
        institute: { type: String, default: null }, // Institute name
        startYear: { type: Number, default: null }, // Start year (e.g., 2015)
        endYear: { type: Number, default: null }, // End year (e.g., 2020)
        description: { type: String, default: null }, // Additional details
      },
    ],

    // Modified Experience field to include job details
    experience: [
      {
        role: { type: String, default: null }, // Job role (e.g., Front-end, Back-end)
        company: { type: String, default: null }, // Company name
        startYear: { type: Number, default: null }, // Start year (e.g., 2015)
        endYear: { type: Number, default: null }, // End year (e.g., 2020)
        description: { type: String, default: null }, // Job description
      },
    ],

    // Added Portfolio field to store images
    portfolio: [{ type: String, default: null }], // Array of image URLs

    // Added Skills field with skill name and level (0-100)
    skills: [
      {
        skillName: { type: String, default: null }, // Skill name (e.g., JavaScript)
        skillLevel: { type: Number, min: 0, max: 100, default: null }, // Skill level (0-100)
      },
    ],

    // Added Knowledge field (specific knowledge areas)
    knowledge: [{ type: String, default: null }], // Array of knowledge areas

    // Updated Languages field to include proficiency level
    languages: [
      {
        languageName: { type: String, default: null }, // Language name (e.g., English)
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Fluent"],
          default: "Beginner",
        }, // Proficiency level
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
