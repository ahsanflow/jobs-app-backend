import CandidateProfile from "../models/CandidateProfile.js";
import { faker } from "@faker-js/faker";

export const seedCandidateProfiles = async (userIds, count = 10) => {
  try {
    console.log("Seeding Candidate Profiles...");
    await CandidateProfile.deleteMany({});

    const candidateProfiles = [];
    for (let i = 0; i < count; i++) {
      candidateProfiles.push({
        userId: faker.helpers.arrayElement(userIds),
        fullName: faker.person.fullName(),
        jobTitle: faker.person.jobTitle(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        currentSalary: `$${faker.finance.amount(40000, 90000, 0)}`,
        expectedSalary: `$${faker.finance.amount(50000, 100000, 0)}`,
        experience: `${faker.number.int({ min: 1, max: 10 })} years`,
        age: faker.number.int({ min: 22, max: 55 }).toString(),
        education: faker.helpers.arrayElement([
          "Bachelor's in Computer Science",
          "Master's in Business Administration",
          "Diploma in IT",
        ]),
        languages: faker.helpers.arrayElements(
          ["English", "Spanish", "French", "German"],
          2
        ),
        categories: faker.helpers.arrayElements(
          ["Technology", "Banking", "Retail"],
          2
        ),
        allowInSearch: faker.datatype.boolean(),
        description: faker.lorem.paragraph(),
      });
    }

    await CandidateProfile.insertMany(candidateProfiles);
    console.log("Candidate Profiles seeded!");
  } catch (error) {
    console.error("Error seeding Candidate Profiles:", error);
    throw error;
  }
};
