import { connectDB } from "../config/database.js";
import { seedUsers } from "./seedUsers.js";
import { seedCompanyProfiles } from "./seedCompanyProfiles.js";
import { seedCandidateProfiles } from "./seedCandidateProfiles.js";
import { seedJobs } from "./seedJobs.js";

const seedAllData = async () => {
  try {
    await connectDB();
    console.log("Database connected!");

    // Seed Users
    const users = await seedUsers(10);

    // Seed Company Profiles
    const companyUsers = users.filter((user) => user.role === "employer");
    const companies = await seedCompanyProfiles(companyUsers);

    // Seed Jobs
    await seedJobs(
      companies.map((company) => company._id),
      50
    );

    // Seed Candidate Profiles
    const candidateUsers = users.filter((user) => user.role === "candidate");
    await seedCandidateProfiles(candidateUsers);

    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedAllData();
