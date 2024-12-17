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
    const users = await seedUsers(2);

    // Seed Company Profiles
    const companies = await seedCompanyProfiles(5);
    console.log("comp");
    console.log(companies);
    // Seed Candidate Profiles
    await seedCandidateProfiles(
      users.map((user) => user._id),
      10
    );

    // Seed Jobs
    await seedJobs(
      companies.map((company) => company._id),
      10
    );

    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedAllData();
