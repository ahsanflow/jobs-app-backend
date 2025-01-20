import { connectDB } from "../config/database.js";
import { seedUsers } from "./seedUsers.js";
import { seedCompanies } from "./seedCompanies.js";
import { seedCandidates } from "./seedCandidates.js";
import { seedJobs } from "./seedJobs.js";
import { seedJobApplications } from "./seedJobApplications.js";

const seedAllData = async () => {
  try {
    await connectDB();
    console.log("Database connected!");

    // Seed Users
    const users = await seedUsers(10);

    // Seed Company Profiles
    const companyUsers = users.filter((user) => user.role === "Company");
    const companies = await seedCompanies(companyUsers);

    // Seed Jobs
    const jobs = await seedJobs(
      companies.map((company) => company._id),
      50
    );

    // Seed Candidate Profiles
    const candidateUsers = users.filter((user) => user.role === "Candidate");
    const candidates = await seedCandidates(candidateUsers);

    // Seed Job Applications
    await seedJobApplications(
      candidates.map((candidate) => candidate._id),
      jobs.map((job) => job._id),
      100 // Number of applications to create
    );
    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedAllData();
