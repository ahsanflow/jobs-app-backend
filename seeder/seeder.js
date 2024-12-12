import mongoose from "mongoose";
import { connectDB } from "../config/database.js";
import CompanyProfile from "../models/CompanyProfile.js";
import CandidateProfile from "../models/CandidateProfile.js";
import User from "../models/User.js";
import { faker } from "@faker-js/faker";

const seedUsers = async () => {
  await User.deleteMany({});
  const users = [
    {
      name: "John Admin",
      email: "admin@example.com",
      password: "admin123",
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    },
  ];
  await User.insertMany(users);
  console.log("Users seeded!");
};

const seedCompanyProfiles = async () => {
  await CompanyProfile.deleteMany({});
  const companyProfiles = [
    {
      companyName: "Tech Innovators",
      email: "contact@techinnovators.com",
      phone: "123-456-7890",
      website: "https://techinnovators.com",
      estSince: new Date("2010-05-15"),
      teamSize: "50-100",
      categories: ["Banking", "Technology"],
      allowInSearch: true,
      about: "Leading tech company specializing in AI solutions.",
      address: {
        country: "USA",
        city: "San Francisco",
        fullAddress: "123 Market St, San Francisco, CA 94103",
        latitude: "37.7749",
        longitude: "-122.4194",
      },
      socialLinks: {
        facebook: "https://facebook.com/techinnovators",
        twitter: "https://twitter.com/techinnovators",
        linkedin: "https://linkedin.com/company/techinnovators",
      },
    },
  ];
  await CompanyProfile.insertMany(companyProfiles);
  console.log("Company Profiles seeded!");
};

const seedCandidateProfiles = async () => {
  await CandidateProfile.deleteMany({});
  const candidateProfiles = [
    {
      userId: new mongoose.Types.ObjectId(), // Replace with actual User IDs
      fullName: "John Doe",
      jobTitle: "Software Engineer",
      phone: "111-222-3333",
      email: "john.doe@example.com",
      website: "https://johndoe.dev",
      currentSalary: "$70,000",
      expectedSalary: "$80,000",
      experience: "5 years",
      age: "30",
      education: "Bachelor's in Computer Science",
      languages: ["English", "Spanish"],
      categories: ["Technology"],
      allowInSearch: true,
      description:
        "Experienced software engineer specializing in full-stack development.",
    },
  ];
  await CandidateProfile.insertMany(candidateProfiles);
  console.log("Candidate Profiles seeded!");
};

const seedAllData = async () => {
  try {
    await connectDB();
    console.log("Database connected!");

    await seedUsers();
    await seedCompanyProfiles();
    await seedCandidateProfiles();

    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedAllData();
