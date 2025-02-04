import Candidate from "../models/Candidate.js";
import { faker } from "@faker-js/faker";

export const seedCandidates = async (candidateUsers) => {
  try {
    console.log("Seeding Candidate Profiles...");
    await Candidate.deleteMany({});
    const createdCandidates = [];

    for (const user of candidateUsers) {
      const uname = faker.person.fullName();

      const createdCandidate = await Candidate.create({
        userId: user._id,
        fullName: uname,
        image: `https://placehold.co/800x800/eeeeee/31343c/webp?text=${uname}`,
        jobTitle: faker.person.jobTitle(),
        phone: faker.phone.number(),
        email: user.email,
        website: faker.internet.url(),
        currentSalary: `$${faker.finance.amount(40000, 90000, 0)}`,
        expectedSalary: `$${faker.finance.amount(50000, 100000, 0)}`,
        experience: `${faker.number.int({ min: 1, max: 10 })} years`,
        age: faker.number.int({ min: 22, max: 55 }).toString(),
        description: faker.lorem.paragraph(),
        allowInSearch: faker.datatype.boolean(),

        // Updated Education field (array format)
        education: Array.from(
          { length: faker.number.int({ min: 1, max: 2 }) },
          () => ({
            degree: faker.helpers.arrayElement(["Bachelor", "Master", "PhD"]),
            institute: faker.company.name(),
            startYear: faker.number.int({ min: 2000, max: 2018 }),
            endYear: faker.number.int({ min: 2019, max: 2024 }),
            description: faker.lorem.sentence(),
          })
        ),

        // Updated Experience field (array format)
        experience: Array.from(
          { length: faker.number.int({ min: 1, max: 3 }) },
          () => ({
            role: faker.person.jobTitle(),
            company: faker.company.name(),
            startYear: faker.number.int({ min: 2000, max: 2018 }),
            endYear: faker.number.int({ min: 2019, max: 2024 }),
            description: faker.lorem.sentence(),
          })
        ),

        // Added Portfolio field (array of image URLs)
        portfolio: Array.from(
          { length: faker.number.int({ min: 1, max: 5 }) },
          () => faker.image.urlLoremFlickr({ category: "business" })
        ),

        // Added Skills field (array of skills with levels)
        skills: Array.from(
          { length: faker.number.int({ min: 3, max: 7 }) },
          () => ({
            skillName: faker.person.jobType(),
            skillLevel: faker.number.int({ min: 10, max: 100 }),
          })
        ),

        // Added Knowledge field (array of knowledge topics)
        knowledge: faker.helpers.arrayElements(
          ["AI", "Cloud Computing", "Cybersecurity", "Data Science"],
          faker.number.int({ min: 1, max: 3 })
        ),

        // Updated Languages field with proficiency levels
        languages: Array.from(
          { length: faker.number.int({ min: 1, max: 3 }) },
          () => ({
            languageName: faker.helpers.arrayElement([
              "English",
              "Spanish",
              "French",
              "German",
            ]),
            proficiency: faker.helpers.arrayElement([
              "Beginner",
              "Intermediate",
              "Fluent",
            ]),
          })
        ),

        // Updated Categories (keeping as is)
        categories: faker.helpers.arrayElements(
          ["Technology", "Banking", "Retail"],
          2
        ),
      });

      // Update the user with the candidate profile reference
      user.profile = createdCandidate._id;
      await user.save();
      createdCandidates.push(createdCandidate);
    }

    console.log("Candidate Profiles seeded!");
    return createdCandidates;
  } catch (error) {
    console.error("Error seeding Candidate Profiles:", error);
    throw error;
  }
};
