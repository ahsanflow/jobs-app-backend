import JobApplication from "../models/JobApplication.js";
import { faker } from "@faker-js/faker";

export const seedJobApplications = async (candidateIds, jobIds, count = 20) => {
  try {
    console.log("Seeding Job Applications...");
    await JobApplication.deleteMany({});

    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        candidate: faker.helpers.arrayElement(candidateIds),
        job: faker.helpers.arrayElement(jobIds),
        appliedAt: faker.date.past(),
        status: faker.helpers.arrayElement([
          "Pending",
          "Reviewed",
          "Accepted",
          "Rejected",
        ]),
      });
    }

    await JobApplication.insertMany(data);
    console.log("Job Applications seeded!");
  } catch (error) {
    console.error("Error seeding Job Applications:", error);
    throw error;
  }
};
