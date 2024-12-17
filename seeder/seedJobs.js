import Jobs from "../models/Jobs.js";
import { faker } from "@faker-js/faker";

export const seedJobs = async (companyIds, count = 10) => {
  try {
    console.log("Seeding Jobs...");
    await Jobs.deleteMany({});

    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        jobTitle: faker.person.jobTitle(),
        description: faker.lorem.paragraph(),
        keyResponsibilities: faker.helpers.arrayElements(
          ["Develop software", "Test applications", "Deploy services"],
          3
        ),
        skillExperience: faker.helpers.arrayElements(
          ["Node.js", "React", "MongoDB"],
          3
        ),
        hours: "9-5",
        image: faker.image.avatar(),
        company: faker.helpers.arrayElement(companyIds),
        location: {
          country: faker.location.country(),
          city: faker.location.city(),
        },
        time: Math.floor(Date.now() / 1000),
        salary: { min: 50000, max: 90000 },
        jobType: [{ styleClass: "time", type: "Full Time" }],
        link: faker.internet.url(),
        tags: faker.helpers.arrayElements(["Remote", "Full-stack"], 2),
        category: "Technology",
        created_at: Math.floor(Date.now() / 1000),
        expire_at: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        experience: "2-3 years",
        totalSalary: faker.finance.amount(50000, 90000, 0),
      });
    }

    await Jobs.insertMany(data);
    console.log("Jobs seeded!");
  } catch (error) {
    console.error("Error seeding Jobs:", error);
    throw error;
  }
};
