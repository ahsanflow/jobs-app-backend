import Jobs from "../models/Jobs.js";
import { faker } from "@faker-js/faker";

export const seedJobs = async (companyIds, count = 10) => {
  try {
    console.log("Seeding Jobs...");
    await Jobs.deleteMany({});

    const data = [];
    for (let i = 0; i < count; i++) {
      const job = await Jobs.create({
        company: faker.helpers.arrayElement(companyIds), // Linking company
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraph(),
        specialisms: faker.helpers.arrayElements(
          ["IT", "Healthcare", "Finance", "Marketing"],
          2
        ),
        jobType: faker.helpers.arrayElement([
          "Full Time",
          "Part Time",
          "Freelance",
        ]),
        salary: {
          min: faker.number.int({ min: 20000, max: 50000 }),
          max: faker.number.int({ min: 60000, max: 120000 }),
        },
        careerLevel: faker.helpers.arrayElement([
          "Entry Level",
          "Mid Level",
          "Senior Level",
        ]),
        experience: faker.helpers.arrayElement([
          "Fresh",
          "1-2 years",
          "3-5 years",
        ]),
        industry: faker.helpers.arrayElement([
          "Technology",
          "Healthcare",
          "Education",
        ]),
        qualification: faker.helpers.arrayElement([
          "Bachelor's",
          "Master's",
          "PhD",
        ]),
        applicationDeadline: new Date(
          Date.now() +
            faker.number.int({ min: 10, max: 30 }) * 24 * 60 * 60 * 1000
        ), // Deadline in 10-30 days
        location: {
          country: faker.location.country(),
          city: faker.location.city(),
        },
      });
      data.push(job);
    }
    console.log("Jobs seeded!");
    return data;
  } catch (error) {
    console.error("Error seeding Jobs:", error);
    throw error;
  }
};
